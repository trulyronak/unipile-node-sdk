import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { i18n } from "../../common/i18n.fake.js";
import { UniqueIdSchema } from "../../common/common.types.js";
import { RequiredProps } from "../../common/core.types.tmp.js";
import { UTCDateTimeMsSchema } from "../../common/date.types.js";
import { EncodedQueryCursorType } from "../../common/query-cursor.js";
import {
  AccountIdParamSchema,
  ListCursorQuerySchema,
  ListLimitQuerySchema,
  SenderIdParamSchema,
} from "../../common/query-parameters.type.js";
import { MessageSchema } from "./ressource.types.js";

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------

/**
 * @todo Read Typebox doc about Transform Types :
 *       https://github.com/sinclairzx81/typebox#transform-types
 */
// export const MessageListCursorTransform = Type.Transform(CursorParamSchema).
// Decode(v => {
//     const parsed = JSON.parse(Buffer.from(v, "base64").toString());

// }).Encode()

const MessageListOptionsQuerySchema = Type.Object({
  account_id: Type.Optional(AccountIdParamSchema),
  after: Type.Optional(UTCDateTimeMsSchema),
  before: Type.Optional(UTCDateTimeMsSchema),
  sender_id: Type.Optional(SenderIdParamSchema),
});

export type MessageListOptionsQuery = Static<
  typeof MessageListOptionsQuerySchema
>;

/**
 *
 */
export const MessageListDecodedCursorSchema = Type.Composite([
  MessageListOptionsQuerySchema,
  Type.Required(ListLimitQuerySchema),
  Type.Object({
    cursor: Type.Object({
      last_id: UniqueIdSchema,
      last_date: UTCDateTimeMsSchema,
    }),
  }),
]);

export type MessageListDecodedCursor = Static<
  typeof MessageListDecodedCursorSchema
>;

export const MessageListDecodedCursorValidator = TypeCompiler.Compile(
  MessageListDecodedCursorSchema
);

/**
 *
 */
export const MessagesListBaseQuerySchema = Type.Composite([
  MessageListOptionsQuerySchema,
  ListLimitQuerySchema,
]);

export type MessagesListBaseQuery = Static<typeof MessagesListBaseQuerySchema>;

/**
 *
 */
export const MessagesListQuerySchema = Type.Union(
  [MessagesListBaseQuerySchema, ListCursorQuerySchema],
  { description: i18n.t("@todo api.Query.Cursor.ignore_other_params") }
);

export type MessageListQuery = Static<typeof MessagesListQuerySchema>;

/**
 *
 */
export const MessageListQueryValidator = TypeCompiler.Compile(
  MessagesListQuerySchema
);

/**
 *
 */
export type MessagesListQueryDTO =
  | RequiredProps<MessagesListBaseQuery, "limit">
  | { cursor: MessageListDecodedCursor };

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 *
 */
export const MessageListApiResponseSchema = Type.Object({
  object: Type.Literal("MessageList"),
  items: Type.Array(
    Type.Composite([
      Type.Object({ object: Type.Literal("Message") }),
      MessageSchema,
    ])
  ),
  cursor: Type.Union([EncodedQueryCursorType(), Type.Null()]),
});

export type MessageListApiResponse = Static<
  typeof MessageListApiResponseSchema
>;

// export const getMessageListResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   MessageListApiResponseSchema
// );

/**  */
export const MessageListApiResponseValidator = TypeCompiler.Compile(MessageListApiResponseSchema);