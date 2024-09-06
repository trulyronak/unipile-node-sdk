import { Static, Type } from "@sinclair/typebox";
import { CommentSchema } from "./resource.types.js";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { CursorParamSchema } from "../common/query-parameters.type.js";
import { UniqueIdSchema } from "../common/common.types.js";

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------
const LINKEDIN_COMMENT_LIST_LIMIT_MIN = 1;
const LINKEDIN_COMMENT_LIST_LIMIT_MAX = 100; // Linkedin’s api don’t allows more
export const LINKEDIN_COMMENT_LIST_LIMIT_DEFAULT =
  LINKEDIN_COMMENT_LIST_LIMIT_MAX;

export const LinkedinCommentLimitParamSchema = Type.Optional(
  Type.Integer({
    minimum: LINKEDIN_COMMENT_LIST_LIMIT_MIN,
    maximum: LINKEDIN_COMMENT_LIST_LIMIT_MAX,
    description: `A limit for the number of items returned in the response. The value can be set between ${LINKEDIN_COMMENT_LIST_LIMIT_MIN} and ${LINKEDIN_COMMENT_LIST_LIMIT_MAX}.`,
    example: LINKEDIN_COMMENT_LIST_LIMIT_DEFAULT,
  })
);

export const PostCommentListBaseQuerySchema = Type.Object({
    account_id: Type.String({
      description: "The id of the account to perform the request from.",
      minLength: 1,
    }),
    limit: LinkedinCommentLimitParamSchema,
    comment_id: Type.Optional(
      Type.String({
        minLength: 1,
        description: "The id of the comment to get replies from.",
      })
    ),
});

export const PostCommentListQuerySchema = Type.Composite([
  PostCommentListBaseQuerySchema,
  Type.Object({ cursor: Type.Optional(CursorParamSchema) }),
]);

export const PostCommentListQueryValidator = TypeCompiler.Compile(
  PostCommentListQuerySchema
);

/**
 *
 */
export const PostCommentListDecodedCursorSchema = Type.Composite([
    Type.Required(Type.Omit(PostCommentListBaseQuerySchema, ["comment_id"])),
    Type.Object({
      post_id: UniqueIdSchema,
      thread_id: Type.Optional(UniqueIdSchema),
      start: Type.Number(),
    }),
]);

export type PostCommentListDecodedCursor = Static<
  typeof PostCommentListDecodedCursorSchema
>;

export const PostCommentListDecodedCursorValidator = TypeCompiler.Compile(
  PostCommentListDecodedCursorSchema
);

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

export const CommentListApiResponseSchema = Type.Object({
    object: Type.Literal("CommentList"),
    items: Type.Array(
      Type.Composite([
        Type.Object({ object: Type.Literal("Comment") }),
        CommentSchema,
      ])
    ),
    cursor: Type.Union([Type.String(), Type.Null()]),
    total_items: Type.Union([Type.Number(), Type.Null()]),
});

export type PostCommentListApiResponse = Static<
  typeof CommentListApiResponseSchema
>;

// export const getPostCommentListResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   CommentListApiResponseSchema
// );

/**  */
export const PostCommentListApiResponseValidator = TypeCompiler.Compile(CommentListApiResponseSchema);