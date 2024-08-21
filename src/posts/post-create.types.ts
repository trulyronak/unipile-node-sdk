import { Type, Static } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { MessageDraftAttachment } from "../messaging/messages/ressource.types.js";
import { AttachmentPostQuery } from "../mails/mail.send.types.js";

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------
export const CreatePostTwitterOptionsSchema = Type.Object({
  reply_policy: Type.Optional(
    Type.Union([
      Type.Literal("EVERYONE"),
      Type.Literal("FOLLOWING"),
      Type.Literal("MENTIONED"),
      Type.Literal("VERIFIED"),
    ])
  ),
  in_reply_to: Type.Optional(Type.String({ minLength: 1 })),
});

export type CreatePostTwitterOptions = Static<typeof CreatePostTwitterOptionsSchema>;

export const CreatePostOptionsSchema = Type.Union([
  CreatePostTwitterOptionsSchema
]);

export type CreatePostOptions = CreatePostTwitterOptions;

export const CreatePostBodySchema = Type.Object({
  account_id: Type.String({
    description: "The id of the account to perform the request from.",
    minLength: 1,
  }),
  text: Type.String({
    minLength: 1,
  }),
  attachments: Type.Optional(Type.Array(Type.String({ format: "binary" }))),
  // options: Type.Optional(CreatePostOptionsSchema),
});


export type CreatePostBody = Static<typeof CreatePostBodySchema>;

export const CreatePostBodyValidator = TypeCompiler.Compile(
  CreatePostBodySchema
);

// export const CreatePostBodyOpenApiSchema = makeOpenApiSchemaGetter(
//   CreatePostBodySchema
// );

export type CreatePostBodyDTO = Omit<
  CreatePostBody,
  "attachments"
> & {
  attachments?: AttachmentPostQuery[];
};

export type CreatePostDTO = Omit<
  CreatePostBody,
  "attachments"
> & {
  attachments?: MessageDraftAttachment[];
};
// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------
export const CreatePostResponseSchema = Type.Object({
  object: Type.Literal("PostCreated")
});

export type CreatePostResponse = Static<typeof CreatePostResponseSchema>;

// /**
//  *
//  */
// export const getCreatePostResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   CreatePostResponseSchema
// );

/**  */
export const CreatePostResponseValidator = TypeCompiler.Compile(CreatePostResponseSchema);