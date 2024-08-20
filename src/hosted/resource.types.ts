import { Static, Type } from "@sinclair/typebox";
import { StringEnum, UniqueIdSchema } from "../common/common.types.js";
import { Strip } from "../common/core.types.tmp.js";
import { UTCDateTimeMsSchema } from "../common/date.types.js";
import { HttpUrlType } from "../common/url.types.js";
import { EmailSchema } from "../users/user.types.js";
import { AvailableAccountProvider } from "../accounts/ressource.types.js";
import { randomBytes } from "node:crypto";
import {
  MailSyncLimitValueSchema,
  MessagingSyncLimitValueSchema,
} from "../accounts/accounts-create.types.js";

/** */
export const HostedAuthTokenAllProvidersSchema = Type.Literal("*", {
  title: "Any provider",
  description: "Data type: string",
});
export const HostedAuthTokenMailingProvidersSchema = Type.Literal("*:MAILING", {
  title: "Any mailing provider",
  description: "Data type: string",
});
export const HostedAuthTokenMessagingProvidersSchema = Type.Literal(
  "*:MESSAGING",
  {
    title: "Any messaging provider",
    description: "Data type: string",
  }
);

export type HostedAuthTokenProviderWildcard =
  | Static<typeof HostedAuthTokenAllProvidersSchema>
  | Static<typeof HostedAuthTokenMailingProvidersSchema>
  | Static<typeof HostedAuthTokenMessagingProvidersSchema>;

export const HostedAuthProviderSchema = Type.Union([
  Type.Literal("LINKEDIN"),
  Type.Literal("WHATSAPP"),
  Type.Literal("MESSENGER"),
  Type.Literal("INSTAGRAM"),
  Type.Literal("MAIL"),
  Type.Literal("TELEGRAM"),
  Type.Literal("MICROSOFT"),
  Type.Literal("TWITTER"),
  Type.Literal("MAIL"),
  Type.Literal("GOOGLE"),
  Type.Literal("OUTLOOK"),
]);

/** */
export const HostedAuthTokenBaseSchema = Type.Object({
  id: UniqueIdSchema,
  prefix: Type.String(),
  hashedToken: Type.String(),
  username: EmailSchema,
  issuedAt: UTCDateTimeMsSchema,
  expiresOn: UTCDateTimeMsSchema,
  name: Type.Optional(
    Type.String({
      minLength: 1,
      description:
        "This field will be sent back to you in the notify_url to help match the added account with your user.",
    })
  ),
  success_redirect_url: Type.Optional(
    HttpUrlType({
      description:
        "A url where you might want to redirect the user in case of a successful authentication.",
    })
  ),
  failure_redirect_url: Type.Optional(
    HttpUrlType({
      description:
        "A url where you might want to redirect the user in case of a failed authentication.",
    })
  ),
  notify_url: Type.Optional(
    HttpUrlType({
      description:
        "A url where you can be notified about events related to the authentication process.",
    })
  ),
  disabled_features: Type.Optional(
    Type.Array(
      StringEnum([
        "linkedin_recruiter",
        "linkedin_sales_navigator",
        "linkedin_organizations_mailboxes",
      ]),
      {
        description:
          "An array of features that should be disabled in this account. Accepted values : linkedin_recruiter | linkedin_sales_navigator | linkedin_organizations_mailboxes.",
      }
    )
  ),
  api_url: HttpUrlType({
    description:
      "The url of your Unipile server  : https://{subdomain}.unipile.com:{port}",
  }),
  sync_limit: Type.Optional(
    Type.Object({
      MAILING: Type.Optional(MailSyncLimitValueSchema),
      MESSAGING: Type.Optional(
        Type.Object(
          {
            chats: Type.Optional(MessagingSyncLimitValueSchema),
            messages: Type.Optional(MessagingSyncLimitValueSchema),
          },
          {
            description:
              "Set a sync limit either for chats, messages or both. Chats limit will apply to each inbox, whereas messages limit will apply to each chat. No value will not apply any limit (default behaviour). Providers partial support.",
          }
        )
      ),
    })
  ),
  //   sync_limit: Type.Optional(
  //     Type.Object({
  //       chats: Type.Optional(Type.Number()),
  //       messages: Type.Optional(Type.Number()),
  //     })
  //   ),
});

