import { Type, Static } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { StringEnum } from "../common/common.types.js";

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------
export const addPostReactionBodySchema = Type.Object({
  account_id: Type.String({
    description: "The id of the account to perform the request from.",
    minLength: 1,
  }),
  post_id: Type.String({
    minLength: 1,
    description: "The id of the post that will receive the reaction.",
  }),
  reaction_type: Type.Optional(
    StringEnum(["like", "celebrate", "support", "love", "insightful", "funny"])
  ),
});

export type AddPostReactionBody = Static<typeof addPostReactionBodySchema>;

export type AddPostReactionServiceInput = Required<AddPostReactionBody>;

export const addPostReactionBodyValidator = TypeCompiler.Compile(
  addPostReactionBodySchema
);

// export const addPostReactionBodyOpenApiSchema = makeOpenApiSchemaGetter(
//   addPostReactionBodySchema
// );
// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------
export const addPostReactionResponseSchema = Type.Object({
  object: Type.Literal("ReactionAdded"),
});

export type AddPostReactionResponse = Static<
  typeof addPostReactionResponseSchema
>;

// /**
//  *
//  */
// export const addPostReactionResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   addPostReactionResponseSchema
// );

/**  */
export const AddPostReactionResponseValidator = TypeCompiler.Compile(addPostReactionResponseSchema);