import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { EncodedQueryCursorType } from "../common/query-cursor.js";
import { LargeListLimitQuerySchema } from "../common/query-parameters.type.js";
import { UniqueIdSchema } from "../common/common.types.js";
import { LinkedinUserRelationSchema } from "./ressource.types.js";

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------

export const UserRelationsListQuerySchema = Type.Union([
  Type.Composite([
    LargeListLimitQuerySchema,
    Type.Object({ account_id: UniqueIdSchema }),
  ]),
  Type.Object({ account_id: UniqueIdSchema, cursor: EncodedQueryCursorType() }),
]);

const UserRelationsListDecodedCursorSchema = Type.Object({
  limit: Type.Number(),
  startIndex: Type.Number(),
});

export type UserRelationsListDecodedCursor = Static<
  typeof UserRelationsListDecodedCursorSchema
>;

export const UserRelationsListDecodedCursorValidator = TypeCompiler.Compile(
  UserRelationsListDecodedCursorSchema
);

export const UserRelationsListQueryValidator = TypeCompiler.Compile(
  UserRelationsListQuerySchema
);

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

const UserRelationsListApiResponseSchema = Type.Object({
  object: Type.Literal("UserRelationsList"),
  items: Type.Array(
    Type.Composite([
      Type.Object({ object: Type.Literal("UserRelation") }),
      LinkedinUserRelationSchema,
    ])
  ),
  cursor: Type.Union([EncodedQueryCursorType(), Type.Null()]),
});

export type UserRelationsListApiResponse = Static<
  typeof UserRelationsListApiResponseSchema
>;

/**  */
export const UserRelationsListApiResponseValidator = TypeCompiler.Compile(UserRelationsListApiResponseSchema);