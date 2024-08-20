import { Static, Type } from "@sinclair/typebox";
import { UniqueIdSchema } from "../../common/common.types.js";

/**
 *
 */
export const ChatAttendeeLinkedinSpecifics = Type.Object({
  provider: Type.Literal("LINKEDIN"),
  member_urn: Type.String(),
  occupation: Type.Optional(Type.String()),
});

/**
 *
 */
export const ChatAttendeeSchema = Type.Object({
  id: UniqueIdSchema,
  account_id: UniqueIdSchema,
  provider_id: Type.String(),
  name: Type.String(),
  is_self: Type.Union([Type.Literal(1), Type.Literal(0)]),
  hidden: Type.Optional(Type.Union([Type.Literal(1), Type.Literal(0)])),
  picture_url: Type.Optional(Type.String()),
  profile_url: Type.Optional(Type.String()),
  specifics: Type.Optional(
    Type.Union([ChatAttendeeLinkedinSpecifics], {
      description: "Provider specific additional data.",
    })
  ),
});

export type ChatAttendee = Static<typeof ChatAttendeeSchema>;
