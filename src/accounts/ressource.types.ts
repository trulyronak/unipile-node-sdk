import { Static, Type } from '@sinclair/typebox';
import { StringEnum, UniqueIdSchema } from '../common/common.types.js';
import { UTCDateTimeMsSchema } from '../common/date.types.js';
import { FolderSyncErrorSchema, FolderSyncingSchema } from '../mails/folders/folders.types.js';
import { i18n } from '../common/i18n.fake.js';
// --------------------------------------------------------------
//  CONNECTION PARAMS
// --------------------------------------------------------------

export const ProxyParamsSchema = Type.Object({
  host: Type.String(),
  port: Type.Number(),
  username: Type.String(),
  password: Type.String(),
});

export const EncryptionFormatSchema = Type.Union([
  Type.Literal('tls'),
  Type.Literal('ssl'),
  Type.Literal('starttls'),
  Type.Literal('default'),
]);

export const ConnectionParamsSchema = {
  Sms: Type.Object({
    phone_number: Type.String(),
    sim_serial_number: Type.String(),
  }),
  MobileCalls: Type.Object({
    phone_number: Type.String(),
    sim_serial_number: Type.String(),
  }),
  Imap: Type.Object({
    imap_host: Type.String(),
    imap_port: Type.Number(),
    imap_user: Type.String(),
    imap_encryption: Type.Optional(EncryptionFormatSchema),
    smtp_host: Type.String(),
    smtp_port: Type.Number(),
    smtp_user: Type.String(),
  }),
  FormLogin: Type.Object({
    username: Type.String(),
    proxy: Type.Optional(ProxyParamsSchema),
  }),
  Microsoft: Type.Object({
    id: Type.String(),
    username: Type.String(),
  }),
  Google: Type.Object({
    id: Type.String(),
    username: Type.String(),
  }),
  WhatsApp: Type.Object({
    phone_number: Type.String(),
  }),
  LinkedIn: Type.Object({
    id: Type.String(),
    username: Type.String(),
    premiumContractId: Type.Union([Type.String(), Type.Null()]),
    premiumFeatures: Type.Optional(
      Type.Array(Type.Union([Type.Literal('recruiter'), Type.Literal('sales_navigator'), Type.Literal('premium')])),
    ),
  }),
  Slack: Type.Object({
    url: Type.String(),
    user: Type.String(),
    user_id: Type.String(),
    team: Type.String(),
    team_id: Type.String(),
  }),
  Twitter: Type.Object({
    id: Type.String(),
    username: Type.String(),
  }),
  Telegram: Type.Object({
    user_id: Type.String(),
    username: Type.String(),
  }),
  Instagram: Type.Object({
    id: Type.String(),
    username: Type.String(),
  }),
  Messenger: Type.Object({
    id: Type.String(),
    username: Type.String(),
  }),
};

// --------------------------------------------------------------
//  MISC
// --------------------------------------------------------------

/**
 * @note Doc i18n POC.
 */
export const AccountSourceServiceStatusSchema = Type.Union(
  [
    Type.Literal('OK', {
      title: 'OK',
      description: i18n.t('api.AccountSourceServiceStatus.OK'),
    }),
    Type.Literal('STOPPED', {
      title: 'STOPPED',
      description: i18n.t('api.AccountSourceServiceStatus.STOPPED'),
    }),
    Type.Literal('ERROR', {
      title: 'ERROR',
      description: i18n.t('api.AccountSourceServiceStatus.ERROR'),
    }),
    Type.Literal('CREDENTIALS', {
      title: 'CREDENTIALS',
      description: i18n.t('api.AccountSourceServiceStatus.CREDENTIALS'),
    }),
    Type.Literal('PERMISSIONS', {
      title: 'PERMISSIONS',
      description: i18n.t('api.AccountSourceServiceStatus.PERMISSIONS'),
    }),
    Type.Literal('CONNECTING', {
      title: 'CONNECTING',
      description: i18n.t('api.AccountSourceServiceStatus.CONNECTING'),
    }),
  ],
  { title: 'AccountSourceServiceStatus' },
);

/**
 *
 */
export const AccountSourceStatusSchema = Type.Union(
  [
    Type.Literal('IDLE', {
      title: 'IDLE',
      description: i18n.t('api.AccountSourceStatus.IDLE'),
    }),
    Type.Literal('NOT_SETUP', {
      title: 'NOT_SETUP',
      description: i18n.t('api.AccountSourceStatus.NOT_SETUP'),
    }),
    Type.Literal('PAUSED', {
      title: 'PAUSED',
      description: i18n.t('api.AccountSourceStatus.PAUSED'),
    }),
  ],
  { title: 'AccountSourceStatus' },
);

