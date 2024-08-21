import { Type, Static } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

const LINKEDIN_COMMENT_CHARACTER_LIMIT = 1250;

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------
export const CommentPostBodySchema = Type.Object({
  account_id: Type.String({
    description: "The id of the account to perform the request from.",
    minLength: 1,
  }),
  text: Type.String({
    minLength: 1,
    maxLength: LINKEDIN_COMMENT_CHARACTER_LIMIT,
  }),
});

export type CommentPostBody = Static<typeof CommentPostBodySchema>;

export const commentPostBodyValidator = TypeCompiler.Compile(
  CommentPostBodySchema
);

// export const commentPostBodyOpenApiSchema = makeOpenApiSchemaGetter(
//   CommentPostBodySchema
// );
// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------
export const CommentPostResponseSchema = Type.Object({
  object: Type.Literal("CommentSent"),
});

export type CommentPostResponse = Static<typeof CommentPostResponseSchema>;

// /**
//  *
//  */
// export const getCommentSentResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   CommentPostResponseSchema
// );

/**  */
export const CommentPostResponseValidator = TypeCompiler.Compile(CommentPostResponseSchema);