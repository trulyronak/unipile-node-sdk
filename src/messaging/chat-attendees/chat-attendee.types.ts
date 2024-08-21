import { Static, Type } from "@sinclair/typebox";
import { ChatAttendeeSchema } from "./ressource.types.js";
import { TypeCompiler } from "@sinclair/typebox/compiler";

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 *
 */
export const ChatAttendeeResponseSchema = Type.Composite([
  ChatAttendeeSchema,
  Type.Object({
    object: Type.Literal("ChatAttendee"),
  }),
]);

export type ChatAttendeeResponse = Static<typeof ChatAttendeeResponseSchema>;

// export const getChatAttendeeResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   ChatAttendeeResponseSchema
// );


/**  */
export const ChatAttendeeResponseValidator = TypeCompiler.Compile(ChatAttendeeResponseSchema);