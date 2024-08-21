import { Static, Type } from "@sinclair/typebox";
import { UniqueIdSchema } from "../common/common.types.js";
import { MessageAttachmentSchema } from "../messaging/messages/ressource.types.js";

/**
 *
 */
export const LinkedinUserProfileSchema = Type.Object({
  provider: Type.Literal("LINKEDIN"),
  provider_id: Type.String(),
  public_identifier: Type.Union([Type.String(), Type.Null()]),
  first_name: Type.Union([Type.String(), Type.Null()]),
  last_name: Type.Union([Type.String(), Type.Null()]),
  headline: Type.String(),
  summary: Type.Optional(Type.String()),
  contact_info: Type.Optional(
    Type.Object({
      emails: Type.Optional(Type.Array(Type.String())),
      phones: Type.Optional(Type.Array(Type.String())),
      adresses: Type.Optional(Type.Array(Type.String())),
      socials: Type.Optional(
        Type.Array(Type.Object({ type: Type.String(), name: Type.String() }))
      ),
    })
  ),
  birthdate: Type.Optional(
    Type.Object({
      month: Type.Number(),
      day: Type.Number(),
    })
  ),
  primary_locale: Type.Optional(
    Type.Object({
      country: Type.String(),
      language: Type.String(),
    })
  ),
  location: Type.Optional(Type.String()),
  websites: Type.Array(Type.String()),
  profile_picture_url: Type.Optional(Type.String()),
  background_picture_url: Type.Optional(Type.String()),
  hashtags: Type.Optional(Type.Array(Type.String())),
  can_send_inmail: Type.Optional(Type.Boolean()),
  is_open_profile: Type.Optional(Type.Boolean()),
  is_premium: Type.Optional(Type.Boolean()),
  is_influencer: Type.Optional(Type.Boolean()),
  is_creator: Type.Optional(Type.Boolean()),
  is_hiring: Type.Optional(Type.Boolean()),
  is_open_to_work: Type.Optional(Type.Boolean()),
  is_saved_lead: Type.Optional(Type.Boolean()),
  is_crm_imported: Type.Optional(Type.Boolean()),
  is_relationship: Type.Optional(Type.Boolean()),
  is_self: Type.Optional(Type.Boolean()),
  invitation: Type.Optional(
    Type.Object({
      type: Type.Union([Type.Literal("SENT"), Type.Literal("RECEIVED")]),
      status: Type.Union([
        Type.Literal("PENDING"),
        Type.Literal("IGNORED"),
        Type.Literal("WITHDRAWN"),
      ]),
    })
  ),
  work_experience: Type.Optional(
    Type.Array(
      Type.Object({
        position: Type.String(),
        company_id: Type.Optional(Type.String()),
        company: Type.String(),
        location: Type.Optional(Type.String()),
        description: Type.Optional(Type.String()),
        current: Type.Optional(Type.Boolean()),
        status: Type.Optional(Type.String()),
        start: Type.Union([Type.String(), Type.Null()]),
        end: Type.Union([Type.String(), Type.Null()]),
      })
    )
  ),
  volunteering_experience: Type.Optional(
    Type.Array(
      Type.Object({
        company: Type.String(),
        description: Type.String(),
        role: Type.String(),
        cause: Type.String(),
        start: Type.Union([Type.String(), Type.Null()]),
        end: Type.Union([Type.String(), Type.Null()]),
      })
    )
  ),
  education: Type.Optional(
    Type.Array(
      Type.Object({
        degree: Type.Optional(Type.String()),
        school: Type.String(),
        field_of_study: Type.Optional(Type.String()),
        start: Type.Union([Type.String(), Type.Null()]),
        end: Type.Union([Type.String(), Type.Null()]),
      })
    )
  ),
  skills: Type.Optional(
    Type.Array(
      Type.Object({
        name: Type.String(),
        endorsement_count: Type.Number(),
      })
    )
  ),
  languages: Type.Optional(
    Type.Array(
      Type.Object({
        name: Type.String(),
        proficiency: Type.Optional(Type.String()),
      })
    )
  ),
  certifications: Type.Optional(
    Type.Array(
      Type.Object({
        name: Type.String(),
        organization: Type.String(),
        url: Type.Optional(Type.String()),
      })
    )
  ),
  follower_count: Type.Optional(Type.Number()),
  connections_count: Type.Optional(Type.Number()),
  shared_connections_count: Type.Optional(Type.Number()),
  network_distance: Type.Optional(
    Type.Union([
      Type.Literal("FIRST_DEGREE"),
      Type.Literal("SECOND_DEGREE"),
      Type.Literal("THIRD_DEGREE"),
      Type.Literal("OUT_OF_NETWORK"),
    ])
  ),
  public_profile_url: Type.Optional(Type.String()),
});

