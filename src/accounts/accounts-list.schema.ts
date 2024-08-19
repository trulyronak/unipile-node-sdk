import { Static, Type } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';
import { UniqueIdSchema } from '../common/common.types.js';
import { RequiredProps } from '../common/core.types.tmp.js';
import { EncodedQueryCursorType } from '../common/query-cursor.js';
import { ListCursorQuerySchema, ListLimitQuerySchema } from '../common/query-parameters.type.js';
import { AccounApiResponseSchema } from './account.types.js';

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------

/**
 *
 */
export const AccountListDecodedCursorSchema = Type.Composite([
  Type.Required(ListLimitQuerySchema),
  Type.Object({
    cursor: Type.Object({
      last_id: UniqueIdSchema,
    }),
  }),
]);

export type AccountListDecodedCursor = Static<typeof AccountListDecodedCursorSchema>;

export const AccountListDecodedCursorValidator = TypeCompiler.Compile(AccountListDecodedCursorSchema);

/**
 *
 */
export const AccountListBaseQuerySchema = ListLimitQuerySchema;

export type AccountListBaseQuery = Static<typeof AccountListBaseQuerySchema>;

/**
 *
 */
export const AccountListQuerySchema = Type.Union([AccountListBaseQuerySchema, ListCursorQuerySchema]);

export type AccountListQuery = Static<typeof AccountListQuerySchema>;

// /**
//  *
//  */
// export const getAccountListQueryOpenApiSchema = makeOpenApiSchemaGetter(
//   AccountListQuerySchema
// );

/**
 *
 */
export const AccountListQueryValidator = TypeCompiler.Compile(AccountListQuerySchema);

/**
 *
 */
export type AccountListQueryDTO = RequiredProps<AccountListBaseQuery, 'limit'> | { cursor: AccountListDecodedCursor };

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 *
 */
export const AccounListApiResponseSchema = Type.Object({
  object: Type.Literal('AccountList'),
  items: Type.Array(AccounApiResponseSchema),
  cursor: Type.Union([EncodedQueryCursorType(), Type.Null({ title: 'null' })]),
});

export type AccountListApiResponse = Static<typeof AccounListApiResponseSchema>;

// /**
//  *
//  */
// export const getAccountListResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   AccounListApiResponseSchema
// );

/**
 *
 */
export const AccountListResponseValidator = TypeCompiler.Compile(AccounListApiResponseSchema);