/** */
export const HostedAuthTokenCreateSchema = Type.Composite([
  HostedAuthTokenBaseSchema,
  Type.Object({
    type: Type.Literal("create", {
      description:
        "A litteral value to choose between a connection or a reconnection.",
    }),
    providers: Type.Union(
      [
        HostedAuthTokenAllProvidersSchema,
        HostedAuthTokenMailingProvidersSchema,
        HostedAuthTokenMessagingProvidersSchema,
        Type.Array(AvailableAccountProvider, {
          title: "One or more providers",
          description:
            "Data type: Array of strings. Accepted values: LINKEDIN | WHATSAPP | INSTAGRAM | MESSENGER | TELEGRAM | GOOGLE | OUTLOOK | MAIL | TWITTER",
        }),
      ],
      {
        description:
          "The providers for whom you want to propose to connect an account.",
      }
    ),
  }),
]);

/** */
export const HostedAuthTokenReconnectSchema = Type.Composite([
  HostedAuthTokenBaseSchema,
  Type.Object({
    type: Type.Literal("reconnect", {
      description:
        "A litteral value to choose between a connection or a reconnection.",
    }),
    reconnect_account: Type.String({
      description: "The id of the account to reconnect.",
      minLength: 1,
    }),
    account_type: HostedAuthProviderSchema,
  }),
]);

/** */
export const HostedAuthTokenSchema = Type.Union([
  HostedAuthTokenCreateSchema,
  HostedAuthTokenReconnectSchema,
]);

/** */
export const DisplayableHostedAuthTokenSchema = Type.Omit(
  Type.Union([
    HostedAuthTokenCreateSchema,
    Type.Composite([
      HostedAuthTokenReconnectSchema,
      Type.Object({
        account_type: HostedAuthProviderSchema,
      }),
    ]),
  ]),
  ["hashedToken"]
);

/**
 * Shown once on creation, not stored, not retrievable.
 */
export const SecretHostedAuthTokenSchema = Type.Omit(
  Type.Union([
    Type.Composite([
      HostedAuthTokenCreateSchema,
      Type.Object({
        token: Type.String(),
      }),
    ]),
    Type.Composite([
      HostedAuthTokenReconnectSchema,
      Type.Object({
        token: Type.String(),
      }),
    ]),
  ]),
  ["hashedToken"]
);

/** */
export type HostedAuthProvider = Static<typeof HostedAuthProviderSchema>;

/** */
export type HostedAuthTokenBase = Static<typeof HostedAuthTokenBaseSchema>;

/** */
export type HostedAuthTokenCreate = Static<typeof HostedAuthTokenCreateSchema>;
/** */
export type HostedAuthTokenReconnect = Static<
  typeof HostedAuthTokenReconnectSchema
>;
/** */
export type HostedAuthToken = Static<typeof HostedAuthTokenSchema>;

/** */
export type DisplayableHostedAuthToken = Static<
  typeof DisplayableHostedAuthTokenSchema
>;

/** */
export type SecretHostedAuthToken = Static<typeof SecretHostedAuthTokenSchema>;

/** */
export type HostedAuthTokenDTO = Strip<
  HostedAuthToken,
  "id" | "prefix" | "hashedToken" | "issuedAt" | "account_type"
>;

/** */
export type NewHostedAuthTokenDTO = Strip<
  HostedAuthToken,
  "id" | "hashedToken"
>;

/** */
export const hostedAuthSupportedAccountTypes: Set<string> = new Set([
  "LINKEDIN",
  "WHATSAPP",
  "INSTAGRAM",
  "MESSENGER",
  "MAIL",
  "OUTLOOK",
  "GOOGLE_OAUTH",
]);

/** */
export function isSupportedHostedAuthProvider(
  accountType: string
): accountType is HostedAuthProvider {
  return hostedAuthSupportedAccountTypes.has(accountType);
}

/** */
export function createHostedAuthToken(
  content: NewHostedAuthTokenDTO
): Strip<HostedAuthToken, "hashedToken"> | "INVALID_DATES" | "EMPTY_NAME" {
  if (!(content.issuedAt <= content.expiresOn)) {
    return "INVALID_DATES";
  }

  if (content.username === "") {
    return "EMPTY_NAME";
  }

  return {
    ...content,
    /**
     * id is not used with current in-memory usage of HostedAuthToken.
     * We keep the original HostedAuthToken shape until the situation has
     * settled down.
     */
    // id: createUuidFrom(content.prefix, HOSTEDAUTHTOKEN_NAMESPACE),
    id: randomBytes(16).toString("base64"),
  };
}
