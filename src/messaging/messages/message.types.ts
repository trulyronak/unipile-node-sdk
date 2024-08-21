import { Static, Type } from "@sinclair/typebox";
import { MessageSchema } from "./ressource.types.js";
import { TypeCompiler } from "@sinclair/typebox/compiler";

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 *
 */
export const MessageResponseSchema = Type.Composite([
  MessageSchema,
  Type.Object({
    object: Type.Literal("Message"),
  }),
]);

export type MessageResponse = Static<typeof MessageResponseSchema>;

// export const getMessageResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   MessageResponseSchema,
// );

/**  */
export const MessageResponseValidator = TypeCompiler.Compile(MessageResponseSchema);