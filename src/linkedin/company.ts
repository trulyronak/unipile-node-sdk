import { Static, Type } from "@sinclair/typebox";
import { LinkedinCompanyProfileSchema } from "./ressource.types.js";
import { TypeCompiler } from "@sinclair/typebox/compiler";

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

export const LinkedinCompanyProfileResponseSchema = Type.Composite([
  Type.Object({
    object: Type.Literal("CompanyProfile"),
  }),
  LinkedinCompanyProfileSchema,
]);

export type LinkedinCompanyProfileApiResponse = Static<
  typeof LinkedinCompanyProfileResponseSchema
>;

// export const getLinkedinCompanyProfileResponseOpenApiSchema =
//   makeOpenApiSchemaGetter(LinkedinCompanyProfileResponseSchema);



/**  */
export const LinkedinCompanyProfileResponseValidator = TypeCompiler.Compile(LinkedinCompanyProfileResponseSchema);