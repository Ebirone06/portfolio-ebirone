import { getMailConfiguration } from '../../server/contact-service.js';

export default async function health() {
  return new Response(JSON.stringify({
    ok: true,
    emailConfigured: getMailConfiguration(process.env).configured,
  }), {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

export const config = {
  path: '/api/health',
  method: 'GET',
};
