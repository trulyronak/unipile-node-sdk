import { ValueErrorIterator } from '@sinclair/typebox/errors';
import { UnipileError } from './unipile.error.js';

export class UnsuccessfulRequestError extends UnipileError {
  constructor(body: unknown) {
    super({ message: '', body });
  }
}

export class InvalidResponseTypeError extends UnipileError {
  constructor(errorIterator: ValueErrorIterator) {
    const body = Array.from(errorIterator);
    super({
      message: `Invalid response type : the response type didn't match the one expected by the SDK.

Make sure the SDK is up to date. If the SDK is up to date and you still get the error, please contact our support.
You may also disable the optional validation to ignore this issue and work with the current response.

The full error list is available in the .body property of this error.
Here is the first error :
${JSON.stringify(body[0], null, 2)}`,
      body,
    });
  }
}

export class ValidatorMissingError extends UnipileError {
  constructor() {
    super({
      message: 'Missing validator when performing validation. Please provide a validator or disable validation.',
    });
  }
}