export type LinkedinUserProfile = Static<typeof LinkedinUserProfileSchema>;

/**
 *
 */
export const WhatsappUserProfileSchema = Type.Object({
  provider: Type.Literal("WHATSAPP"),
  id: Type.String(),
});

export type WhatsappUserProfile = Static<typeof WhatsappUserProfileSchema>;

/**
 *
 */
export const InstagramUserProfileSchema = Type.Object({
  provider: Type.Literal("INSTAGRAM"),
  pk: Type.Number(),
  username: Type.String(),
  full_name: Type.String(),
  profile_pic_url: Type.String(),
  biography: Type.String(),
  follower_count: Type.Number(),
  following_count: Type.Number(),
  is_verified: Type.Boolean(),
  is_business: Type.Boolean(),
  is_private: Type.Boolean(),
});

type InstagramUserProfile = Static<typeof InstagramUserProfileSchema>;

/**
 *
 */
export const TelegramUserProfileSchema = Type.Object({
  provider: Type.Literal("TELEGRAM"),
  provider_id: Type.String(),
  self: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  contact: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  mutual_contact: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  deleted: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  bot: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  verified: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  restricted: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  fake: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  premium: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  close_friend: Type.Optional(Type.Union([Type.Boolean(), Type.Null()])),
  first_name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  last_name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  username: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  phone: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  profile_picture_url: Type.String(),
  status: Type.Optional(
    Type.Union([
      Type.Object({
        name: Type.String(),
        expires: Type.Optional(Type.Number()),
        was_online: Type.Optional(Type.Number()),
      }),
      Type.Null(),
    ])
  ),
  restriction_reason: Type.Optional(
    Type.Union([
      Type.Array(
        Type.Object({
          platform: Type.String(),
          reason: Type.String(),
          text: Type.String(),
        })
      ),
      Type.Null(),
    ])
  ),
  lang_code: Type.Optional(Type.Union([Type.String(), Type.Null()])),
});

export type TelegramUserProfile = Static<typeof TelegramUserProfileSchema>;

export const TwitterUserProfileSchema = Type.Object({
  provider: Type.Literal("TWITTER"),
  id: Type.String(),
  name: Type.String(),
  screen_name: Type.String(),
  location: Type.String(),
  description: Type.Union([Type.Null(), Type.String()]),
  url: Type.Union([Type.Null(), Type.String()]),
  entities: Type.Object({
    description: Type.Object({
      urls: Type.Array(Type.Any()),
    }),
  }),
  protected: Type.Boolean(),
  verified: Type.Boolean(),
  followers_count: Type.Number(),
  friends_count: Type.Number(),
  listed_count: Type.Number(),
  favourites_count: Type.Number(),
  statuses_count: Type.Number(),
  created_at: Type.String(),
  profile_banner_url: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  profile_image_url_https: Type.String(),
  default_profile: Type.Boolean(),
  default_profile_image: Type.Boolean(),
  withheld_in_countries: Type.Array(Type.String()),

  //Deprecated by twitter should retun null
  followed_by: Type.Optional(Type.Union([Type.Null(), Type.Boolean()])),
  following: Type.Optional(Type.Union([Type.Null(), Type.Boolean()])),
  follow_request_sent: Type.Optional(Type.Union([Type.Null(), Type.Boolean()])),
  has_extended_profile: Type.Optional(
    Type.Union([Type.Null(), Type.Boolean()])
  ),
  notifications: Type.Optional(Type.Union([Type.Null(), Type.Boolean()])),

  // Not found in twitter documentation but exist in response
  advertiser_account_type: Type.Optional(
    Type.Union([Type.Null(), Type.String()])
  ),
  business_profile_state: Type.Optional(
    Type.Union([Type.Null(), Type.String()])
  ),
  require_some_consent: Type.Optional(
    Type.Union([Type.Null(), Type.Boolean()])
  ),
});

