import { Static, Type } from '@sinclair/typebox';
import { AccountSourceProviderSchema } from '../accounts/ressource.types.js';
import { StringEnum, UniqueIdSchema } from '../common/common.types.js';

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
    "reaction",
    "reaction_sender",
    "sender",
    "attendees",
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
    "message_id",
    "provider_id",
    "tracking_id",
    "read_date",
    "is_complete",
    "in_reply_to",
    "has_attachments",
    "attachments",
    "folders",
    "role",
    "origin",
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
    "type",
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
  export const WebhookBaseSchema = Type.Object({
    id: UniqueIdSchema,
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
    events: Type.Optional(
      Type.Array(
        Type.Union([
          WebhookMessagingTriggerEventSchema,
          WebhookMailTriggerEventSchema,
          WebhookMailTrackingTriggerEventSchema,
        ])
      )
    ),
  });
  
  export const WebhookAutoSchema = Type.Composite([
    WebhookBaseSchema,
    Type.Object({
      type: Type.Literal("AUTO"),
    }),
  ]);
  
  export const WebhookTriggerSchema = Type.Composite([
    WebhookBaseSchema,
    Type.Object({
      type: Type.Literal("TRIGGER"),
      trigger: WebhookButtonSchema,
    }),
  ]);
  
  export const WebhookSchema = Type.Union([
    WebhookAutoSchema,
    WebhookTriggerSchema,
  ]);
  
  export type Webhook = Static<typeof WebhookSchema>;
