import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import {
  UniqueIdSchema
} from "../../common/common.types.js";
import { RequiredProps } from "../../common/core.types.tmp.js";
import { UTCDateTimeMsSchema } from "../../common/date.types.js";
import { EncodedQueryCursorType } from "../../common/query-cursor.js";
import {
  AccountIdParamSchema,
  ListCursorQuerySchema,
  ListLimitQuerySchema,
} from "../../common/query-parameters.type.js";
import { MessagingAccountTypeSchema } from "../messaging.types.js";
import { ChatSchema } from "./ressource.types.js";

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------
export const DEFAULT_CHAT_LIST_LIMIT = 100;

/**
 *
 */
export const ChatListOptionsQuerySchema = Type.Object({
  account_id: Type.Optional(Type.Array(AccountIdParamSchema)),
  account_type: Type.Optional(MessagingAccountTypeSchema),
  after: Type.Optional(UTCDateTimeMsSchema),
  before: Type.Optional(UTCDateTimeMsSchema),
  unread: Type.Optional(Type.Boolean()),
});

export type ChatListOptionsQuery = Static<typeof ChatListOptionsQuerySchema>;

/**
 *
 */
export const ChatListDecodedCursorSchema = Type.Composite([
  ChatListOptionsQuerySchema,
  Type.Required(ListLimitQuerySchema),
  Type.Object({
    cursor: Type.Object({
      last_id: UniqueIdSchema,
      last_date: UTCDateTimeMsSchema,
    }),
  }),
]);

export type ChatListDecodedCursor = Static<typeof ChatListDecodedCursorSchema>;

export const ChatListDecodedCursorValidator = TypeCompiler.Compile(
  ChatListDecodedCursorSchema
);

/**
 *
 */
export const ChatListBaseQuerySchema = Type.Composite([
  ChatListOptionsQuerySchema,
  ListLimitQuerySchema,
]);

export type ChatListBaseQuery = Static<typeof ChatListBaseQuerySchema>;

/**
 *
 */
export const ChatListQuerySchema = Type.Union([
  ChatListBaseQuerySchema,
  ListCursorQuerySchema,
]);

export type ChatListQuery = Static<typeof ChatListQuerySchema>;

// /**
//  *
//  */
// export const getChatListQueryOpenApiSchema =
//   makeOpenApiSchemaGetter(ChatListQuerySchema);

/**
 *
 */
export const ChatListQueryValidator = TypeCompiler.Compile(ChatListQuerySchema);

/**
 *
 */
export type ChatListQueryDTO =
  | RequiredProps<ChatListBaseQuery, "limit">
  | { cursor: ChatListDecodedCursor };

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 *
 */
export const ChatListResponseSchema = Type.Object({
  object: Type.Literal("ChatList"),
  items: Type.Array(
    Type.Composite([Type.Object({ object: Type.Literal("Chat") }), ChatSchema])
  ),
  cursor: Type.Union([EncodedQueryCursorType(), Type.Null()]),
});

export type ChatListApiResponse = Static<typeof ChatListResponseSchema>;

// export const getChatListResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   ChatListResponseSchema
// );


/**  */
export const ChatListApiResponseValidator = TypeCompiler.Compile(ChatListResponseSchema);