export type TwitterUserProfile = Static<typeof TwitterUserProfileSchema>;

export const GmailAliasSchema = Type.Object({
  email: Type.String(),
  display_name: Type.Optional(Type.String()),
  reply_to: Type.Optional(Type.String()),
  signature: Type.Optional(Type.String()),
  is_primary: Type.Optional(Type.Boolean()),
  is_default: Type.Optional(Type.Boolean()),
  verification_status: Type.Optional(Type.String()),
});

export const GmailUserProfileSchema = Type.Object({
  provider: Type.Literal("GMAIL"),
  email: Type.String(),
  messages_total: Type.Optional(Type.Number()),
  threads_total: Type.Optional(Type.Number()),
  aliases: Type.Array(GmailAliasSchema),
});

export type GmailUserProfile = Static<typeof GmailUserProfileSchema>;

export const OutlookUserProfileSchema = Type.Object({
  provider: Type.Literal("OUTLOOK"),
  id: Type.String(),
  email: Type.String(),
  display_name: Type.String(),
  given_name: Type.String(),
  surname: Type.String(),
  user_principal_name: Type.String(),
  job_title: Type.String(),
  mobile_phone: Type.String(),
  preferred_language: Type.String(),
});

export type OutlookUserProfile = Static<typeof OutlookUserProfileSchema>;

export const ImapUserProfileSchema = Type.Object({
  provider: Type.Literal("IMAP"),
  connection_params: Type.Object({
    imap: Type.Object({
      username: Type.String(),
      port: Type.Number(),
      host: Type.String(),
    }),
    smtp: Type.Object({
      username: Type.String(),
      port: Type.Number(),
      host: Type.String(),
    }),
  }),
});

export type ImapUserProfile = Static<typeof ImapUserProfileSchema>;

export type MessagingUserProfile =
  | LinkedinUserProfile
  | WhatsappUserProfile
  | InstagramUserProfile
  | TelegramUserProfile
  | TwitterUserProfile;

export type EmailUserProfile =
  | GmailUserProfile
  | OutlookUserProfile
  | ImapUserProfile;

export type UserProfile = MessagingUserProfile;

/**
 *
 */
export const LinkedinUserRelationSchema = Type.Object({
  first_name: Type.String(),
  last_name: Type.String(),
  headline: Type.String(),
  public_identifier: Type.String(),
  public_profile_url: Type.String(),
  created_at: Type.Number(),
  member_id: Type.String(),
  member_urn: Type.String(),
  connection_urn: Type.String(),
  profile_picture_url: Type.Optional(Type.String()),
});

export type LinkedinUserRelation = Static<typeof LinkedinUserRelationSchema>;

export type UserRelation = LinkedinUserRelation;

/**
 *
 */
