import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { UniqueIdSchema } from "../../common/common.types.js";
import { UTCDateTimeMsSchema } from "../../common/date.types.js";
import { AccountIdParamSchema } from "../../common/query-parameters.type.js";

/**
 *
 */
export const FolderRoleSchema = Type.Union([
  Type.Literal("inbox"),
  Type.Literal("sent"),
  Type.Literal("archive"),
  Type.Literal("drafts"),
  Type.Literal("trash"),
  Type.Literal("spam"),
  Type.Literal("all"),
  Type.Literal("important"),
  Type.Literal("starred"),
  Type.Literal("unknown"),
]);

/**
 *
 */
const FolderBaseSchema = Type.Object({
  id: UniqueIdSchema,
  name: Type.String(),
  account_id: UniqueIdSchema,
  role: FolderRoleSchema,
  nb_mails: Type.Optional(Type.Number()),
  provider_id: Type.String(),
});

/**
 *
 */
export const FolderUnsyncedSchema = Type.Composite([
  Type.Object({
    status: Type.Union([Type.Literal("UNSYNC"), Type.Literal("NEVER")]),
  }),
  FolderBaseSchema,
]);

/**
 *
 */
export const FolderSyncedSchema = Type.Composite([
  Type.Object({
    status: Type.Literal("SYNC"),
    last_synced: UTCDateTimeMsSchema,
  }),
  FolderBaseSchema,
]);

/**
 *
 */
export const FolderSyncingSchema = Type.Composite([
  Type.Object({
    status: Type.Literal("FETCHING"),
    offset: Type.Number(),
  }),
  FolderBaseSchema,
]);

/**
 *
 */
export const FolderSyncErrorSchema = Type.Composite([
  Type.Object({
    status: Type.Literal("ERROR"),
    offset: Type.Number(),
    error: Type.String(),
    attempts: Type.Number(),
  }),
  FolderBaseSchema,
]);

/**
 *
 */
export const FolderSchema = Type.Union([
  FolderUnsyncedSchema,
  FolderSyncedSchema,
  FolderSyncingSchema,
  FolderSyncErrorSchema,
]);

export type Folder = Static<typeof FolderSchema>;

//------------------------------------------------------------------------------
/**
 *
 */
export const FolderListApiResponseSchema = Type.Object(
  {
    object: Type.Literal("FolderList"),
    items: Type.Array(
      Type.Intersect([
        Type.Object({ object: Type.Literal("Folder") }),
        FolderBaseSchema,
      ])
    ),
  },
  { description: "@todo List of Folders." }
);

// /**
//  *
//  */
// export const getFolderListResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   FolderListApiResponseSchema
// );

/**
 *
 */
export type FolderListApiResponse = Static<typeof FolderListApiResponseSchema>;

//------------------------------------------------------------------------------
/**
 *
 */
export const FolderListQuerySchema = Type.Object({
  account_id: Type.Optional(Type.String()),
});
export type FolderListQuery = Static<typeof FolderListQuerySchema>;

// /**
//  *
//  */
// export const getFolderListQueryOpenApiSchema = makeOpenApiSchemaGetter(
//   FolderListQuerySchema
// );

/**
 *
 */
export const FolderListQueryValidator = TypeCompiler.Compile(
  FolderListQuerySchema
);

/**
 *
 */
const FolderOptionsQuerySchema = Type.Object({
  account_id: Type.Optional(AccountIdParamSchema),
});

/**
 *
 */
export const FolderQuerySchema = FolderOptionsQuerySchema;

/**
 *
 */
export const FolderQueryValidator = TypeCompiler.Compile(FolderQuerySchema);

//------------------------------------------------------------------------------
// /**
//  *
//  */
// export const FolderSyncApiResponseSchema = Type.Composite([
//   Type.Object({
//     object: Type.Literal("Folder"),
//   }),
//   FolderSyncedSchema || FolderSyncErrorSchema,
// ]);

/**
 *
 */
export const FolderApiResponseSchema = Type.Intersect([
  Type.Object({
    object: Type.Literal("Folder"),
  }),
  FolderBaseSchema,
]);

// /**
//  *
//  */
// export const getFolderResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   FolderApiResponseSchema
// );

/**
 *
 */
export type FolderApiResponse = Static<typeof FolderApiResponseSchema>;

/**  */
export const FolderListApiResponseValidator = TypeCompiler.Compile(FolderListApiResponseSchema);

/**  */
export const FolderApiResponseValidator = TypeCompiler.Compile(FolderApiResponseSchema);