export const AccountSignatureSchema = Type.Object({
  title: Type.String(),
  content: Type.String(),
});

export const AvailableAccountProvider = StringEnum([
  'LINKEDIN',
  'WHATSAPP',
  'INSTAGRAM',
  'MESSENGER',
  'IMAP',
  'TELEGRAM',
  'GOOGLE',
  'OUTLOOK',
  'TWITTER',
  'MAIL',
]);

/**
 *
 */
export const AccountSourceProviderSchema = Type.Union([
  Type.Literal('GOOGLE'),
  Type.Literal('GOOGLE_CALENDAR'),
  Type.Literal('ICLOUD'),
  Type.Literal('LINKEDIN'),
  Type.Literal('MAIL'),
  Type.Literal('MOBILE'),
  Type.Literal('OUTLOOK'),
  Type.Literal('TWITTER'),
  Type.Literal('WHATSAPP'),
  Type.Literal('SLACK'),
  Type.Literal('TELEGRAM'),
]);

export const AccountSupportedProviderSchema = Type.Union([
  Type.Literal('LINKEDIN'),
  Type.Literal('WHATSAPP'),
  Type.Literal('INSTAGRAM'),
  Type.Literal('MESSENGER'),
  Type.Literal('MAIL'),
  Type.Literal('GOOGLE'),
  Type.Literal('TELEGRAM'),
  Type.Literal('OUTLOOK'),
  Type.Literal('TWITTER'),
  Type.Literal('MAIL'),
  Type.Literal('GOOGLE'),
  Type.Literal('OUTLOOK'),
]);

export const MailFullFetchStarted = Type.Object({
  status: Type.Union([Type.Literal('DONE'), Type.Literal('FETCHING')]),
  /**
   * @note We want a a [number, number] tuple, but we're targeting OAS 3.0
   *       which doesn't support the tuple notation yielded by Type.Tuple.
   */
  // progress: Type.Tuple([Type.Number(), Type.Number()]),
  progress: Type.Array(Type.Number(), {
    minItems: 2,
    maxItems: 2,
  }),
});

export const MailFullFetchPending = Type.Object({
  status: Type.Literal('IDLE'),
});

// --------------------------------------------------------------
//  VIEW ACCOUNT BASE
// --------------------------------------------------------------

export const ViewAccountBaseSchema = Type.Object({
  id: UniqueIdSchema,
  name: Type.String(),
  created_at: UTCDateTimeMsSchema,
  current_signature: Type.Optional(UniqueIdSchema),
  signatures: Type.Optional(Type.Array(AccountSignatureSchema)),
  groups: Type.Array(UniqueIdSchema),
});

const SourceStatusSchema = Type.Object({
  sources: Type.Array(
    Type.Object({
      id: Type.String(),
      status: AccountSourceServiceStatusSchema,
    }),
  ),
});

// --------------------------------------------------------------
//  ACCOUNTS DEFINITIONS
// --------------------------------------------------------------

/**
 *
 */
export const MobileAccountSchema = Type.Composite([
  Type.Object({
    type: Type.Literal('MOBILE'),
    connection_params: Type.Object({
      im: ConnectionParamsSchema.Sms,
      call: ConnectionParamsSchema.MobileCalls,
    }),
    last_fetched_at: Type.Optional(UTCDateTimeMsSchema),
    sources: Type.Object({
      CALLS: Type.Object({
        status: AccountSourceStatusSchema,
      }),
    }),
  }),
  ViewAccountBaseSchema,
]);

export const MobileAccountWithSourceStatusSchema = Type.Composite([
  Type.Omit(MobileAccountSchema, ['sources']),
  SourceStatusSchema,
]);

/**
 *
 */
export const MailAccountSchema = Type.Composite([
  Type.Object({
    type: Type.Literal('MAIL'),
    connection_params: Type.Object({
      mail: ConnectionParamsSchema.Imap,
    }),
    sources: Type.Object({
      MAILS: Type.Object({
        status: AccountSourceStatusSchema,
      }),
    }),
  }),
  ViewAccountBaseSchema,
]);

export const MailAccountWithSourceStatusSchema = Type.Composite([Type.Omit(MailAccountSchema, ['sources']), SourceStatusSchema]);

/**
 *
 */
export const GoogleAccountSchema = Type.Composite([
  Type.Object({
    type: Type.Literal('GOOGLE_OAUTH'),
    connection_params: Type.Object({
      mail: ConnectionParamsSchema.Google,
    }),
    sources: Type.Object({
      MAILS: Type.Object({
        status: AccountSourceStatusSchema,
      }),
    }),
  }),
  ViewAccountBaseSchema,
]);

