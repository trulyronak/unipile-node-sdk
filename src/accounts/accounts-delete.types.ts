import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 * Schema when an account has been deleted with success
 */
export const AccountDeletedApiResponseSchema = Type.Object({
  object: Type.Literal("AccountDeleted"),
});

export type AccountDeletedApiResponse = Static<
  typeof AccountDeletedApiResponseSchema
>;

// /**
//  *
//  */
// export const getAccountDeletedResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   AccountDeletedApiResponseSchema
// );

/**  */
export const AccountDeletedApiResponseValidator = TypeCompiler.Compile(AccountDeletedApiResponseSchema);