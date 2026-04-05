import crypto from 'crypto';

const base64UrlEncode = (input: Buffer) => input.toString('base64url');
const base64UrlDecode = (input: string) => Buffer.from(input, 'base64url');

export const verifyJwt = async (token: string, secret: string) => {
  if (!secret) {
    throw new Error('Missing JWT secret');
  }

  const segments = token.split('.');
  if (segments.length !== 3) {
    throw new Error('Invalid token');
  }

  const [header, payload, signature] = segments;
  const data = Buffer.from(`${header}.${payload}`);
  const expectedSignature = crypto.createHmac('sha256', secret).update(data).digest('base64url');

  const signatureBuffer = Buffer.from(signature, 'base64url');
  const expectedBuffer = Buffer.from(expectedSignature, 'base64url');

  if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    throw new Error('Invalid token signature');
  }

  const payloadJson = JSON.parse(base64UrlDecode(payload).toString('utf8'));
  if (typeof payloadJson.exp === 'number' && Date.now() >= payloadJson.exp * 1000) {
    throw new Error('Token expired');
  }

  return payloadJson;
};

export const signJwt = async (payload: any, secret: string, expiresIn: string) => {
  if (!secret) {
    throw new Error('Missing JWT secret');
  }

  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + parseInt(expiresIn.replace(/h$/, ''), 10) * 3600;
  const fullPayload = { ...payload, exp };

  const encodedHeader = base64UrlEncode(Buffer.from(JSON.stringify(header), 'utf8'));
  const encodedPayload = base64UrlEncode(Buffer.from(JSON.stringify(fullPayload), 'utf8'));
  const data = Buffer.from(`${encodedHeader}.${encodedPayload}`);
  const signature = crypto.createHmac('sha256', secret).update(data).digest('base64url');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};
