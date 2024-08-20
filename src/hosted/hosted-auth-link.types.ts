import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import {
  HostedAuthTokenCreateSchema,
  HostedAuthTokenReconnectSchema,
} from "./resource.types.js";

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------

/**
 * @todo Add some guidance about sensible expiresOn values or remove it
 *       altogether.
 */
export const HostedAuthCreateLinkBodySchema = Type.Pick(
  HostedAuthTokenCreateSchema,
  [
    "type",
    "providers",
    "expiresOn",
    "name",
    "success_redirect_url",
    "failure_redirect_url",
    "notify_url",
    "api_url",
    "disabled_features",
    "sync_limit",
  ],
  {
    title: "Connection link",
  }
);

/** */
export const HostedAuthReconnectLinkBodySchema = Type.Pick(
  HostedAuthTokenReconnectSchema,
  [
    "type",
    "reconnect_account",
    "expiresOn",
    "name",
    "success_redirect_url",
    "failure_redirect_url",
    "notify_url",
    "api_url",
    "disabled_features",
    "sync_limit",
  ],
  {
    title: "Reconnection link",
  }
);

/** */
export const HostedAuthLinkBodySchema = Type.Union([
  HostedAuthCreateLinkBodySchema,
  HostedAuthReconnectLinkBodySchema,
]);

/** */
export type HostedAuthCreateLinkBody = Static<
  typeof HostedAuthCreateLinkBodySchema
>;
/** */
export type HostedAuthReconnectLinkBody = Static<
  typeof HostedAuthReconnectLinkBodySchema
>;

/** */
export const HostedAuthLinkBodyValidator = TypeCompiler.Compile(
  HostedAuthLinkBodySchema
);

// /** */
// export const getHostedAuthLinkBodyOpenApiSchema = makeOpenApiSchemaGetter(
//   HostedAuthLinkBodySchema
// );

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 * Global schema for every account when final creation step is done
 */
export const HostedAuthLinkResponseSchema = Type.Object({
  object: Type.Literal("HostedAuthUrl"),
  url: Type.String({
    description:
      "A url redirecting to Unipile's hosted authentication for account connection or reconnection.",
  }),
});

/** */
export type HostedAuthLinkResponse = Static<
  typeof HostedAuthLinkResponseSchema
>;

// /** */
// export const getHostedAuthLinkResponseOpenApiSchema = makeOpenApiSchemaGetter(
    //   HostedAuthLinkResponseSchema
    // );
    
    /** */
    export const HostedAuthWatchStatusSchema = Type.Optional(Type.Boolean());
    export type HostedAuthWatchStatusQueryParams = Static<
    typeof HostedAuthWatchStatusSchema
    >;
    export const HostedAuthWatchStatusQueryParamsValidator = TypeCompiler.Compile(
        HostedAuthWatchStatusSchema
    );
    export const HostedAuthLinkResponseValidator = TypeCompiler.Compile(
        HostedAuthLinkResponseSchema
    );
