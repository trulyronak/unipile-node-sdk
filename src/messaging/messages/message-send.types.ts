import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import {
  BufferType,
  ReadableType,
} from "../../mails/attachments/resource.types.js";
import { UniqueId } from "../../common/common.types.js";
import { OptionalToUnionUndefined } from "../../common/core.types.tmp.js";
import { MessageDraftAttachment } from "./ressource.types.js";

const MAX_ATTACHMENTS = 26214400;
const MAX_ATTACHMENT_SIZE = 26214400;

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------

/**
 *
 */
export const SendMessageToChatBodySchema = Type.Object({
  text: Type.Optional(Type.String()),
  thread_id: Type.Optional(
    Type.String({
      description:
        "Optional and for Slack’s messaging only. The id of a sub thread associated with a chat.",
    })
  ),
  // voice_message: Type.Optional(
  //   Type.String({
  //     format: "binary",
  //     description: "For Linkedin messaging only.",
  //   })
  // ),
  attachments: Type.Optional(Type.Array(Type.String({ format: "binary" }))),
});

export type SendMessageToChatBody = Static<typeof SendMessageToChatBodySchema>;

// /**
//  *
//  */
// export const getSendMessageToChatBodyOpenApiSchema = makeOpenApiSchemaGetter(
//   SendMessageToChatBodySchema
// );

/**
 *
 */
export const SendMessageToChatBodyValidator = TypeCompiler.Compile(
  SendMessageToChatBodySchema
);

export type MessageSendBodyDTO = Omit<
  OptionalToUnionUndefined<
    SendMessageToChatBody,
    // "thread_id" | "voice_message"
    "thread_id"
  >,
  "attachments" | "voice_message"
> & {
  chat_id: UniqueId;
  voice_message?: AttachmentPostQuery;
  attachments?: AttachmentPostQuery[];
};

export type MessageSendDTO = Omit<
  OptionalToUnionUndefined<
    SendMessageToChatBody,
    // "thread_id" | "voice_message"
    "thread_id"
  >,
  "attachments" | "voice_message"
> & {
  chat_id: UniqueId;
  voice_message?: MessageDraftAttachment;
  attachments?: MessageDraftAttachment[];
};

export const AttachmentPostQuerySchema = Type.Object({
  fieldname: Type.String(),
  originalname: Type.String(),
  encoding: Type.String(),
  mimetype: Type.String(),
  size: Type.Number({ maximum: MAX_ATTACHMENT_SIZE }),
  buffer: BufferType(),
  stream: Type.Optional(ReadableType()),
  destination: Type.Optional(Type.String()),
  filename: Type.Optional(Type.String()),
  path: Type.Optional(Type.String()),
});

export type AttachmentPostQuery = Static<typeof AttachmentPostQuerySchema>;

// export const AttachmentsPostQueryValidator = TypeCompiler.Compile(
//   Type.Array(AttachmentPostQuerySchema, { maxItems: MAX_ATTACHMENTS })
// );
export const AttachmentsPostQueryValidator = TypeCompiler.Compile(
  Type.Optional(
    Type.Array(AttachmentPostQuerySchema, { maxItems: MAX_ATTACHMENTS })
  )
);

export const FilesPostQueryValidator = TypeCompiler.Compile(
  Type.Object({
    attachments: Type.Optional(
      Type.Array(AttachmentPostQuerySchema, { maxItems: MAX_ATTACHMENTS })
    ),
    voice_message: Type.Optional(
      Type.Array(AttachmentPostQuerySchema, { maxItems: 1 })
    ),
  })
);

export const VoiceMessagePostQueryValidator = TypeCompiler.Compile(
  Type.Union([AttachmentPostQuerySchema, Type.Null()])
);

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

export const MessageSentResponseSchema = Type.Object({
  object: Type.Literal("MessageSent"),
  message_id: Type.Union([Type.String(), Type.Null()], {
    description: "The Unipile ID of the newly sent message.",
  }),
});

export type MessageSentResponse = Static<typeof MessageSentResponseSchema>;

// /**
//  *
//  */
// export const getMessageSentResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   MessageSentResponseSchema
// );


/**  */
export const MessageSentResponseValidator = TypeCompiler.Compile(MessageSentResponseSchema);