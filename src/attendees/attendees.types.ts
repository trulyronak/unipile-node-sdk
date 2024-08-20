import { Static, Type } from '@sinclair/typebox';
import { StringEnum } from '../common/common.types.js';

/**
 *
 */
export const IdentifierTypeSchema = StringEnum([
  'CHAT_ATTENDEE_ID',
  'PHONE_NUMBER',
  'EMAIL_ADDRESS',
  'MESSENGER_ID',
  'MESSENGER_THREAD_ID',
  'TIKTOK_ID',
  'TIKTOK_THREAD_ID',
  'TWITTER_ID',
  'TWITTER_THREAD_ID',
  'INSTAGRAM_ID',
  'INSTAGRAM_THREAD_ID',
  'LINKEDIN_ID',
  'LINKEDIN_THREAD_ID',
  'GROUP_THREAD',
]);
export type IdentifierType = Static<typeof IdentifierTypeSchema>;

/**
 * @todo Review this partially generated type.
 */
export const AttendeeSchema = Type.Object({
  display_name: Type.Optional(Type.String()),
  profile_picture: Type.Optional(Type.String()),
  identifier: Type.String(),
  identifier_type: IdentifierTypeSchema,
});
export type Attendee = Static<typeof AttendeeSchema>;

/**
 *
 */
export const MailDraftRecipientSchema = Type.Object({
  display_name: Type.Optional(Type.String({ description: 'The name of the attendee.' })),
  identifier: Type.String({ description: 'The email address of the attendee.' }),
});
export type MailDraftRecipient = Static<typeof MailDraftRecipientSchema>;

/**
 *
 */
export const MailDraftSenderSchema = Type.Object({
  display_name: Type.Optional(Type.String({ description: 'The name of the attendee.' })),
  identifier: Type.Optional(Type.String({ description: 'The email address of the attendee.' })),
});
export type MailDraftSender = Static<typeof MailDraftSenderSchema>;
