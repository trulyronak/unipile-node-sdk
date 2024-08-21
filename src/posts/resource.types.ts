import { Static, Type } from "@sinclair/typebox";
import { UniqueIdSchema } from "../common/common.types.js";

export const CommentSchema = Type.Object({
  id: UniqueIdSchema,
  author: Type.Union([Type.String(), Type.Null()]),
  author_details: Type.Object({
    id: Type.Union([Type.String(), Type.Null()]),
    headline: Type.Union([Type.String(), Type.Null()]),
    profile_url: Type.Union([Type.String(), Type.Null()]),
    network_distance: Type.Union([
      Type.Literal("FIRST_DEGREE"),
      Type.Literal("SECOND_DEGREE"),
      Type.Literal("THIRD_DEGREE"),
      Type.Literal("OUT_OF_NETWORK"),
      Type.Null(),
    ]),
  }),
  date: Type.String(),
  text: Type.String(),
  reaction_counter: Type.Number(),
  reply_counter: Type.Number(),
});

export type Comment = Static<typeof CommentSchema>;

export const LinkedinPostReactionSchema = Type.Object({
  value: Type.Union([
    Type.Literal("LIKE"),
    Type.Literal("PRAISE"),
    Type.Literal("APPRECIATION"),
    Type.Literal("EMPATHY"),
    Type.Literal("INTEREST"),
    Type.Literal("ENTERTAINMENT"),
  ]),
  author: Type.Object({
    id: UniqueIdSchema,
    type: Type.Union([Type.Literal("INDIVIDUAL"), Type.Literal("COMPANY")]),
    name: Type.Union([Type.String(), Type.Null()]),
    headline: Type.Union([Type.String(), Type.Null()]),
    profile_url: Type.Union([Type.String(), Type.Null()]),
    network_distance: Type.Optional(
      Type.Union([
        Type.Literal("FIRST_DEGREE"),
        Type.Literal("SECOND_DEGREE"),
        Type.Literal("THIRD_DEGREE"),
        Type.Literal("OUT_OF_NETWORK"),
      ])
    ),
  }),
});

export type LinkedinPostReaction = Static<typeof LinkedinPostReactionSchema>;
