import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { AccountIdParamSchema } from "../common/query-parameters.type.js";

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------

/**
 *
 */
export const MailUpdateBodySchema = Type.Object({
  unread: Type.Optional(
    Type.Boolean({ description: "Indicates whether the email should be marked as unread." })
  ),
  folders: Type.Optional(
    Type.Array(
      Type.String(),
      { description: "The names of the folders to which the email should be moved. Outlook and IMAP accounts accept only one folder." }
    )
  ),
});

export const MailUpdateBodyValidator = TypeCompiler.Compile(MailUpdateBodySchema);

// export const getMailUpdateBodyOpenApiSchema = makeOpenApiSchemaGetter(MailUpdateBodySchema);

/**
 *
 */
const MailUpdateOptionsQuerySchema = Type.Object({
  account_id: Type.Optional(AccountIdParamSchema),
});

/**
 *
 */
export const MailUpdateQuerySchema = MailUpdateOptionsQuerySchema;

/**
 *
 */
export const MailUpdateQueryValidator = TypeCompiler.Compile(MailUpdateQuerySchema);

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 *
 */
export const MailUpdatedApiResponseSchema = Type.Object(
  {
    object: Type.Literal("EmailUpdated"),
  },
  { description: "@todo Email has been updated." }
);

// export const getMailUpdatedResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   MailUpdatedApiResponseSchema
// );

export type MailUpdatedApiResponse = Static<typeof MailUpdatedApiResponseSchema>;


/**  */
export const MailUpdatedApiResponseValidator = TypeCompiler.Compile(MailUpdatedApiResponseSchema);