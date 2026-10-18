import { getMailConfiguration } from '../server/contact-service.js';

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

export function createVercelHealthHandler({ env = process.env } = {}) {
  return async function handleHealthRequest(request) {
    if (request.method !== 'GET') {
      return jsonResponse(405, { ok: false, message: 'Method not allowed.' });
    }
    return jsonResponse(200, { ok: true, emailConfigured: getMailConfiguration(env).configured });
  };
}

export const GET = createVercelHealthHandler();
