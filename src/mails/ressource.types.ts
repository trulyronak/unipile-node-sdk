import { Static, Type } from "@sinclair/typebox";
import { AttendeeSchema } from "../attendees/attendees.types.js";
import { UniqueIdSchema } from "../common/common.types.js";
import { UTCDateTimeMsSchema } from "../common/date.types.js";
import { FolderRoleSchema } from "./folders/folders.types.js";

export const MailRole = Type.Union([Type.Literal("inbox")]);
/**  */
export const MailSupportedAccountTypesSchema = Type.Union([
  Type.Literal("MAIL"),
  Type.Literal("GOOGLE"),
  Type.Literal("ICLOUD"),
  Type.Literal("OUTLOOK"),
  Type.Literal("EXCHANGE"),
  Type.Literal("GOOGLE_OAUTH"),
]);

export type MailSupportedAccountTypes = Static<
  typeof MailSupportedAccountTypesSchema
>;

/**  */
export const MailAttachmentSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  size: Type.Number(),
  extension: Type.String(),
  mime: Type.String(),
  cid: Type.Optional(Type.String()),
});

export type MailAttachment = Static<typeof MailAttachmentSchema>;

/**  */
export const MailReferenceSchema = Type.Object({
  id: UniqueIdSchema,
  kind: Type.Literal("0_ref"),
  account_id: UniqueIdSchema,
  type: MailSupportedAccountTypesSchema,
  date: UTCDateTimeMsSchema,
  role: FolderRoleSchema,
  folders: Type.Array(Type.String()),
  folderIds: Type.Array(Type.String()),
  read_date: Type.Optional(Type.Union([UTCDateTimeMsSchema, Type.Null()])),
  message_id: Type.String(),
  provider_id: Type.String(),
});

export type MailReference = Static<typeof MailReferenceSchema>;

/** */
export const BaseMailMetaSchema = Type.Composite([
  Type.Omit(MailReferenceSchema, ["kind"]),
  Type.Object({
    //   id: UniqueIdSchema,
    //   account_id: UniqueIdSchema,
    //   date: UTCDateTimeMsSchema,
    kind: Type.Literal("1_meta"),
    body_plain: Type.Literal(""),
    body: Type.Literal(""),
    from_attendee: AttendeeSchema,
    to_attendees: Type.Optional(Type.Array(AttendeeSchema)),
    cc_attendees: Type.Optional(Type.Array(AttendeeSchema)),
    bcc_attendees: Type.Optional(Type.Array(AttendeeSchema)),
    reply_to_attendees: Type.Optional(Type.Array(AttendeeSchema)),
    subject: Type.String(),
    has_attachments: Type.Boolean(),
    // is_complete: Type.Boolean(),
    origin: Type.Union([Type.Literal("unipile"), Type.Literal("external")]),
    in_reply_to: Type.Optional(
      Type.Object({ message_id: Type.String(), id: UniqueIdSchema })
    ),
    tracking_id: Type.Optional(Type.String()),
    thread_id: Type.Optional(Type.String()),
    attachments: Type.Array(MailAttachmentSchema),
  }),
]);

export const MailMetaSchema = Type.Composite([
  BaseMailMetaSchema,
  Type.Object({
    parent_mail: Type.Optional(BaseMailMetaSchema),
  }),
]);

export type MailMeta = Static<typeof MailMetaSchema>;

/** */
export const MailFullSchema = Type.Composite([
  Type.Omit(BaseMailMetaSchema, ["kind", "body", "body_plain"]),
  Type.Object({
    //   id: UniqueIdSchema,
    //   account_id: UniqueIdSchema,
    //   date: UTCDateTimeMsSchema,
    kind: Type.Literal("2_full"),
    body_plain: Type.String(),
    body: Type.String(),
    headers: Type.Optional(
      Type.Array(Type.Object({ name: Type.String(), value: Type.String() }))
    ),
  }),
]);

export type MailFull = Static<typeof MailFullSchema>;
export type Mail = MailReference | MailMeta | MailFull;

/** */
export const PartialMailSchema = MailReferenceSchema;

export type PartialMail = Static<typeof PartialMailSchema>;
