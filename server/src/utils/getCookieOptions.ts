import { CookieOptions, Request } from 'express';
import { isCodeSandbox } from '../config/spotify';

export function getCookieOptions(
  req: Request<any, any, any, any>
): CookieOptions {
  const forwardedProtocol = req.headers?.['x-forwarded-proto'] as
    | string
    | undefined;
  const protocol = forwardedProtocol ?? req.protocol;

  const secure = protocol === 'https';
  return isCodeSandbox(req)
    ? {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      }
    : {
        httpOnly: true,
        secure,
        sameSite: 'lax',
      };
}
