import { TypeSystem } from '@sinclair/typebox/system';

import { Base64, isBase64 } from './core.types.tmp.js';

/**
 * @note Opaque type.
 */
declare const validEncodedQueryCursor: unique symbol;
export type EncodedQueryCursor = Base64 & { [validEncodedQueryCursor]: true };

/**
 *
 */
export const EncodedQueryCursorType = TypeSystem.Type<EncodedQueryCursor>(
  'EncodedQueryCursor',
  (options, value) => typeof value === 'string' && isBase64(value),
);
