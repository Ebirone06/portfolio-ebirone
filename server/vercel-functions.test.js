import assert from 'node:assert/strict';
import test from 'node:test';
import { createVercelContactHandler, POST } from '../api/contact.js';
import { createVercelHealthHandler, GET } from '../api/health.js';

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

function request(payload, method = 'POST', extraHeaders = {}) {
  return new Request('https://portfolio.example/api/contact', {
    method,
    headers: { 'content-type': 'application/json', ...extraHeaders },
    ...(payload === undefined ? {} : { body: typeof payload === 'string' ? payload : JSON.stringify(payload) }),
  });
}

test('Vercel POST handler shares the mail service and succeeds only after mocked delivery', async () => {
  let delivered;
  const handler = createVercelContactHandler({
    env: configuredEnv,
    deliverEmail: async (_config, message) => { delivered = message; },
  });
  const response = await handler(request(validPayload));
  const body = await response.json();

  assert.equal(POST instanceof Function, true);
  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.equal(delivered.to, configuredEnv.CONTACT_TO);
  assert.equal(delivered.from.address, configuredEnv.CONTACT_FROM);
  assert.deepEqual(delivered.replyTo, { name: validPayload.name, address: validPayload.email });
});

test('Vercel POST handler rejects wrong methods, malformed JSON, and non-object payloads', async () => {
  const handler = createVercelContactHandler({ env: configuredEnv });
  assert.equal((await handler(request(undefined, 'GET'))).status, 405);
  assert.equal((await handler(request('{bad json'))).status, 400);
  const array = await handler(request([]));
  assert.equal(array.status, 400);
  assert.equal((await array.json()).ok, false);
});

test('Vercel POST handler rejects invalid fields, field limits, and header injection', async () => {
  const handler = createVercelContactHandler({
    env: configuredEnv,
    deliverEmail: async () => assert.fail('Invalid input must not send mail'),
  });
  const invalidPayloads = [
    {},
    { ...validPayload, email: 'invalid' },
    { ...validPayload, name: 'n'.repeat(101) },
    { ...validPayload, email: `${'a'.repeat(245)}@example.test` },
    { ...validPayload, subject: 's'.repeat(201) },
    { ...validPayload, subject: 'hello\r\nBcc: attacker@example.test' },
    { ...validPayload, name: 'Alex\nBcc: attacker@example.test' },
    { ...validPayload, message: 'm'.repeat(5001) },
    { ...validPayload, website: 'spam' },
  ];
  for (const payload of invalidPayloads) {
    const response = await handler(request(payload));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).ok, false);
  }
});

test('Vercel POST handler enforces declared and streamed body size limits', async () => {
  const handler = createVercelContactHandler({ env: configuredEnv });
  const declaredOversized = await handler(request('{}', 'POST', { 'content-length': '20000' }));
  assert.equal(declaredOversized.status, 413);

  const streamedOversized = await handler(request({ ...validPayload, message: 'x'.repeat(20_000) }));
  assert.equal(streamedOversized.status, 413);
  assert.equal((await streamedOversized.json()).ok, false);
});

test('Vercel POST handler safely reports missing SMTP configuration', async () => {
  const handler = createVercelContactHandler({ env: {} });
  const response = await handler(request(validPayload));
  const body = await response.json();
  assert.equal(response.status, 503);
  assert.equal(body.configured, false);
  assert.doesNotMatch(JSON.stringify(body), /smtp-user|fake-smtp-password/i);
});

test('Vercel POST handler hides delivery errors and never reports a failed email as sent', async () => {
  const handler = createVercelContactHandler({
    env: configuredEnv,
    deliverEmail: async () => { throw Object.assign(new Error('private SMTP response'), { code: 'EAUTH' }); },
  });
  const response = await handler(request(validPayload));
  const body = await response.json();
  assert.equal(response.status, 502);
  assert.equal(body.ok, false);
  assert.doesNotMatch(JSON.stringify(body), /private SMTP response|smtp-user|fake-smtp-password/i);
});

test('Vercel health handler reports status without environment values or secrets', async () => {
  const health = createVercelHealthHandler({ env: configuredEnv });
  const response = await health(new Request('https://portfolio.example/api/health'));
  const body = await response.json();
  assert.equal(GET instanceof Function, true);
  assert.equal(response.status, 200);
  assert.deepEqual(body, { ok: true, emailConfigured: true });
  assert.doesNotMatch(JSON.stringify(body), /SMTP|secret|smtp-user|example\.test/i);
  assert.equal((await health(new Request('https://portfolio.example/api/health', { method: 'POST' }))).status, 405);

  const unconfigured = await createVercelHealthHandler({ env: {} })(new Request('https://portfolio.example/api/health'));
  assert.deepEqual(await unconfigured.json(), { ok: true, emailConfigured: false });
});
