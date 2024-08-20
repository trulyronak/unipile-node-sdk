import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { i18n } from "../../common/i18n.fake.js";
import { UniqueIdSchema } from "../../common/common.types.js";
import { RequiredProps } from "../../common/core.types.tmp.js";
import { EncodedQueryCursorType } from "../../common/query-cursor.js";
import {
  AccountIdParamSchema,
  ListCursorQuerySchema,
  ListLimitQuerySchema,
} from "../../common/query-parameters.type.js";
import { ChatAttendeeSchema } from "./ressource.types.js";

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------

/**
 *
 */
export const ChatAttendeeListOptionsQuerySchema = Type.Object({
  account_id: Type.Optional(AccountIdParamSchema),
});

export type ChatListOptionsQuery = Static<
  typeof ChatAttendeeListOptionsQuerySchema
>;

/**
 *
 */
export const ChatAttendeeListDecodedCursorSchema = Type.Composite([
  ChatAttendeeListOptionsQuerySchema,
  Type.Required(ListLimitQuerySchema),
  Type.Object({
    cursor: Type.Object({
      last_id: UniqueIdSchema,
    }),
  }),
]);

export type ChatAttendeeListDecodedCursor = Static<
  typeof ChatAttendeeListDecodedCursorSchema
>;

export const ChatAttendeeListDecodedCursorValidator = TypeCompiler.Compile(
  ChatAttendeeListDecodedCursorSchema
);

/**
 *
 */
export const ChatAttendeeListBaseQuerySchema = Type.Composite([
  ChatAttendeeListOptionsQuerySchema,
  ListLimitQuerySchema,
]);

export type ChatAttendeeListBaseQuery = Static<
  typeof ChatAttendeeListBaseQuerySchema
>;

/**
 *
 */
export const ChatAttendeeListQuerySchema = Type.Union(
  [ChatAttendeeListBaseQuerySchema, ListCursorQuerySchema],
  { description: i18n.t("@todo api.Query.Cursor.ignore_other_params") }
);

export type ChatAttendeeListQuery = Static<typeof ChatAttendeeListQuerySchema>;

// /**
//  *
//  */
// export const getChatAttendeeListQueryOpenApiSchema = makeOpenApiSchemaGetter(
//   ChatAttendeeListQuerySchema
// );

/**
 *
 */
export const ChatAttendeeListQueryValidator = TypeCompiler.Compile(
  ChatAttendeeListQuerySchema
);

/**
 *
 */
export type ChatAttendeeListQueryDTO =
  | RequiredProps<ChatAttendeeListBaseQuery, "limit">
  | { cursor: ChatAttendeeListDecodedCursor };

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 *
 */
export const ChatAttendeeListApiResponseSchema = Type.Object({
  object: Type.Literal("ChatAttendeeList"),
  items: Type.Array(
    Type.Composite([
      Type.Object({ object: Type.Literal("ChatAttendee") }),
      ChatAttendeeSchema,
    ])
  ),
  cursor: Type.Union([EncodedQueryCursorType(), Type.Null()]),
});

export type ChatAttendeeListApiResponse = Static<
  typeof ChatAttendeeListApiResponseSchema
>;

export type ChatAttendeeByChatListApiResponse = Omit<
  ChatAttendeeListApiResponse,
  "cursor"
>;

// export const getChatAttendeeListResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   ChatAttendeeListApiResponseSchema
// );


/**  */
export const ChatAttendeeListApiResponseValidator = TypeCompiler.Compile(ChatAttendeeListApiResponseSchema);