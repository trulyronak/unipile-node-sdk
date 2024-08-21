import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------

export const CancelUserInvitationQuerySchema = Type.Object({
  account_id: Type.String({
    description: "The id of the account to perform the request from.",
    minLength: 1,
  }),
});

export const CancelUserInvitationQueryValidator = TypeCompiler.Compile(
  CancelUserInvitationQuerySchema
);

export const CancelUserInvitationBodySchema = Type.Composite([
  CancelUserInvitationQuerySchema,
  Type.Object({ invitation_id: Type.String() }),
]);

export type CancelUserInvitationBody = Static<
  typeof CancelUserInvitationBodySchema
>;

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

const CancelUserInvitationResponseSchema = Type.Object({
  object: Type.Literal("InvitationCanceled"),
});

export type CancelUserInvitationApiResponse = Static<
  typeof CancelUserInvitationResponseSchema
>;

// export const cancelUserUserInvitationResponseOpenApiSchema =
//   makeOpenApiSchemaGetter(CancelUserInvitationResponseSchema);

/**  */
export const CancelUserInvitationApiResponseValidator = TypeCompiler.Compile(CancelUserInvitationResponseSchema);