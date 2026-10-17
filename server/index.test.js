import assert from 'node:assert/strict';
import { once } from 'node:events';
import test from 'node:test';
import { createApp } from './index.js';

const configuredEnv = {
  SMTP_HOST: 'smtp.example.test',
  SMTP_PORT: '587',
  SMTP_SECURE: 'false',
  SMTP_USER: 'smtp-user@example.test',
  SMTP_PASS: 'fake-smtp-password-for-tests',
  CONTACT_FROM: 'verified-sender@example.test',
};

const validPayload = {
  name: 'Alex Example',
  email: 'alex@example.test',
  subject: 'Internship discussion',
  message: 'I would like to discuss an opportunity.',
  website: '',
};

async function withServer(options, callback) {
  const server = createApp(options).listen(0, '127.0.0.1');
  await once(server, 'listening');
  const { port } = server.address();
  try {
    await callback(`http://127.0.0.1:${port}`);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

async function postContact(baseUrl, payload) {
  return fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

test('sends a validated contact email with fixed sender, recipient, reply-to, and escaped content', async () => {
  let delivered;
  await withServer({
    env: configuredEnv,
    deliverEmail: async (config, message) => {
      assert.deepEqual(
        { host: config.host, port: config.port, secure: config.secure, user: config.user, key: config.key },
        { host: 'smtp.example.test', port: 587, secure: false, user: configuredEnv.SMTP_USER, key: configuredEnv.SMTP_PASS },
      );
      delivered = message;
    },
  }, async (url) => {
    const response = await postContact(url, { ...validPayload, message: 'Hello <script>alert("x")</script>' });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.equal(delivered.from.address, configuredEnv.CONTACT_FROM);
    assert.equal(delivered.to, 'ebirone4@gmail.com');
    assert.deepEqual(delivered.replyTo, { name: validPayload.name, address: validPayload.email });
    assert.equal(delivered.subject, `[Portfolio contact] ${validPayload.subject}`);
    assert.match(delivered.text, /New message from the Ebirone Michael portfolio contact form/);
    assert.match(delivered.text, /Hello <script>alert\("x"\)<\/script>/);
    assert.match(delivered.html, /&lt;script&gt;/);
    assert.doesNotMatch(delivered.html, /<script>/);
  });
});

test('uses the configured contact recipient and reports email configuration health without revealing secrets', async () => {
  await withServer({
    env: { ...configuredEnv, CONTACT_TO: 'inbox@example.test' },
    deliverEmail: async (_config, message) => assert.equal(message.to, 'inbox@example.test'),
  }, async (url) => {
    const health = await fetch(`${url}/api/health`).then((response) => response.json());
    assert.deepEqual(health, { ok: true, emailConfigured: true });
    const response = await postContact(url, validPayload);
    assert.equal(response.status, 200);
  });
});

test('rejects missing fields, invalid email, oversized fields, and header injection', async () => {
  await withServer({ env: configuredEnv, deliverEmail: async () => assert.fail('Invalid input must not send mail') }, async (url) => {
    const invalidPayloads = [
      {},
      { ...validPayload, email: 'not-an-email' },
      { ...validPayload, name: 'n'.repeat(101) },
      { ...validPayload, email: `${'a'.repeat(245)}@example.test` },
      { ...validPayload, subject: 's'.repeat(201) },
      { ...validPayload, subject: 'hello\r\nBcc: attacker@example.test' },
    ];

    for (const payload of invalidPayloads) {
      const response = await postContact(url, payload);
      assert.equal(response.status, 400);
      assert.equal((await response.json()).ok, false);
    }
  });

  await withServer({ env: configuredEnv, deliverEmail: async () => assert.fail('Header injection must not send mail') }, async (url) => {
    const response = await postContact(url, { ...validPayload, name: 'Alex\nBcc: attacker@example.test' });
    assert.equal(response.status, 400);
  });
});

test('rejects messages above 5,000 characters and oversized request bodies', async () => {
  await withServer({ env: configuredEnv, deliverEmail: async () => assert.fail('Invalid input must not send mail') }, async (url) => {
    const longMessage = await postContact(url, { ...validPayload, message: 'm'.repeat(5001) });
    assert.equal(longMessage.status, 400);

    const oversizedBody = await fetch(`${url}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...validPayload, message: 'x'.repeat(20_000) }),
    });
    assert.equal(oversizedBody.status, 413);
    assert.equal((await oversizedBody.json()).ok, false);
  });
});

test('returns JSON for malformed JSON and unexpected payload types', async () => {
  await withServer({ env: configuredEnv }, async (url) => {
    const malformed = await fetch(`${url}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{"name":',
    });
    assert.equal(malformed.status, 400);
    assert.equal((await malformed.json()).ok, false);

    const unexpected = await postContact(url, []);
    assert.equal(unexpected.status, 400);
  });
});

test('returns a safe configuration response when SMTP settings are absent', async () => {
  await withServer({ env: {}, deliverEmail: async () => assert.fail('Unconfigured service must not send mail') }, async (url) => {
    const response = await postContact(url, validPayload);
    const body = await response.json();
    assert.equal(response.status, 503);
    assert.equal(body.ok, false);
    assert.equal(body.configured, false);
    assert.doesNotMatch(JSON.stringify(body), /smtp-user|fake-smtp-password/);
  });
});

test('returns a generic gateway error when the SMTP delivery fails', async () => {
  await withServer({
    env: configuredEnv,
    deliverEmail: async () => { throw Object.assign(new Error('secret SMTP response'), { code: 'EAUTH' }); },
  }, async (url) => {
    const response = await postContact(url, validPayload);
    const body = await response.json();
    assert.equal(response.status, 502);
    assert.equal(body.ok, false);
    assert.doesNotMatch(JSON.stringify(body), /secret SMTP response|smtp-user|fake-smtp-password/);
  });
});

test('rate limits the public contact endpoint', async () => {
  await withServer({ env: configuredEnv, deliverEmail: async () => {} }, async (url) => {
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const response = await postContact(url, validPayload);
      assert.equal(response.status, 200);
    }
    const limited = await postContact(url, validPayload);
    assert.equal(limited.status, 429);
    assert.equal((await limited.json()).ok, false);
  });
});

test('honeypot submissions do not send email or report success', async () => {
  await withServer({ env: configuredEnv, deliverEmail: async () => assert.fail('Honeypot must not send mail') }, async (url) => {
    const response = await postContact(url, { ...validPayload, website: 'spam' });
    assert.equal(response.status, 400);
    assert.equal((await response.json()).ok, false);
  });
});
