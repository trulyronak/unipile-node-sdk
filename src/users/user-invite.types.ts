import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------

export const UserInviteBodySchema = Type.Object({
  provider_id: Type.String({
    description:
      "The id of the user to add. It has to be the provider’s id.",
  }),
  account_id: Type.String({
    description: "The id of the account where the user will be added.",
  }),
  message: Type.Optional(
    Type.String({
      maxLength: 300,
      description: "An optional message to go with the invitation (max 300 chars).",

    })
  ),
});

export type UserInviteBody = Static<typeof UserInviteBodySchema>;

// export const getUserInviteBodyOpenApiSchema =
//   makeOpenApiSchemaGetter(UserInviteBodySchema);

export const UserInviteBodyValidator =
  TypeCompiler.Compile(UserInviteBodySchema);

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

export const UserInviteApiResponseSchema = Type.Object({
  object: Type.Literal("UserInvitationSent"),
  invitation_id: Type.String(),
});

export type UserInviteApiResponse = Static<typeof UserInviteApiResponseSchema>;

// export const getUserInviteResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   UserInviteApiResponseSchema
// );

/**  */
export const UserInviteApiResponseValidator = TypeCompiler.Compile(UserInviteApiResponseSchema);