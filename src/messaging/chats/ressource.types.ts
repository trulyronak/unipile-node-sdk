import { Static, Type } from "@sinclair/typebox";
import { UniqueIdSchema } from "../../common/common.types.js";
import { MessagingAccountTypeSchema } from "../messaging.types.js";

export const ChatTypeSchema = Type.Enum({ SINGLE: 0, GROUP: 1, CHANNEL: 2 });
export const ChatFeaturesSchema = Type.Union([
  Type.Literal("reactions"),
  Type.Literal("reply"),
]);
export const ChatFolderSchema = Type.Union([
  Type.Literal("INBOX"),
  Type.Literal("INBOX_LINKEDIN_CLASSIC"),
  Type.Literal("INBOX_LINKEDIN_RECRUITER"),
  Type.Literal("INBOX_LINKEDIN_SALES_NAVIGATOR"),
  Type.Literal("INBOX_LINKEDIN_ORGANIZATION"),
]);

export type ChatFolder = Static<typeof ChatFolderSchema>;
/**
 * @todo Review that ChatSchema matches Chat definition from libs/core/src/Messaging/domain/Chat.ts
 *       It doesn't seem to handle the discriminated union around account_type
 *       in the same way.
 */
export const ChatSchema = Type.Object({
  id: UniqueIdSchema,
  account_id: UniqueIdSchema,
  account_type: MessagingAccountTypeSchema,
  provider_id: Type.String(),
  attendee_provider_id: Type.Optional(Type.String()),
  name: Type.Union([Type.String(), Type.Null()]),
  type: ChatTypeSchema,
  timestamp: Type.Union([Type.String(), Type.Null()]),
  unread_count: Type.Number(),
  archived: Type.Union([Type.Literal(0), Type.Literal(1)]),
  muted_until: Type.Union([Type.Literal(-1), Type.String(), Type.Null()]),
  read_only: Type.Union([Type.Literal(0), Type.Literal(1), Type.Literal(2)]),
  disabledFeatures: Type.Optional(Type.Array(ChatFeaturesSchema)),
  subject: Type.Optional(Type.String()),
  organization_id: Type.Optional(
    Type.String({
      description: "Linkedin specific ID for organization mailboxes.",
    })
  ),
  mailbox_id: Type.Optional(
    Type.String({
      description: "Linkedin specific ID for organization mailboxes.",
    })
  ),
  content_type: Type.Optional(
    Type.Union([
      Type.Literal("inmail"),
      Type.Literal("sponsored"),
      Type.Literal("linkedin_offer"),
    ])
  ),
//   lastMessage: Type.Union([MessageSchema, Type.Null()]), // This doesn't appear on Chat, only on ChatandMessage.
  folder: Type.Optional(Type.Array(ChatFolderSchema)),
});

export type Chat = Static<typeof ChatSchema>;
