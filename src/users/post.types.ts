import { Static, Type } from "@sinclair/typebox";
import { PostSchema } from "./ressource.types.js";
import { TypeCompiler } from "@sinclair/typebox/compiler";

export const UserPostApiResponseSchema = Type.Composite([
  PostSchema,
  Type.Object({
    object: Type.Literal("Post"),
  }),
]);

export type UserPostApiResponse = Static<typeof UserPostApiResponseSchema>;

/**  */
export const UserPostApiResponseValidator = TypeCompiler.Compile(UserPostApiResponseSchema);