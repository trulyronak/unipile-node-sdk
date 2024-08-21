import { Static, Type } from "@sinclair/typebox";
import { AccountSourceProviderSchema } from "../accounts/ressource.types.js";
import { StringEnum, UniqueIdSchema } from "../common/common.types.js";

export const WebhookAccountOptionSchema = Type.Object({
  id: UniqueIdSchema,
  name: Type.Optional(Type.String()),
  type: AccountSourceProviderSchema,
});

export const WebhookIconKeySchema = Type.Union([
  Type.Literal("WebhookIcon"),
  Type.Literal("SettingsInputIcon"),
  Type.Literal("LeakAddIcon"),
  Type.Literal("Diversity2Icon"),
  Type.Literal("AutoFixHighIcon"),
  Type.Literal("SignPostIcon"),
  Type.Literal("ShutterSpeedIcon"),
  Type.Literal("SyncAltIcon"),
  Type.Literal("WhatsAppIcon"),
  Type.Literal("LinkedInIcon"),
  Type.Literal("ImportExportIcon"),
  Type.Literal("PodcastsIcon"),
  Type.Literal("CableIcon"),
]);

export const WebhookButtonSchema = Type.Object({
  icon: WebhookIconKeySchema,
  name: Type.String(),
  context: Type.Union([Type.Literal("MESSAGE"), Type.Literal("CHAT")]),
});

export const WebhookDataKeySchema = StringEnum([
  "account_id",
  "account_type",
  "chat_id",
  "timestamp",
  "webhook_name",
  "message_id",
  "message",
  "attendees",
  "sender",
  "attachments",
]);

export const WebhookDataItemSchema = Type.Object(
  {
    name: Type.String({
      description:
        "The name of the property you want to receive. It will replace the original name of the property.",
    }),
    key: WebhookDataKeySchema,
  },
  {
    description:
      "You can use this field to change the name of the properties you will receive from the webhook.",
  }
);

export const WebhookEmailDataKeySchema = StringEnum([
  "email_id",
  "account_id",
  "webhook_name",
  "date",
  "from_attendee",
  "to_attendees",
  "cc_attendees",
  "bcc_attendees",
  "reply_to_attendees",
  "subject",
  "body",
  "body_plain",
  "provider_id",
  "read_date",
  "is_complete",
  "has_attachments",
  "attachments",
  "folders",
  "role",
]);

export const WebhookEmailDataItemSchema = Type.Object(
  {
    name: Type.String({
      description:
        "The name of the property you want to receive. It will replace the original name of the property.",
    }),
    key: WebhookEmailDataKeySchema,
  },
  {
    description:
      "You can use this field to change the name of the properties you will receive from the webhook.",
  }
);

export const WebhookEmailTrackingDataKeySchema = StringEnum([
  "event_id",
  "tracking_id",
  "date",
  "email_id",
  "account_id",
  "ip",
  "user_agent",
  "url",
  "label",
  "custom_domain",
]);

export const WebhookEmailTrackingDataItemSchema = Type.Object(
  {
    name: Type.String({
      description:
        "The name of the property you want to receive. It will replace the original name of the property.",
    }),
    key: WebhookEmailTrackingDataKeySchema,
  },
  {
    description:
      "You can use this field to change the name of the properties you will receive from the webhook.",
  }
);

export const WebhookHeaderItemSchema = Type.Object({
  key: Type.String(),
  value: Type.String(),
});

export const WebhookBodyFormatSchema = StringEnum(["json", "form"], {
  description:
    "The format of data you recieve from the webhook. Accepted values: json | form",
  example: "json",
});

export const WebhookMessagingTriggerEventSchema = StringEnum([
  "message_received",
  "message_read",
  "message_reaction",
]);

export const WebhookMailTriggerEventSchema = StringEnum([
  "mail_sent",
  "mail_received",
]);

export const WebhookMailTrackingTriggerEventSchema = StringEnum([
  "mail_opened",
  "mail_link_clicked",
]);

/**
 * Webhook Model
 */
export const WebhookSchema = Type.Object({
  id: UniqueIdSchema,
  type: Type.Union([Type.Literal("AUTO"), Type.Literal("TRIGGER")]),
  account_ids: Type.Array(WebhookAccountOptionSchema),
  enabled: Type.Boolean(),
  name: Type.Optional(Type.String()),
  request_url: Type.String(),
  format: WebhookBodyFormatSchema,
  headers: Type.Array(WebhookHeaderItemSchema),
  data: Type.Union([
    Type.Array(WebhookDataItemSchema),
    Type.Array(WebhookEmailDataItemSchema),
    Type.Array(WebhookEmailTrackingDataItemSchema),
  ]),
  trigger: Type.Union([WebhookButtonSchema, Type.Never()]),
  events: Type.Optional(
    Type.Union([
      WebhookMessagingTriggerEventSchema,
      WebhookMailTriggerEventSchema,
    ])
  ),
});

export type Webhook = Static<typeof WebhookSchema>;
