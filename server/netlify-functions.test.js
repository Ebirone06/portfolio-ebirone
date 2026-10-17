import assert from 'node:assert/strict';
import test from 'node:test';
import contactFunction, { config as contactConfig, createNetlifyContactHandler } from '../netlify/functions/contact.mjs';
import healthFunction, { config as healthConfig } from '../netlify/functions/health.mjs';

const configuredEnv = {
  SMTP_HOST: 'smtp.example.test',
  SMTP_PORT: '587',
  SMTP_SECURE: 'false',
  SMTP_USER: 'smtp-user@example.test',
  SMTP_PASS: 'fake-smtp-password-for-tests',
  CONTACT_TO: 'ebirone4@gmail.com',
  CONTACT_FROM: 'verified-sender@example.test',
};

const validPayload = {
  name: 'Alex Example',
  email: 'alex@example.test',
  subject: 'Internship discussion',
  message: 'I would like to discuss an opportunity.',
  website: '',
};

function jsonRequest(payload, headers = {}) {
  return new Request('https://portfolio.example/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(payload),
  });
}

test('Netlify contact route shares the email service and only succeeds after mocked delivery', async () => {
  let delivered;
  const handler = createNetlifyContactHandler({
    env: configuredEnv,
    deliverEmail: async (_mailConfig, message) => { delivered = message; },
  });
  const response = await handler(jsonRequest(validPayload));
  const body = await response.json();

  assert.equal(contactFunction instanceof Function, true);
  assert.equal(contactConfig.path, '/api/contact');
  assert.equal(contactConfig.rateLimit.windowLimit, 6);
  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.equal(delivered.to, 'ebirone4@gmail.com');
  assert.equal(delivered.from.address, configuredEnv.CONTACT_FROM);
  assert.deepEqual(delivered.replyTo, { name: validPayload.name, address: validPayload.email });
});

test('Netlify contact function rejects malformed, invalid, oversized, and honeypot requests without sending', async () => {
  const handler = createNetlifyContactHandler({
    env: configuredEnv,
    deliverEmail: async () => assert.fail('Rejected submissions must not send mail'),
  });

  const malformed = await handler(new Request('https://portfolio.example/api/contact', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: '{bad json',
  }));
  assert.equal(malformed.status, 400);

  const invalid = await handler(jsonRequest({ ...validPayload, email: 'invalid' }));
  assert.equal(invalid.status, 400);

  const oversized = await handler(new Request('https://portfolio.example/api/contact', {
    method: 'POST', headers: { 'content-type': 'application/json', 'content-length': '20000' }, body: '{}',
  }));
  assert.equal(oversized.status, 413);

  const honeypot = await handler(jsonRequest({ ...validPayload, website: 'spam' }));
  assert.equal(honeypot.status, 400);
  assert.equal((await honeypot.json()).ok, false);
});

test('Netlify contact function rejects non-POST requests and stays safe when unconfigured', async () => {
  const handler = createNetlifyContactHandler({ env: {} });
  assert.equal((await handler(new Request('https://portfolio.example/api/contact'))).status, 405);

  const response = await handler(jsonRequest(validPayload));
  const body = await response.json();
  assert.equal(response.status, 503);
  assert.equal(body.configured, false);
  assert.doesNotMatch(JSON.stringify(body), /smtp-user|fake-smtp-password/);
});

test('Netlify health route reports availability and configuration status without credentials', async () => {
  assert.equal(healthFunction instanceof Function, true);
  assert.equal(healthConfig.path, '/api/health');
  const previous = process.env.SMTP_PASS;
  delete process.env.SMTP_PASS;
  try {
    const response = await healthFunction();
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.equal(body.emailConfigured, false);
    assert.doesNotMatch(JSON.stringify(body), /SMTP|password|secret/i);
  } finally {
    if (previous === undefined) delete process.env.SMTP_PASS;
    else process.env.SMTP_PASS = previous;
  }
});
