import { Static, Type } from "@sinclair/typebox";
import { PartialMailSchema } from "./ressource.types.js";
import { TypeCompiler } from "@sinclair/typebox/compiler";

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 *
 */
export const MailApiResponseSchema = Type.Composite(
  [
    Type.Object({
      object: Type.Literal("Email"),
    }),
    PartialMailSchema,
  ],
  { description: "@todo Email" }
);

export type MailApiResponse = Static<typeof MailApiResponseSchema>;

// export const getMailResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   MailApiResponseSchema
// );

/**  */
export const MailApiResponseValidator = TypeCompiler.Compile(MailApiResponseSchema);