import { Request } from 'express';

export function getCookieOptions(req: Request<any, any, any, any>) {
  const forwardedProtocol = req.headers?.['x-forwarded-proto'] as
    | string
    | undefined;
  const protocol = forwardedProtocol ?? req.protocol;
  const secure = protocol === 'https;';
  return {
    httpOnly: true,
    secure,
    sameSite: 'lax', // used in CSB iframes
  } as const;
}
