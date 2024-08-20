import { Static, Type } from '@sinclair/typebox';
import { UniqueIdSchema } from '../common/common.types.js';
import {
  AccountCreateLinkedinBodySchema,
  AccountCreateWhatsappBodySchema,
  AccountCreateInstagramBodySchema,
  AccountCreateMessengerBodySchema,
  AccountCreateGoogleOauthBodySchema,
  AccountCreateTelegramBodySchema,
  AccountCreateOutlookBodySchema,
  AccountCreateTwitterBodySchema,
  AccountCreateCheckpointApiResponseSchema,
  AccountCreatedApiResponseSchema,
} from './accounts-create.types.js';
import { TypeCompiler } from '@sinclair/typebox/compiler';

/**
 * Imap Mail body schema
 */
export const AccountReconnectImapMailBodySchema = Type.Object({
  provider: Type.Union([Type.Literal('MAIL')]),
  imap_password: Type.String(),
  smtp_password: Type.String(),
});

/**
 * @todo all provider should have a specific reconnect schema and not use the create one
 */
export const AccountReconnectBodySchema = Type.Union([
  AccountCreateLinkedinBodySchema,
  AccountCreateWhatsappBodySchema,
  AccountCreateInstagramBodySchema,
  AccountCreateMessengerBodySchema,
  AccountReconnectImapMailBodySchema,
  Type.Omit(AccountCreateGoogleOauthBodySchema, ['sync_limit']),
  AccountCreateTelegramBodySchema,
  Type.Omit(AccountCreateOutlookBodySchema, ['sync_limit']),
  AccountCreateTwitterBodySchema,
  // AccountCreateImapMailBodySchema,
  // AccountCreateMicrosoftMailBodySchema,
]);

export type AccountReconnectBody = Static<typeof AccountReconnectBodySchema>;

export const AccountReconnectBodyValidator = TypeCompiler.Compile(AccountReconnectBodySchema);

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 *
 */
export const AccountReconnectedApiResponseSchema = Type.Object({
  object: Type.Literal('AccountReconnected'),
  account_id: UniqueIdSchema,
});

export type AccountReconnectedApiResponse = Static<typeof AccountReconnectedApiResponseSchema>;

// /**
//  *
//  */
// export const getAccountReconnectedR esponseOpenApiSchema = makeOpenApiSchemaGetter(AccountReconnectedApiResponseSchema);

/**  */
export const AccountReconnectApiResponseSchema = Type.Union([
    AccountReconnectedApiResponseSchema,
    AccountCreateCheckpointApiResponseSchema
])

export type AccountReconnectApiResponse = Static<
  typeof AccountReconnectApiResponseSchema
>;

/**  */
export const AccountReconnectApiResponseValidator = TypeCompiler.Compile(AccountReconnectApiResponseSchema);

/**  */
export const AccountSolveCheckpointApiResponseSchema = Type.Union([
    AccountCreatedApiResponseSchema,
    AccountReconnectedApiResponseSchema,
    AccountCreateCheckpointApiResponseSchema
])

export type AccountSolveCheckpointApiResponse = Static<
  typeof AccountSolveCheckpointApiResponseSchema
>;

/**  */
export const AccountSolveCheckpointApiResponseValidator = TypeCompiler.Compile(AccountSolveCheckpointApiResponseSchema);