export const LinkedinAccountOwnerProfileSchema = Type.Object({
  provider: Type.Literal("LINKEDIN"),
  provider_id: Type.String(),
  entity_urn: Type.String(),
  object_urn: Type.String(),
  first_name: Type.String(),
  last_name: Type.String(),
  profile_picture_url: Type.Union([Type.String(), Type.Null()]),
  public_profile_url: Type.Optional(Type.String()),
  public_identifier: Type.Optional(Type.String()),
  headline: Type.Optional(Type.String()),
  location: Type.Optional(Type.String()),
  email: Type.String(),
  premium: Type.Boolean(),
  open_profile: Type.Boolean(),
  occupation: Type.Optional(Type.String()),
  recruiter: Type.Union([
    Type.Object({
      owner_seat_id: Type.String(),
      contract_id: Type.String(),
    }),
    Type.Object({
      error: Type.Union([
        Type.Literal("MULTIPLE_SESSIONS"),
        Type.Literal("DISCONNECTED"),
      ]),
    }),
    Type.Null(),
  ]),
  sales_navigator: Type.Union([
    Type.Object({
      owner_seat_id: Type.String(),
      contract_id: Type.String(),
    }),
    Type.Object({ error: Type.Literal("DISCONNECTED") }),
    Type.Null(),
  ]),
});

export type LinkedinAccountOwnerProfile = Static<
  typeof LinkedinAccountOwnerProfileSchema
>;

export type TelegramAccountOwnerProfile = Static<
  typeof TelegramUserProfileSchema
>;

export type TwitterAccountOwnerProfile = Static<
  typeof TwitterUserProfileSchema
>;

export type AccountOwnerProfile =
  | LinkedinAccountOwnerProfile
  | TelegramAccountOwnerProfile
  | TwitterUserProfile
  | GmailUserProfile
  | OutlookUserProfile
  | ImapUserProfile;

const LinkedinPostAuthorSchema = Type.Object({
  public_identifier: Type.String(),
  name: Type.String(),
  is_company: Type.Boolean(),
});

export const LinkedinPostSchema = Type.Object({
  provider: Type.Literal("LINKEDIN"),
  id: UniqueIdSchema,
  social_id: UniqueIdSchema,
  share_url: Type.String(),
  title: Type.Optional(Type.String()),
  text: Type.String(),
  date: Type.String(),
  parsed_datetime: Type.String(),
  reaction_counter: Type.Number(),
  comment_counter: Type.Number(),
  repost_counter: Type.Number(),
  impressions_counter: Type.Number(),
  author: LinkedinPostAuthorSchema,
  permissions: Type.Object({
    can_react: Type.Boolean(),
    can_share: Type.Boolean(),
    can_post_comments: Type.Boolean(),
  }),
  is_repost: Type.Boolean(),
  repost_id: Type.Optional(
    Type.String({ description: "The republication ID." })
  ),
  reposted_by: Type.Optional(LinkedinPostAuthorSchema),
  repost_content: Type.Optional(
    Type.Object(
      {
        id: UniqueIdSchema,
        date: Type.String(),
        parsed_datetime: Type.String(),
        author: LinkedinPostAuthorSchema,
        text: Type.String(),
      },
      { description: "The post shared in the current publication." }
    )
  ),
  attachments: Type.Array(MessageAttachmentSchema),
  poll: Type.Optional(
    Type.Object({
      id: UniqueIdSchema,
      total_votes_count: Type.Number(),
      question: Type.String(),
      is_open: Type.Boolean(),
      options: Type.Array(
        Type.Object({
          id: UniqueIdSchema,
          text: Type.String(),
          win: Type.Boolean(),
          votes_count: Type.Number(),
        })
      ),
    })
  ),
});

export const PostSchema = Type.Union([LinkedinPostSchema]);

export type Post = Static<typeof PostSchema>;

export const InvitationSchema = Type.Object({
  id: UniqueIdSchema,
  invited_user: Type.Union([Type.String(), Type.Null()]),
  invited_user_id: Type.Union([Type.String(), Type.Null()]),
  invited_user_public_id: Type.Union([Type.String(), Type.Null()]),
  invited_user_description: Type.Union([Type.String(), Type.Null()]),
  date: Type.String(),
  parsed_datetime: Type.Union([Type.String(), Type.Null()]),
  invitation_text: Type.Union([Type.String(), Type.Null()]),
});

export type InvitationSent = Static<typeof InvitationSchema>;
