import { Static, Type } from "@sinclair/typebox";
import { UniqueIdSchema } from "../../common/common.types.js";

/**
 *
 */
export const BaseMessageAttachmentSchema = Type.Object({
  id: Type.String(),
  file_size: Type.Optional(Type.Number()),
  unavailable: Type.Boolean(),
  mimetype: Type.Optional(Type.String()),
  url: Type.Optional(Type.String()),
  url_expires_at: Type.Optional(Type.Number()),
});

/**
 *
 */
export const MessageAttachmentSize = Type.Object({
  width: Type.Number(),
  height: Type.Number(),
});

/**
 *
 */
export const MessageImageAttachmentSchema = Type.Composite([
  BaseMessageAttachmentSchema,
  Type.Object({
    type: Type.Literal("img"),
    size: MessageAttachmentSize,
    sticker: Type.Boolean(),
  }),
]);

/**
 *
 */
export const MessageVideoAttachmentSchema = Type.Composite([
  BaseMessageAttachmentSchema,
  Type.Object({
    type: Type.Literal("video"),
    size: MessageAttachmentSize,
    gif: Type.Boolean(),
  }),
]);

/**
 *
 */
export const MessageAudioAttachmentSchema = Type.Composite([
  BaseMessageAttachmentSchema,
  Type.Object({
    type: Type.Literal("audio"),
    duration: Type.Optional(Type.Number()),
    voice_note: Type.Boolean(),
  }),
]);

/**
 *
 */
export const MessageFileAttachmentSchema = Type.Composite([
  BaseMessageAttachmentSchema,
  Type.Object({
    type: Type.Literal("file"),
    file_name: Type.String(),
  }),
]);

/**
 *
 */
export const MessageLinkAttachmentSchema = Type.Composite([
  BaseMessageAttachmentSchema,
  Type.Object({
    type: Type.Literal("linkedin_post"),
  }),
]);

/**
 *
 */
export const MessageAttachmentSchema = Type.Union([
  MessageImageAttachmentSchema,
  MessageVideoAttachmentSchema,
  MessageAudioAttachmentSchema,
  MessageFileAttachmentSchema,
  MessageLinkAttachmentSchema,
]);

/**
 *
 */
export const MessageReactionSchema = Type.Object({
  value: Type.String(),
  sender_id: Type.String(),
  is_sender: Type.Boolean(),
});

/**
 *
 */
export const MessageBehaviourSchema = Type.Enum({ SILENT: 0 });

/**
 *
 */
export const MessageEventTypeSchema = Type.Enum({
  UNKNOWN: 0,
  REACTION: 1,
  REACTION_TO_ME: 2,
  GROUP_CREATE: 3,
  GROUP_CHANGE_SUBJECT: 4,
  GROUP_PARTICIPANT_ADD: 5,
  GROUP_PARTICIPANT_REMOVE: 6,
  GROUP_PARTICIPANT_LEAVE: 7,
  CALL_MISSED_VOICE: 8,
  CALL_MISSED_VIDEO: 9,
});

/**
 *
 */
export const BaseMessageSchema = Type.Object({
  provider_id: Type.String(),
  sender_id: Type.String(),
  text: Type.Union([Type.String(), Type.Null()]),
  attachments: Type.Array(MessageAttachmentSchema),
});

/**
 *
 */
export const MessageDraftAttachmentSchema = Type.Object({
  id: UniqueIdSchema,
  fileName: Type.String(),
  mimeType: Type.String(),
  byteSize: Type.Optional(Type.Number()),
  voiceMessage: Type.Optional(Type.Boolean()),
});

export type MessageDraftAttachment = Static<
  typeof MessageDraftAttachmentSchema
>;

/**
 *
 */
export const MessageDraftSchema = Type.Object({
  id: UniqueIdSchema,
  text: Type.String(),
  quote_id: Type.Optional(UniqueIdSchema),
  attachments: Type.Array(MessageDraftAttachmentSchema),
});

/**
 *
 */
export const MessageSchema = Type.Composite([
  BaseMessageSchema,
  Type.Object({
    id: UniqueIdSchema,
    account_id: UniqueIdSchema,
    chat_id: UniqueIdSchema,
    chat_provider_id: Type.String(),
    timestamp: Type.String(),
    is_sender: Type.Union([Type.Literal(0), Type.Literal(1)]),
    /**
     * #2103
     * @todo Fix Message schema in a way that works with OpenAPI specs ?
     *       Actual Message type is quoted: BaseMessage | undefined;
     *       undefined is not a valid OpenAPI spec value.
     *       It has been loosely translated as Type.Optional which is misleading
     *       and will fail for places / clients who test for the presence of a
     *       property.
     *       Either use quoted: BaseMessage | null or quoted?: BaseMessage.
     */
    // quoted: Type.Union([BaseMessageSchema, Type.Undefined()]),
    quoted: Type.Optional(BaseMessageSchema),
    reactions: Type.Array(MessageReactionSchema),
    seen: Type.Union([Type.Literal(0), Type.Literal(1)]),
    seen_by: Type.Record(
      Type.String(),
      Type.Union([Type.String(), Type.Boolean()])
    ),
    hidden: Type.Union([Type.Literal(0), Type.Literal(1)]),
    deleted: Type.Union([Type.Literal(0), Type.Literal(1)]),
    edited: Type.Union([Type.Literal(0), Type.Literal(1)]),
    is_event: Type.Union([Type.Literal(0), Type.Literal(1)]),
    delivered: Type.Union([Type.Literal(0), Type.Literal(1)]),
    behavior: Type.Union([MessageBehaviourSchema, Type.Null()]),
    /**
     * #2103
     * @todo Fix Message schema in a way that works with OpenAPI specs ?
     *       Actual Message type is event_type: MessageEventType | undefined;
     *       undefined is not a valid OpenAPI spec value.
     *       It has been loosely translated as Type.Optional which is misleading
     *       and will fail for places / clients who test for the presence of a
     *       property.
     *       Either use quoted: event_type: MessageEventType | null or event_type?: MessageEventType.
     */
    // event_type: Type.Union([MessageEventTypeSchema, Type.Undefined()]),
    event_type: Type.Optional(MessageEventTypeSchema),
    original: Type.String(),
    replies: Type.Optional(Type.Number()),
    reply_by: Type.Optional(Type.Array(Type.String())),
    parent: Type.Optional(UniqueIdSchema),
    sender_attendee_id: UniqueIdSchema,
  }),
]);

export type MessageEventType = Static<typeof MessageEventTypeSchema>;
export type MessageReaction = Static<typeof MessageReactionSchema>;
export type Message = Static<typeof MessageSchema>;
