import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { UserPostApiResponseSchema } from "./post.types.js";

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------
const LINKEDIN_POST_LIST_LIMIT_MIN = 1;
const LINKEDIN_POST_LIST_LIMIT_MAX = 100; // Linkedin’s api don’t allows more
export const LINKEDIN_POST_LIST_LIMIT_DEFAULT = LINKEDIN_POST_LIST_LIMIT_MAX;

export const LinkedinPostLimitParamSchema = Type.Integer({
  minimum: LINKEDIN_POST_LIST_LIMIT_MIN,
  maximum: LINKEDIN_POST_LIST_LIMIT_MAX,
  description: `A limit for the number of items returned in the response. The value can be set between ${LINKEDIN_POST_LIST_LIMIT_MIN} and ${LINKEDIN_POST_LIST_LIMIT_MAX}.`,
  example: LINKEDIN_POST_LIST_LIMIT_DEFAULT,
});

// export const getLinkedinPostLimitParamOpenApiSchema = makeOpenApiSchemaGetter(
//   LinkedinPostLimitParamSchema
// );

export const UserPostListQuerySchema = Type.Object({
  account_id: Type.String({
    description: "The id of the account to perform the request from.",
    minLength: 1,
  }),
  is_company: Type.Optional(Type.Boolean()),
  limit: Type.Optional(LinkedinPostLimitParamSchema),
  cursor: Type.Optional(Type.String()),
});

export const UserPostListQueryValidator = TypeCompiler.Compile(
  UserPostListQuerySchema
);

export const UserPostListBodySchema = Type.Composite([
  UserPostListQuerySchema,
  Type.Object({ identifier: Type.String() }),
]);

export type UserPostListBody = Static<typeof UserPostListBodySchema>;

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

const UserPostListApiResponseSchema = Type.Object({
  object: Type.Literal("PostList"),
  items: Type.Array(UserPostApiResponseSchema),
  cursor: Type.Union([Type.String(), Type.Null()]),
});

export type UserPostListApiResponse = Static<
  typeof UserPostListApiResponseSchema
>;

// export const getUserPostListResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   UserPostListApiResponseSchema
// );

/**  */
export const UserPostListApiResponseValidator = TypeCompiler.Compile(UserPostListApiResponseSchema);