import { Static, Type } from "@sinclair/typebox";
import { UniqueIdSchema } from "../../common/common.types.js";

/**
 *
 */
export const ChatAttendeeLinkedinSpecifics = Type.Object({
  provider: Type.Literal("LINKEDIN"),
  member_urn: Type.String(),
  occupation: Type.Optional(Type.String()),
  network_distance: Type.Optional(
    Type.Union([
      Type.Literal("DISTANCE_1"),
      Type.Literal("DISTANCE_2"),
      Type.Literal("DISTANCE_3"),
      Type.Literal("OUT_OF_NETWORK"),
    ])
  ),
  pending_invitation: Type.Optional(Type.Boolean()),
  location: Type.Optional(Type.String()),
  headline: Type.Optional(Type.String()),
  contact_info: Type.Optional(
    Type.Object({
      emails: Type.Optional(Type.Array(Type.String())),
      phone_numbers: Type.Optional(Type.Array(Type.String())),
      websites: Type.Optional(Type.Array(Type.String())),
      social_handles: Type.Optional(
        Type.Array(Type.Object({ type: Type.String(), name: Type.String() }))
      ),
    })
  ),

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
