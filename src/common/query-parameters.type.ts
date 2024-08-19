import { Static, Type } from '@sinclair/typebox';
import { i18n } from './i18n.fake.js';
import { UTCDateTimeExample, UTCDateTimePattern } from './query-utils.js';

const LIST_LIMIT_MIN = 1;
const LIST_LIMIT_MAX = 250;
const LARGE_LIST_LIMIT_MAX = 1000;
const SHORT_LIMIT_MAX = 100;
const LIST_LIMIT_DEFAULT = 100;
const SHORT_LIST_LIMIT_DEFAULT = 10;

/**
 *
 */
export const CursorParamSchema = Type.String({
  title: 'CursorParam',
  description:
    'A cursor for pagination purposes. To get the next page of entries, you need to make a new request and fulfill this field with the cursor received in the preceding request. This process should be repeated until all entries have been retrieved.',
  minLength: LIST_LIMIT_MIN,
});

export const ShortLimitParamSchema = Type.Integer({
  minimum: LIST_LIMIT_MIN,
  maximum: SHORT_LIMIT_MAX,
  description: `A limit for the number of items returned in the response. The value can be set between ${LIST_LIMIT_MIN} and ${SHORT_LIMIT_MAX}.`,
  default: SHORT_LIST_LIMIT_DEFAULT,
});

export const ListLimitParamSchema = Type.Integer({
  minimum: LIST_LIMIT_MIN,
  maximum: LIST_LIMIT_MAX,
  description: `A limit for the number of items returned in the response. The value can be set between ${LIST_LIMIT_MIN} and ${LIST_LIMIT_MAX}.`,
  example: LIST_LIMIT_DEFAULT,
});

export const LargeListLimitParamSchema = Type.Integer({
  minimum: LIST_LIMIT_MIN,
  maximum: LARGE_LIST_LIMIT_MAX,
  description: `A limit for the number of items returned in the response. The value can be set between ${LIST_LIMIT_MIN} and ${LARGE_LIST_LIMIT_MAX}.`,
  example: LIST_LIMIT_DEFAULT,
});

/**
 *
 */
export const AccountIdParamSchema = Type.String({
  title: 'AccountIdParam',
  description: 'An Unipile account id.',
  minLength: LIST_LIMIT_MIN,
});

/**
 *
 */
export const AccountIdOrIdsParamSchema = Type.String({
  title: 'AccountIdOrIdsParam',
  description: 'An Unipile account id or a list of Unipile account ids separated by commas.',
  minLength: LIST_LIMIT_MIN,
});

/**
 *
 */
export const SenderIdParamSchema = Type.String({
  title: 'SenderIdParam',
  description: i18n.t('api.SenderIdParam.description'),
  examples: i18n.t('api.SenderIdParam.example'),
  minLength: LIST_LIMIT_MIN,
});

/**
 *
 */
export const ChatIdParamSchema = Type.String({
  title: 'ChatIdParam',
  description: i18n.t('api.ChatIdParam.description'),
  examples: i18n.t('api.ChatIdParam.example'),
  minLength: LIST_LIMIT_MIN,
});

/**
 *
 */
export const ChatAttendeeIdParamSchema = Type.String({
  title: 'ChatAttendeeIdParam',
  description: i18n.t('api.ChatAttendeeIdParam.description'),
  examples: i18n.t('api.ChatAttendeeIdParam.example'),
  minLength: LIST_LIMIT_MIN,
});

/**
 *
 */
export const CalendarIdParamSchema = Type.String({
  title: 'CalendarIdParam',
  description: i18n.t('api.CalendarIdParam.description'),
  examples: i18n.t('api.CalendarIdParam.example'),
  minLength: LIST_LIMIT_MIN,
});

/**
 *
 */
export const CalendarEventIdParamSchema = Type.String({
  title: 'CalendarEventIdParam',
  description: i18n.t('api.CalendarEventIdParam.description'),
  examples: i18n.t('api.CalendarEventIdParam.example'),
  minLength: LIST_LIMIT_MIN,
});

export const BeforeParamSchema = Type.String({
  description:
    'A filter to target items created before the datetime (exclusive). Must be an ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).',
  example: UTCDateTimeExample,
  pattern: UTCDateTimePattern,
});

export const AfterParamSchema = Type.String({
  description:
    'A filter to target items created before the datetime (exclusive). Must be an ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).',
  example: UTCDateTimeExample,
  pattern: UTCDateTimePattern,
});

/**
 *
 */
export const ListLimitQuerySchema = Type.Object({
  limit: Type.Optional(
    Type.Integer({
      minimum: LIST_LIMIT_MIN,
      maximum: LIST_LIMIT_MAX,
      default: LIST_LIMIT_DEFAULT,
      description: i18n.t('api.Query.limit', {
        min: LIST_LIMIT_MIN,
        max: LIST_LIMIT_MAX,
      }),
    }),
  ),
});

export const ShortListLimitQuerySchema = Type.Object({
  limit: Type.Optional(
    Type.Integer({
      minimum: LIST_LIMIT_MIN,
      maximum: SHORT_LIMIT_MAX,
      default: SHORT_LIST_LIMIT_DEFAULT,
      description: i18n.t('api.Query.limit', {
        min: LIST_LIMIT_MIN,
        max: SHORT_LIMIT_MAX,
      }),
    }),
  ),
});

export const LargeListLimitQuerySchema = Type.Object({
  limit: Type.Optional(
    Type.Integer({
      minimum: LIST_LIMIT_MIN,
      maximum: LARGE_LIST_LIMIT_MAX,
      default: LIST_LIMIT_DEFAULT,
      description: i18n.t('api.Query.limit', {
        min: LIST_LIMIT_MIN,
        max: LIST_LIMIT_MAX,
      }),
    }),
  ),
});

export type ListLimitQuery = Static<typeof ListLimitQuerySchema>;
export type LargeListLimitQuery = Static<typeof LargeListLimitQuerySchema>;

/**
 *
 */
export const ListCursorQuerySchema = Type.Composite([Type.Object({ cursor: CursorParamSchema }), ListLimitQuerySchema]);

export type ListCursorQuery = Static<typeof ListCursorQuerySchema>;