export const GoogleAccountWithSourceStatusSchema = Type.Composite([
  Type.Omit(GoogleAccountSchema, ['sources']),
  SourceStatusSchema,
]);

/**
 *
 */
export const ICloudAccountSchema = Type.Composite([
  Type.Object({
    type: Type.Literal('ICLOUD'),
    connection_params: Type.Object({
      mail: ConnectionParamsSchema.Imap,
    }),
    sources: Type.Object({
      MAILS: Type.Object({
        status: AccountSourceStatusSchema,
      }),
    }),
  }),
  ViewAccountBaseSchema,
]);

export const ICloudAccountWithSourceStatusSchema = Type.Composite([
  Type.Omit(ICloudAccountSchema, ['sources']),
  SourceStatusSchema,
]);

/**
 *
 */
export const OutlookAccountSchema = Type.Composite([
  Type.Object({
    type: Type.Literal('OUTLOOK'),
    connection_params: Type.Object({
      mail: ConnectionParamsSchema.Microsoft,
    }),
    sources: Type.Object({
      MAILS: Type.Object({
        status: AccountSourceStatusSchema,
      }),
    }),
  }),
  ViewAccountBaseSchema,
]);

export const OutlookAccountWithSourceStatusSchema = Type.Composite([
  Type.Omit(OutlookAccountSchema, ['sources']),
  SourceStatusSchema,
]);

/**
 *
 */
export const GoogleCalendarAccountSchema = Type.Composite([
  Type.Object({
    type: Type.Literal('GOOGLE_CALENDAR'),
    connection_params: Type.Object({
      calendar: Type.String(),
    }),
    sync_token: Type.Optional(Type.String()),
    sources: Type.Object({
      CALENDAR: Type.Object({
        status: AccountSourceStatusSchema,
        sync_token: Type.Optional(Type.String()),
      }),
    }),
  }),
  ViewAccountBaseSchema,
]);

export const GoogleCalendarAccountWithSourceStatusSchema = Type.Composite([
  Type.Omit(GoogleCalendarAccountSchema, ['sources']),
  SourceStatusSchema,
]);

/**
 *
 */
export const WhatsAppAccountSchema = Type.Composite([
  Type.Object({
    type: Type.Literal('WHATSAPP'),
    connection_params: Type.Object({
      im: ConnectionParamsSchema.WhatsApp,
    }),
    sources: Type.Object({
      MESSAGING: Type.Object({
        status: AccountSourceStatusSchema,
      }),
    }),
  }),
  ViewAccountBaseSchema,
]);

export const WhatsAppAccountWithSourceStatusSchema = Type.Composite([
  Type.Omit(WhatsAppAccountSchema, ['sources']),
  SourceStatusSchema,
]);

/**
 *
 */
export const LinkedInAccountSchema = Type.Composite([
  Type.Object({
    type: Type.Literal('LINKEDIN'),
    connection_params: Type.Object({
      im: ConnectionParamsSchema.LinkedIn,
    }),
    sources: Type.Object({
      MESSAGING: Type.Object({
        status: AccountSourceStatusSchema,
      }),
    }),
  }),
  ViewAccountBaseSchema,
]);

export const LinkedInAccountWithSourceStatusSchema = Type.Composite([
  Type.Omit(LinkedInAccountSchema, ['sources']),
  SourceStatusSchema,
]);

/**
 *
 */
export const SlackAccountSchema = Type.Composite([
  Type.Object({
    type: Type.Literal('SLACK'),
    connection_params: Type.Object({
      im: ConnectionParamsSchema.Slack,
    }),
    sources: Type.Object({
      MESSAGING: Type.Object({
        status: AccountSourceStatusSchema,
      }),
    }),
  }),
  ViewAccountBaseSchema,
]);

export const SlackAccountWithSourceStatusSchema = Type.Composite([
  Type.Omit(SlackAccountSchema, ['sources']),
  SourceStatusSchema,
]);

/**
 *
 */
export const TwitterAccountSchema = Type.Composite([
  Type.Object({
    type: Type.Literal('TWITTER'),
    connection_params: Type.Object({
      im: ConnectionParamsSchema.Twitter,
    }),
    sources: Type.Object({
      MESSAGING: Type.Object({
        status: AccountSourceStatusSchema,
      }),
    }),
  }),
  ViewAccountBaseSchema,
]);

export const TwitterAccountWithSourceStatusSchema = Type.Composite([
  Type.Omit(TwitterAccountSchema, ['sources']),
  SourceStatusSchema,
]);

