const base64UrlDecode = (input: string) => {
  let data = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = data.length % 4;
  if (pad) {
    data += '='.repeat(4 - pad);
  }
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

export const verifyJwt = async (token: string, secret: string) => {
  const segments = token.split('.');
  if (segments.length !== 3) {
    throw new Error('Invalid token');
  }

  const [header, payload, signature] = segments;
  const data = new TextEncoder().encode(`${header}.${payload}`);
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify'],
  );

  const verified = await crypto.subtle.verify(
    'HMAC',
    key,
    base64UrlDecode(signature),
    data,
  );

  if (!verified) {
    throw new Error('Invalid token signature');
  }

  const payloadJson = JSON.parse(new TextDecoder().decode(base64UrlDecode(payload)));
  if (typeof payloadJson.exp === 'number' && Date.now() >= payloadJson.exp * 1000) {
    throw new Error('Token expired');
  }

  return payloadJson;
};

const base64UrlEncode = (input: Uint8Array) => {
  let binary = '';
  for (let i = 0; i < input.length; i += 1) {
    binary += String.fromCharCode(input[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

export const signJwt = async (payload: any, secret: string, expiresIn: string) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + parseInt(expiresIn.replace('h', '')) * 3600;
  const fullPayload = { ...payload, exp };

  const encodedHeader = base64UrlEncode(new TextEncoder().encode(JSON.stringify(header)));
  const encodedPayload = base64UrlEncode(new TextEncoder().encode(JSON.stringify(fullPayload)));

  const data = new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`);
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const signature = await crypto.subtle.sign('HMAC', key, data);
  const encodedSignature = base64UrlEncode(new Uint8Array(signature));

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
};