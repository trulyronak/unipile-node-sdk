import { Static, Type } from "@sinclair/typebox";
import {
  InstagramUserProfileSchema,
  LinkedinUserProfileSchema,
  TelegramUserProfileSchema,
  TwitterUserProfileSchema,
  WhatsappUserProfileSchema,
} from "./ressource.types.js";
import {
  StringEnum,
  UniqueIdSchema,
} from "../common/common.types.js";
import { TypeCompiler } from "@sinclair/typebox/compiler";

// --------------------------------------------------------------------------
// REQUEST
// --------------------------------------------------------------------------

export const LinkedinSection = StringEnum(
  ["experience", "education", "languages", "skills", "certifications", "about"],
  { description: "A string with a section name." }
);

export const LinkedinSectionSchema = Type.Union([
  LinkedinSection,
  Type.Literal("*", {
    description: "A string with * character that stands for all sections.",
  }),
  Type.Array(LinkedinSection, { description: "An array of section names." }),
]);

export const UserProfileQuerySchema = Type.Object({
  account_id: UniqueIdSchema,
  notify: Type.Optional(
    Type.Boolean({
      description:
        "Whether the profile visit should be notified to the viewee or not. Default is false.",
    })
  ),
  linkedin_api: Type.Optional(
    StringEnum(["recruiter", "sales_navigator"], {
      description:
        "The Linkedin API that should be used to get the profile (relative features must be subscribed), if different from classic.",
    })
  ),
  linkedin_sections: Type.Optional(LinkedinSectionSchema),
});

export enum LinkedinApiTypeEnum {
  RECRUITER = "recruiter",
  SALES_NAVIGATOR = "sales_navigator",
}

export type UserProfileQuery = Static<typeof UserProfileQuerySchema>;

export const UserProfileQueryValidator = TypeCompiler.Compile(
  UserProfileQuerySchema
);

// export const getUserProfileQueryOpenApiSchema = makeOpenApiSchemaGetter(
//   UserProfileQuerySchema
// );

// export const getUserProfileLinkedinSectionOpenApiSchema =
//   makeOpenApiSchemaGetter(LinkedinSectionSchema);

// --------------------------------------------------------------------------
// RESPONSE
// --------------------------------------------------------------------------

export const LinkedinProfileApiResponseSchema = Type.Composite(
  [
    LinkedinUserProfileSchema,
    Type.Object({
      object: Type.Literal("UserProfile"),
    }),
  ],
  { title: "LinkedIn" }
);

export const WhatsappProfileApiResponseSchema = Type.Composite(
  [
    WhatsappUserProfileSchema,
    Type.Object({
      object: Type.Literal("UserProfile"),
    }),
  ],
  { title: "Whatsapp" }
);

export const InstagramProfileApiResponseSchema = Type.Composite(
  [
    InstagramUserProfileSchema,
    Type.Object({
      object: Type.Literal("UserProfile"),
    }),
  ],
  { title: "Instagram" }
);

export const TelegramProfileApiResponseSchema = Type.Composite(
  [
    TelegramUserProfileSchema,
    Type.Object({
      object: Type.Literal("UserProfile"),
    }),
  ],
  { title: "Telegram" }
);

export const TwitterProfileApiResponseSchema = Type.Composite(
  [
    TwitterUserProfileSchema,
    Type.Object({
      object: Type.Literal("UserProfile"),
    }),
  ],
  { title: "Twitter" }
);

/**
 *
 */
export const UserProfileApiResponseSchema = Type.Union([
  LinkedinProfileApiResponseSchema,
  WhatsappProfileApiResponseSchema,
  InstagramProfileApiResponseSchema,
  TelegramProfileApiResponseSchema,
  TwitterProfileApiResponseSchema,
]);

export type UserProfileApiResponse = Static<
  typeof UserProfileApiResponseSchema
>;

// export const getUserProfileResponseOpenApiSchema = makeOpenApiSchemaGetter(
//   UserProfileApiResponseSchema
// );

/**  */
export const UserProfileApiResponseValidator = TypeCompiler.Compile(UserProfileApiResponseSchema);