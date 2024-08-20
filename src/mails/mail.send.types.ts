import { Static, Type } from "@sinclair/typebox";
import { BufferType, ReadableType } from "./attachments/resource.types.js";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { UniqueIdSchema } from "../common/common.types.js";

const MAX_ATTACHMENTS = 26214400;
const MAX_ATTACHMENT_SIZE = 26214400;

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

/**
 *
 */
export const MailSentApiResponseSchema = Type.Object(
  {
    object: Type.Literal("EmailSent"),
    tracking_id: UniqueIdSchema,
  },
  { description: "@todo Email has been sent." }
);

// /**
//  *
//  */
// export const getMailSentResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   MailSentApiResponseSchema
// );

/**
 *
 */
export type MailSentApiResponse = Static<typeof MailSentApiResponseSchema>;

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

export const AttachmentsPostQueryValidator = TypeCompiler.Compile(
  Type.Optional(
    Type.Array(AttachmentPostQuerySchema, { maxItems: MAX_ATTACHMENTS })
  )
);



/**  */
export const MailSentApiResponseValidator = TypeCompiler.Compile(MailSentApiResponseSchema);