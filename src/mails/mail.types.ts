import { Static, Type } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';
import { MailFullApiResponse, MailMetaApiResponse, MailRefApiResponse } from './mails-list.types.js';

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 *
 */
export const MailApiResponseSchema = Type.Union(
    [MailRefApiResponse, MailMetaApiResponse, MailFullApiResponse],
    {
      description: "@todo Email",
    }
);

export type MailApiResponse = Static<typeof MailApiResponseSchema>;

// export const getMailResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   MailApiResponseSchema
// );

/**  */
export const MailApiResponseValidator = TypeCompiler.Compile(MailApiResponseSchema);
