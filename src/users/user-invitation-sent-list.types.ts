import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { UniqueId } from "../common/common.types.js";
import {
  CursorParamSchema,
  ShortLimitParamSchema,
} from "../common/query-parameters.type.js";
import { InvitationSchema } from "./ressource.types.js";

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------

export const UserInvitationSentListQuerySchema = Type.Object({
  account_id: Type.String({
    description: "The id of the account to perform the request from.",
    minLength: 1,
  }),
  limit: Type.Optional(ShortLimitParamSchema),
  cursor: Type.Optional(CursorParamSchema),
});

export const UserInvitationSentListQueryValidator = TypeCompiler.Compile(
  UserInvitationSentListQuerySchema
);

export const UserInvitationSentListDecodedCursorSchema = Type.Object({
  limit: Type.Number(),
  cursor: Type.Number(),
});

export type UserInvitationSentListDecodedCursor = Static<
  typeof UserInvitationSentListDecodedCursorSchema
>;

export const UserInvitationSentListDecodedCursorValidator =
  TypeCompiler.Compile(UserInvitationSentListDecodedCursorSchema);

export type UserInvitationSentListQuery = Static<
  typeof UserInvitationSentListQuerySchema
>;

export type UserInvitationSentListQueryDTO = {
  account_id: UniqueId;
  limit: number;
  cursor?: number;
};

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

const UserInvitationSentListApiResponseSchema = Type.Object({
  object: Type.Literal("InvitationList"),
  items: Type.Array(
    Type.Composite([
      Type.Object({ object: Type.Literal("InvitationSent") }),
      InvitationSchema,
    ])
  ),
  cursor: Type.Union([Type.String(), Type.Null()]),
});

export type UserInvitationSentListApiResponse = Static<
  typeof UserInvitationSentListApiResponseSchema
>;

/**  */
export const UserInvitationSentListApiResponseValidator = TypeCompiler.Compile(UserInvitationSentListApiResponseSchema);