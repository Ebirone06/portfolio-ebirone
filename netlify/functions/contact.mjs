import { createContactService } from '../../server/contact-service.js';

const MAX_BODY_BYTES = 16 * 1024;

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

async function readJsonBody(request) {
  const declaredLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return { error: { status: 413, message: 'The request is too large. Please shorten your message and try again.' } };
  }
  if (!request.body) return { error: { status: 400, message: 'The request could not be read. Please try again.' } };

  const reader = request.body.getReader();
  const chunks = [];
  let totalBytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      return { error: { status: 413, message: 'The request is too large. Please shorten your message and try again.' } };
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return { body: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch {
    return { error: { status: 400, message: 'The request could not be read. Please try again.' } };
  }
}

export function createNetlifyContactHandler(options = {}) {
  const sendContactMessage = createContactService(options);
  return async function handleContactRequest(request) {
    if (request.method !== 'POST') {
      return jsonResponse(405, { ok: false, message: 'Method not allowed.' });
    }
    const parsed = await readJsonBody(request);
    if (parsed.error) return jsonResponse(parsed.error.status, { ok: false, message: parsed.error.message });
    const result = await sendContactMessage(parsed.body);
    return jsonResponse(result.status, result.body);
  };
}

export default createNetlifyContactHandler();

export const config = {
  path: '/api/contact',
  method: 'POST',
  rateLimit: {
    windowLimit: 6,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
};
