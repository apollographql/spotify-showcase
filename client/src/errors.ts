export class AuthorizationError extends Error {
  constructor(message = 'Not authorized') {
    super(message);
  }
}
