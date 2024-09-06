import { Static, Type } from '@sinclair/typebox';
import { WebhookAutoSchema, WebhookTriggerSchema } from './ressource.types.js';
import { TypeCompiler } from '@sinclair/typebox/compiler';
import { UniqueIdSchema } from '../common/common.types.js';
import { RequiredProps } from '../common/core.types.tmp.js';
import { ListLimitQuerySchema, ListCursorQuerySchema } from '../common/query-parameters.type.js';
import { EncodedQueryCursorType } from '../common/query-cursor.js';

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------

/**
 *
 */
export const WebhookListDecodedCursorSchema = Type.Composite([
  Type.Required(ListLimitQuerySchema),
  Type.Object({
    cursor: Type.Object({
      last_id: UniqueIdSchema,
    }),
  }),
]);

export type WebhookListDecodedCursor = Static<typeof WebhookListDecodedCursorSchema>;

export const WebhookListDecodedCursorValidator = TypeCompiler.Compile(WebhookListDecodedCursorSchema);

/**
 *
 */
export const WebhookListBaseQuerySchema = ListLimitQuerySchema;

export type WebhookListBaseQuery = Static<typeof WebhookListBaseQuerySchema>;

/**
 *
 */
export const WebhookListQuerySchema = Type.Union([WebhookListBaseQuerySchema, ListCursorQuerySchema]);

export type WebhookListQuery = Static<typeof WebhookListQuerySchema>;

/**
 *
 */
export const WebhookListQueryValidator = TypeCompiler.Compile(WebhookListQuerySchema);

/**
 *
 */
export type WebhookListQueryDTO = RequiredProps<WebhookListBaseQuery, 'limit'> | { cursor: WebhookListDecodedCursor };

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 *
 */
export const WebhookListResponseSchema = Type.Object(
  {
    object: Type.Literal('WebhookList'),
    items: Type.Array(
      Type.Union([
        Type.Composite([Type.Object({ object: Type.Literal('Webhook') }), WebhookAutoSchema]),
        Type.Composite([Type.Object({ object: Type.Literal('Webhook') }), WebhookTriggerSchema]),
      ]),
    ),
    cursor: Type.Union([EncodedQueryCursorType(), Type.Null()]),
  },
  {
    description: '@todo',
  },
);

export type WebhookListResponse = Static<typeof WebhookListResponseSchema>;

/**  */
export const WebhookListResponseValidator = TypeCompiler.Compile(WebhookListResponseSchema);
