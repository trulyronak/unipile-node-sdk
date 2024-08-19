import { Static, Type } from "@sinclair/typebox";
import {
  ExchangeAccountWithSourceStatusSchema,
  GoogleAccountWithSourceStatusSchema,
  GoogleCalendarAccountWithSourceStatusSchema,
  ICloudAccountWithSourceStatusSchema,
  LinkedInAccountWithSourceStatusSchema,
  MailAccountWithSourceStatusSchema,
  MobileAccountWithSourceStatusSchema,
  OutlookAccountWithSourceStatusSchema,
  SlackAccountWithSourceStatusSchema,
  TelegramAccountWithSourceStatusSchema,
  TwitterAccountWithSourceStatusSchema,
  WhatsAppAccountWithSourceStatusSchema,
} from "./ressource.types.js";
import { TypeCompiler } from "@sinclair/typebox/compiler";

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

export const AccountMobileApiResponse = Type.Composite(
  [
    Type.Object({ object: Type.Literal("Account") }),
    MobileAccountWithSourceStatusSchema,
  ],
  { title: "Mobile" }
);

export const AccountMailApiResponse = Type.Composite(
  [
    Type.Object({ object: Type.Literal("Account") }),
    MailAccountWithSourceStatusSchema,
  ],
  { title: "Mail" }
);

export const AccountGoogleApiResponse = Type.Composite(
  [
    Type.Object({ object: Type.Literal("Account") }),
    GoogleAccountWithSourceStatusSchema,
  ],
  { title: "Google" }
);

export const AccountICloudApiResponse = Type.Composite(
  [
    Type.Object({ object: Type.Literal("Account") }),
    ICloudAccountWithSourceStatusSchema,
  ],
  { title: "ICloud" }
);

export const AccountOutlookApiResponse = Type.Composite(
  [
    Type.Object({ object: Type.Literal("Account") }),
    OutlookAccountWithSourceStatusSchema,
  ],
  { title: "Outlook" }
);

export const AccountGoogleCalendarApiResponse = Type.Composite(
  [
    Type.Object({ object: Type.Literal("Account") }),
    GoogleCalendarAccountWithSourceStatusSchema,
  ],
  { title: "Google Calendar" }
);

export const AccountWhatsappApiResponse = Type.Composite(
  [
    Type.Object({ object: Type.Literal("Account") }),
    WhatsAppAccountWithSourceStatusSchema,
  ],
  { title: "Whatsapp" }
);

export const AccountLinkedinApiResponse = Type.Composite(
  [
    Type.Object({ object: Type.Literal("Account") }),
    LinkedInAccountWithSourceStatusSchema,
  ],
  { title: "Linkedin" }
);

export const AccountSlackApiResponse = Type.Composite(
  [
    Type.Object({ object: Type.Literal("Account") }),
    SlackAccountWithSourceStatusSchema,
  ],
  { title: "Slack" }
);

export const AccountTwitterApiResponse = Type.Composite(
  [
    Type.Object({ object: Type.Literal("Account") }),
    TwitterAccountWithSourceStatusSchema,
  ],
  { title: "Twitter" }
);

export const AccountExchangeApiResponse = Type.Composite(
  [
    Type.Object({ object: Type.Literal("Account") }),
    ExchangeAccountWithSourceStatusSchema,
  ],
  { title: "Exchange" }
);

export const AccountTelegramApiResponse = Type.Composite(
  [
    Type.Object({ object: Type.Literal("Account") }),
    TelegramAccountWithSourceStatusSchema,
  ],
  { title: "Telegram" }
);

/** */
export const AccounApiResponseSchema = Type.Union([
  AccountMobileApiResponse,
  AccountMailApiResponse,
  AccountGoogleApiResponse,
  AccountICloudApiResponse,
  AccountOutlookApiResponse,
  AccountGoogleCalendarApiResponse,
  AccountWhatsappApiResponse,
  AccountLinkedinApiResponse,
  AccountSlackApiResponse,
  AccountTwitterApiResponse,
  AccountExchangeApiResponse,
  AccountTelegramApiResponse
]);

export type AccountApiResponse = Static<typeof AccounApiResponseSchema>;


/**  */
export const AccountApiResponseValidator = TypeCompiler.Compile(AccounApiResponseSchema);