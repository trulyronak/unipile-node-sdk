import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import {
  WebhookBodyFormatSchema,
  WebhookDataItemSchema,
  WebhookEmailDataItemSchema,
  WebhookEmailTrackingDataItemSchema,
  WebhookHeaderItemSchema,
  WebhookMailTrackingTriggerEventSchema,
  WebhookMailTriggerEventSchema,
  WebhookMessagingTriggerEventSchema,
} from "./ressource.types.js";
import { RequiredProps } from "../common/core.types.tmp.js";

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------

/**
 *
 */
export const WebhookCreateBaseBodySchema = Type.Object({
  request_url: Type.String({
    description: "The url to associate with the webhook.",
  }),
  name: Type.Optional(
    Type.String({
      description:
        "This field will be sent back to you in the notify_url to help match the added account with your user.",
    })
  ),
  format: Type.Optional(WebhookBodyFormatSchema),
  account_ids: Type.Optional(
    Type.Array(Type.String(), {
      description:
        "An optional list of account ids to be targeted by the webhook. If not set, the webhook will apply to all current and future accounts connected to Unipile.",
    })
  ),
  enabled: Type.Optional(
    Type.Boolean({
      description: "A boolean to activate or disable the webhook.",
    })
  ),
  headers: Type.Optional(
    Type.Array(WebhookHeaderItemSchema, {
      description: "An optional field to add some headers to the webhook.",
    })
  ),
});

/**
 *
 */
export const WebhookCreateMessagingBodySchema = Type.Composite(
  [
    WebhookCreateBaseBodySchema,
    Type.Object({
      source: Type.Literal("messaging", {
        description:
          "A litteral to pick the kind of data you expect to receive from the webhook.",
      }),
      events: Type.Optional(
        Type.Array(WebhookMessagingTriggerEventSchema, {
          description:
            'An array of events on which the webhook should be triggered. Default value include "message_received".',
        })
      ),
      // events: Type.Optional(
      //   Type.Array(
      //     Type.Union([
      //       Type.Literal("message_received"),
      //       Type.Literal("message_read"),
      //       Type.Literal("message_reaction"),
      //     ]),
      //     {
      //       description:
      //         'An array of events on which the webhook should be triggered. Default value include "message_received".',
      //     }
      //   )
      // ),
      data: Type.Optional(Type.Array(WebhookDataItemSchema)),
    }),
  ],
  { title: "Messaging webhook" }
);

/**
 *
 */
export const WebhookCreateEmailBodySchema = Type.Composite(
  [
    WebhookCreateBaseBodySchema,
    Type.Object({
      source: Type.Literal("email", {
        description:
          "A litteral to pick the kind of data you expect to receive from the webhook.",
      }),
      events: Type.Optional(
        Type.Array(WebhookMailTriggerEventSchema, {
          description:
            'An array of events on which the webhook should be triggered. Default value include "mail_received".',
        })
      ),
      data: Type.Optional(Type.Array(WebhookEmailDataItemSchema)),
    }),
  ],
  { title: "Email webhook" }
);

/**
 *
 */
export const WebhookCreateEmailTrackingBodySchema = Type.Composite(
  [
    WebhookCreateBaseBodySchema,
    Type.Object({
      source: Type.Literal("email_tracking", {
        description:
          "A litteral to pick the kind of data you expect to receive from the webhook.",
      }),
      events: Type.Optional(
        Type.Array(WebhookMailTrackingTriggerEventSchema, {
          description:
            'An array of events on which the webhook should be triggered. Default value include "mail_opened".',
        })
      ),
      data: Type.Optional(Type.Array(WebhookEmailTrackingDataItemSchema)),
    }),
  ],
  { title: "Email Tracking webhook" }
);

/**
 *
 */
export const WebhookCreateAccountsStatusBodySchema = Type.Composite(
  [
    WebhookCreateBaseBodySchema,
    Type.Object({
      source: Type.Literal("account_status", {
        description:
          "A litteral to pick the kind of data you expect to receive from the webhook.",
      }),
    }),
  ],
  { title: "Account status webhook" }
);

/**
 *
 */
export const WebhookCreateBodySchema = Type.Union([
  WebhookCreateMessagingBodySchema,
  WebhookCreateAccountsStatusBodySchema,
  WebhookCreateEmailBodySchema,
  WebhookCreateEmailTrackingBodySchema,
]);

export type WebhookCreateMessagingBody = Static<
  typeof WebhookCreateMessagingBodySchema
>;

export type WebhookCreateMessagingBodyDTO = RequiredProps<
  WebhookCreateMessagingBody,
  "events"
>;

export type WebhookCreateAccountsStatusBody = Static<
  typeof WebhookCreateAccountsStatusBodySchema
>;

export type WebhookCreateMailBody = Static<typeof WebhookCreateEmailBodySchema>;

export type WebhookCreateMailBodyDTO = RequiredProps<
  WebhookCreateMailBody,
  "events"
>;

export type WebhookCreateEmailTrackingBody = Static<typeof WebhookCreateEmailTrackingBodySchema>;

export type WebhookCreateEmailTrackingBodyDTO = RequiredProps<
  WebhookCreateEmailTrackingBody,
  "events"
>;

export type WebhookCreateBody = Static<typeof WebhookCreateBodySchema>;

export type WebhookCreateBodyDTO =
  | WebhookCreateMessagingBodyDTO
  | WebhookCreateAccountsStatusBody
  | WebhookCreateMailBodyDTO
  | WebhookCreateEmailTrackingBodyDTO;

/**
 *
 */
export const WebhookCreateBodyValidator = TypeCompiler.Compile(
  WebhookCreateBodySchema
);

// /**
//  *
//  */
// export const getWebhookCreateBodyOpenApiSchema = makeOpenApiSchemaGetter(
//   WebhookCreateBodySchema
// );

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 *
 */
export const WebhookCreateResponseSchema = Type.Object({
  object: Type.Literal("WebhookCreated"),
  webhook_id: Type.String(),
});

export type WebhookCreateResponse = Static<typeof WebhookCreateResponseSchema>;

// /**
//  *
//  */
// export const getWebhookCreateResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   WebhookCreateResponseSchema
// );


/**  */
export const WebhookCreateResponseValidator = TypeCompiler.Compile(WebhookCreateResponseSchema);