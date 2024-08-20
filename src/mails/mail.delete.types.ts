import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { AccountIdParamSchema } from "../common/query-parameters.type.js";

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

export const MailDeletedApiResponseSchema = Type.Object(
  {
    object: Type.Literal("EmailDeleted"),
  },
  { description: "@todo Email has been deleted." }
);

// /**
//  *
//  */
// export const getMailDeletedResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   MailDeletedApiResponseSchema
// );

/**
 *
 */
export type MailDeletedApiResponse = Static<
  typeof MailDeletedApiResponseSchema
>;

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

export const MailTrashedApiResponseSchema = Type.Object(
  {
    object: Type.Literal("EmailTrashed"),
  },
  { description: "@todo Email has been trashed." }
);

// /**
//  *
//  */
// export const getMailTrashedResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   MailTrashedApiResponseSchema
// );

/**
 *
 */
export type MailTrashedApiResponse = Static<
  typeof MailTrashedApiResponseSchema
>;

/**
 *
 */
const MailDeleteOptionsQuerySchema = Type.Object({
  account_id: Type.Optional(AccountIdParamSchema),
});

/**
 *
 */
export const MailDeleteQuerySchema = MailDeleteOptionsQuerySchema;

/**
 *
 */
export const MailDeleteQueryValidator = TypeCompiler.Compile(MailDeleteQuerySchema);


/**  */
export const MailDeletedApiResponseValidator = TypeCompiler.Compile(MailDeletedApiResponseSchema);