import { Static, Type } from "@sinclair/typebox";
import { StringEnum, UniqueId } from "../common/common.types.js";
import { TypeCompiler } from "@sinclair/typebox/compiler";

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------

export const AccountResyncLinkedinProductSchema = StringEnum([
  "classic",
  "recruiter",
  "sales_navigator",
]);

/**
 *
 */
export const AccountResyncQuerySchema = Type.Object({
  before: Type.Optional(Type.Number()),
  after: Type.Optional(Type.Number()),
  linkedin_product: Type.Optional(AccountResyncLinkedinProductSchema),
});

export type AccountResyncQuery = Static<typeof AccountResyncQuerySchema>;

export const AccountResyncQueryValidator = TypeCompiler.Compile(
  AccountResyncQuerySchema
);

export type AccountResyncInput= AccountResyncQuery & {
  account_id: UniqueId;
};

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 *
 */
export const AccountResyncResponseSchema = Type.Object({
  object: Type.Literal("AccountResync"),
  status: StringEnum(
    ["SYNC_STARTED", "SYNC_RUNNING", "SYNC_DONE", "SYNC_ERROR"],
    {
      description:
        "The status of the synchronization. You can setup a regular polling on the same route to get updates on its status. A new request after a SYNC_DONE or SYNC_ERROR response will start a fresh sync.",
    }
  ),
});

export type AccountResyncApiResponse = Static<
  typeof AccountResyncResponseSchema
>;