/**
 *
 */
export const ExchangeAccountSchema = Type.Composite([
  Type.Object({
    type: Type.Literal('EXCHANGE'),
    connection_params: Type.Object({
      mail: ConnectionParamsSchema.Imap,
    }),
    sources: Type.Object({
      MAILS: Type.Object({
        status: AccountSourceStatusSchema,
      }),
    }),
  }),
  ViewAccountBaseSchema,
]);

export const ExchangeAccountWithSourceStatusSchema = Type.Composite([
  Type.Omit(ExchangeAccountSchema, ['sources']),
  SourceStatusSchema,
]);

export const TelegramAccountSchema = Type.Composite([
  Type.Object({
    type: Type.Literal('TELEGRAM'),
    connection_params: Type.Object({
      im: ConnectionParamsSchema.Telegram,
    }),
    sources: Type.Object({
      MESSAGING: Type.Object({
        status: AccountSourceStatusSchema,
      }),
    }),
  }),
  ViewAccountBaseSchema,
]);

export const TelegramAccountWithSourceStatusSchema = Type.Composite([
  Type.Omit(TelegramAccountSchema, ['sources']),
  SourceStatusSchema,
]);

export const InstagramAccountSchema = Type.Composite([
  Type.Object({
    type: Type.Literal('INSTAGRAM'),
    connection_params: Type.Object({
      im: ConnectionParamsSchema.Instagram,
    }),
    sources: Type.Object({
      MESSAGING: Type.Object({
        status: AccountSourceStatusSchema,
      }),
    }),
  }),
  ViewAccountBaseSchema,
]);

export const InstagramAccountWithSourceStatusSchema = Type.Composite([
  Type.Omit(InstagramAccountSchema, ['sources']),
  SourceStatusSchema,
]);

export const MessengerAccountSchema = Type.Composite([
  Type.Object({
    type: Type.Literal('MESSENGER'),
    connection_params: Type.Object({
      im: ConnectionParamsSchema.Messenger,
    }),
    sources: Type.Object({
      MESSAGING: Type.Object({
        status: AccountSourceStatusSchema,
      }),
    }),
  }),
  ViewAccountBaseSchema,
]);

export const MessengerAccountWithSourceStatusSchema = Type.Composite([
  Type.Omit(MessengerAccountSchema, ['sources']),
  SourceStatusSchema,
]);

/**
 *
 */
export const ViewAccountSchema = Type.Union([
  MobileAccountSchema,
  MailAccountSchema,
  GoogleAccountSchema,
  ICloudAccountSchema,
  OutlookAccountSchema,
  GoogleCalendarAccountSchema,
  WhatsAppAccountSchema,
  LinkedInAccountSchema,
  SlackAccountSchema,
  TwitterAccountSchema,
  ExchangeAccountSchema,
  TelegramAccountSchema,
  InstagramAccountSchema,
  MessengerAccountSchema,
]);

export const ViewAccountWithSourceStatusSchema = Type.Union([
  ExchangeAccountWithSourceStatusSchema,
  TwitterAccountWithSourceStatusSchema,
  SlackAccountWithSourceStatusSchema,
  LinkedInAccountWithSourceStatusSchema,
  WhatsAppAccountWithSourceStatusSchema,
  GoogleCalendarAccountWithSourceStatusSchema,
  OutlookAccountWithSourceStatusSchema,
  ICloudAccountWithSourceStatusSchema,
  GoogleAccountWithSourceStatusSchema,
  MailAccountWithSourceStatusSchema,
  MobileAccountWithSourceStatusSchema,
  TelegramAccountWithSourceStatusSchema,
  InstagramAccountWithSourceStatusSchema,
  MessengerAccountWithSourceStatusSchema,
]);

export type ViewAccount = Static<typeof ViewAccountSchema>;

export type ViewAccountWithSourceStatus = Static<typeof ViewAccountWithSourceStatusSchema>;

export type AccountSupportedProvider = Static<typeof AccountSupportedProviderSchema>;
export const MessagingAccountSupportedProviders: AccountSupportedProvider[] = [
  'LINKEDIN',
  'WHATSAPP',
  'INSTAGRAM',
  'MESSENGER',
  'TELEGRAM',
  'TWITTER',
];

export const MailingAccountSupportedProviders: AccountSupportedProvider[] = ['GOOGLE', 'MAIL', 'OUTLOOK'];

export const AllAccountSupportedProviders: AccountSupportedProvider[] = [
  ...MailingAccountSupportedProviders,
  ...MessagingAccountSupportedProviders,
];
