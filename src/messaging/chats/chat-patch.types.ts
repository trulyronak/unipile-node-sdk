import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { UniqueId } from "../../common/common.types.js";

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------

/**
 *
 */
export const ChatPatchBodySchema = Type.Union([
  Type.Object(
    {
      action: Type.Literal("setReadStatus"),
      value: Type.Boolean(),
    },
    { description: "Set new chat read status" }
  ),
]);

export type ChatPatchBody = Static<typeof ChatPatchBodySchema>;

// /**
//  *
//  */
// export const getChatPatchBodyOpenApiSchema =
//   makeOpenApiSchemaGetter(ChatPatchBodySchema);

/**
 *
 */
export const ChatPatchBodyValidator = TypeCompiler.Compile(ChatPatchBodySchema);

export type ChatPatchDTO = {
  chat_id: UniqueId;
} & ChatPatchBody;

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

export const ChatPatchedApiResponseSchema = Type.Object({
  object: Type.Literal("ChatPatched"),
});

export type ChatPatchedApiResponse = Static<
  typeof ChatPatchedApiResponseSchema
>;

// /**
//  *
//  */
// export const getChatPatchedResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   ChatPatchedApiResponseSchema
// );

/**  */
export const ChatPatchedApiResponseValidator = TypeCompiler.Compile(ChatPatchedApiResponseSchema);