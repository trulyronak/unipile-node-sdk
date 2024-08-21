import { Static, Type } from "@sinclair/typebox";
import {
  GmailUserProfileSchema,
  ImapUserProfileSchema,
  LinkedinAccountOwnerProfileSchema,
  OutlookUserProfileSchema,
  TelegramUserProfileSchema,
  TwitterUserProfileSchema,
} from "./ressource.types.js";
import { TypeCompiler } from "@sinclair/typebox/compiler";

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

export const LinkedinAccountOwnerProfileApiResponseSchema = Type.Composite(
  [
    LinkedinAccountOwnerProfileSchema,
    Type.Object({
      object: Type.Literal("AccountOwnerProfile"),
    }),
  ],
  { title: "LinkedIn" }
);

export const TelegramAccountOwnerProfileApiResponseSchema = Type.Composite(
  [
    TelegramUserProfileSchema,
    Type.Object({
      object: Type.Literal("AccountOwnerProfile"),
    }),
  ],
  { title: "Telegram" }
);

export const TwitterAccountOwnerProfileApiResponseSchema = Type.Composite(
  [
    TwitterUserProfileSchema,
    Type.Object({
      object: Type.Literal("AccountOwnerProfile"),
    }),
  ],
  { title: "Twitter" }
);

export const GmailAccountOwnerProfileApiResponseSchema = Type.Composite(
  [
    GmailUserProfileSchema,
    Type.Object({
      object: Type.Literal("AccountOwnerProfile"),
    }),
  ],
  { title: "Gmail" }
);

export const OutlookAccountOwnerProfileApiResponseSchema = Type.Composite(
  [
    OutlookUserProfileSchema,
    Type.Object({
      object: Type.Literal("AccountOwnerProfile"),
    }),
  ],
  { title: "Outlook" }
);

export const ImapAccountOwnerProfileApiResponseSchema = Type.Composite(
  [
    ImapUserProfileSchema,
    Type.Object({
      object: Type.Literal("AccountOwnerProfile"),
    }),
  ],
  { title: "Imap" }
);


/**
 *
 */
export const AccountOwnerProfileApiResponseSchema = Type.Union([
  LinkedinAccountOwnerProfileApiResponseSchema,
  TelegramAccountOwnerProfileApiResponseSchema,
  TwitterAccountOwnerProfileApiResponseSchema,
  GmailAccountOwnerProfileApiResponseSchema,
  OutlookAccountOwnerProfileApiResponseSchema,
  ImapAccountOwnerProfileApiResponseSchema,
]);

export type AccountOwnerProfileApiResponse = Static<
  typeof AccountOwnerProfileApiResponseSchema
>;

/**  */
export const AccountOwnerProfileApiResponseValidator = TypeCompiler.Compile(AccountOwnerProfileApiResponseSchema);