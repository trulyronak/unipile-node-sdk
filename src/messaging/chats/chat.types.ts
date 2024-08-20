import { Static, Type } from "@sinclair/typebox";
import { ChatSchema } from "./ressource.types.js";
import { TypeCompiler } from "@sinclair/typebox/compiler";

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 *
 */
export const ChatResponseSchema = Type.Composite([
  ChatSchema,
  Type.Object({
    object: Type.Literal("Chat"),
  }),
]);

export type ChatResponse = Static<typeof ChatResponseSchema>;

// export const getChatResponseOpenApiSchema =
//   makeOpenApiSchemaGetter(ChatResponseSchema);

/**  */
export const ChatResponseValidator = TypeCompiler.Compile(ChatResponseSchema);
