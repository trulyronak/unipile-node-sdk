import { Static, Type } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';
import { i18n } from '../common/i18n.fake.js';
import { UniqueIdSchema } from '../common/common.types.js';
import { RequiredProps } from '../common/core.types.tmp.js';
import { UTCDateTimeMsSchema } from '../common/date.types.js';
import { EncodedQueryCursorType } from '../common/query-cursor.js';
import { AccountIdParamSchema, ListCursorQuerySchema, ListLimitQuerySchema } from '../common/query-parameters.type.js';
import { FolderRoleSchema } from './folders/folders.types.js';
import { MailFullSchema, MailMetaSchema, MailReferenceSchema } from './ressource.types.js';

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------

/**
 *
 */
const MailListOptionsQuerySchema = Type.Object({
  account_id: AccountIdParamSchema,
  role: Type.Optional(FolderRoleSchema),
  folder: Type.Optional(Type.String()),
  from: Type.Optional(Type.String()),
  to: Type.Optional(Type.String()),
  any_email: Type.Optional(Type.String()),
  after: Type.Optional(UTCDateTimeMsSchema),
  before: Type.Optional(UTCDateTimeMsSchema),
  include_headers: Type.Optional(Type.Boolean()),
  meta_only: Type.Optional(Type.Boolean()),
});

export type MailListOptionsQuery = Static<typeof MailListOptionsQuerySchema>;

/**
 *
 */
export const MailListDecodedCursorSchema = Type.Composite([
  MailListOptionsQuerySchema,
  Type.Required(ListLimitQuerySchema),
  Type.Object({
    cursor: Type.Object({
      last_id: UniqueIdSchema,
      last_date: UTCDateTimeMsSchema,
      token: Type.Optional(Type.String()),
    }),
  }),
]);

export type MailListDecodedCursor = Static<typeof MailListDecodedCursorSchema>;

export const MailListDecodedCursorValidator = TypeCompiler.Compile(MailListDecodedCursorSchema);

/**
 *
 */
export const MailListBaseQuerySchema = Type.Composite([MailListOptionsQuerySchema, ListLimitQuerySchema]);

export type MailListBaseQuery = Static<typeof MailListBaseQuerySchema>;

/**
 *
 */
export const MailListQuerySchema = Type.Union([MailListBaseQuerySchema, ListCursorQuerySchema], {
  description: i18n.t('@todo api.Query.Cursor.ignore_other_params'),
});

export type MailListQuery = Static<typeof MailListQuerySchema>;

// /**
//  *
//  */
// export const getMailListQueryOpenApiSchema =
//   makeOpenApiSchemaGetter(MailListQuerySchema);

/**
 *
 */
export const MailListQueryValidator = TypeCompiler.Compile(MailListQuerySchema);

/**
 *
 */
const MailGetOptionsQuerySchema = Type.Object({
  account_id: Type.Optional(AccountIdParamSchema),
  include_headers: Type.Optional(Type.Boolean()),
});

/**
 *
 */
export const MailGetQuerySchema = MailGetOptionsQuerySchema;

/**
 *
 */
export const MailGetQueryValidator = TypeCompiler.Compile(MailGetQuerySchema);

/**
 *
 */
export type MailListQueryDTO = RequiredProps<MailListBaseQuery, 'limit'> | { cursor: MailListDecodedCursor };

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/** */
export const MailRefApiResponse = Type.Composite(
    [Type.Object({ object: Type.Literal('Email') }), MailReferenceSchema],
    { title:  'Mail reference' },
);

/** */
export const MailMetaApiResponse = Type.Composite(
    [Type.Object({ object: Type.Literal('Email') }), MailMetaSchema],
    { title:  'Mail metas' },
);

/** */
export const MailFullApiResponse = Type.Composite(
  [Type.Object({ object: Type.Literal('Email') }), MailFullSchema],
  { title: 'Full mail' },
);

/**
 *
 */
export const MailListApiResponseSchema = Type.Object(
  {
    object: Type.Literal('EmailList'),
    items: Type.Array(Type.Union([MailRefApiResponse, MailMetaApiResponse, MailFullApiResponse])),
    cursor: Type.Union([EncodedQueryCursorType(), Type.Null()]),
  },
  { description: '@todo List of Emails.' },
);

// /**
//  *
//  */
// export const getMailListResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   MailListApiResponseSchema
// );

/**
 *
 */
export type MailListApiResponse = Static<typeof MailListApiResponseSchema>;

/**  */
export const MailListApiResponseValidator = TypeCompiler.Compile(MailListApiResponseSchema);
