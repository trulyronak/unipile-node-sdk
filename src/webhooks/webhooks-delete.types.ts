import { Type, Static } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------


/**
 *
 */
export const WebhookDeleteResponseSchema = Type.Object(
  {
    object: Type.Literal("WebhookDeleted"),
  },
  {
    description: "@todo",
  }
);

export type WebhookDeleteResponse = Static<typeof WebhookDeleteResponseSchema>;

// /**
//  *
//  */
// export const getWWebhookDeleteResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   WebhookDeleteResponseSchema
// );


/**  */
export const WebhookDeleteResponseValidator = TypeCompiler.Compile(WebhookDeleteResponseSchema);