import { Static, Type } from '@sinclair/typebox';
import { UniqueIdSchema } from '../common/common.types.js';
import { PostSchema } from '../users/ressource.types.js';

export const LinkedinCompanyProfileSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.String(),
  entity_urn: Type.String(),
  public_identifier: Type.String(),
  profile_url: Type.String(),
  tagline: Type.Optional(Type.String()),
  followers_count: Type.Number(),
  is_following: Type.Boolean(),
  is_employee: Type.Boolean(),
  messaging: Type.Object({
    is_enabled: Type.Boolean(),
    id: Type.Optional(Type.String()),
    entity_urn: Type.Optional(Type.String()),
  }),
  default_locale: Type.String(),
  viewer_permissions: Type.Object({
    canMembersInviteToFollow: Type.Boolean(),
    canReadContentSuggestions: Type.Boolean(),
    canReadMessages: Type.Boolean(),
    canUpdateOrganizationProfile: Type.Boolean(),
    canCreateOrganicShare: Type.Boolean(),
    canReadAdminDashboard: Type.Boolean(),
    canReadOrganizationActivity: Type.Boolean(),
    canEditCurators: Type.Boolean(),
    canManageOrganizationalPageFollow: Type.Boolean(),
    canReadOrganizationFollowerAnalytics: Type.Boolean(),
    canInviteMemberToFollow: Type.Boolean(),
    canReadOrganizationLeadsAnalytics: Type.Boolean(),
    canEditPendingAdministrators: Type.Boolean(),
    canManageMessagingAccess: Type.Boolean(),
    canSeeEmployeeExperienceAsMember: Type.Boolean(),
    canEmployeesInviteToFollow: Type.Boolean(),
    canSeeOrganizationAdministrativePage: Type.Boolean(),
  }),
  organization_type: Type.Union([
    Type.Literal('PUBLIC_COMPANY'),
    Type.Literal('EDUCATIONAL'),
    Type.Literal('SELF_EMPLOYED'),
    Type.Literal('GOVERNMENT_AGENCY'),
    Type.Literal('NON_PROFIT'),
    Type.Literal('SELF_OWNED'),
    Type.Literal('PRIVATELY_HELD'),
    Type.Literal('PARTNERSHIP'),
  ]),
  locations: Type.Array(
    Type.Object({
      is_headquarter: Type.Boolean(),
      country: Type.String(),
      city: Type.String(),
      postalCode: Type.Optional(Type.String()),
      street: Type.Array(Type.String()),
      description: Type.Optional(Type.String()),
      area: Type.Optional(Type.String()),
    }),
  ),
  logo: Type.Optional(Type.String()),
  localized_description: Type.Optional(
    Type.Array(
      Type.Record(Type.String(), Type.String(), {
        description: 'In this localized object, the key corresponds to the locale of the value e.g. fr_FR, en_US...',
      }),
    ),
  ),
  localized_name: Type.Optional(
    Type.Array(
      Type.Record(Type.String(), Type.String(), {
        description: 'In this localized object, the key corresponds to the locale of the value e.g. fr_FR, en_US...',
      }),
    ),
  ),
  localized_tagline: Type.Optional(
    Type.Array(
      Type.Record(Type.String(), Type.String(), {
        description: 'In this localized object, the key corresponds to the locale of the value e.g. fr_FR, en_US...',
      }),
    ),
  ),
  industry: Type.Optional(Type.Array(Type.String())),
  activities: Type.Optional(Type.Array(Type.String())),
  employee_count: Type.Optional(Type.Number()),
  website: Type.Optional(Type.String()),
  foundation_date: Type.Optional(Type.String()),
  phone: Type.Optional(Type.String()),
  insights: Type.Optional(
    Type.Object({
      employeesCount: Type.Optional(
        Type.Object({
          totalCount: Type.Number(),
          averageTenure: Type.String(),
          employeesCountGraph: Type.Array(Type.Object({ date: Type.String(), count: Type.Number() })),
          growthGraph: Type.Array(
            Type.Object({
              monthRange: Type.Number(),
              growthPercentage: Type.Number(),
            }),
          ),
        }),
      ),
    }),
  ),
});

export type LinkedinCompanyProfile = Static<typeof LinkedinCompanyProfileSchema>;

/**
 *
 */
export const LinkedinHiringProjectSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  owner_name: Type.String(),
  owner_id: Type.String(),
  created_at: Type.String(),
});

export type LinkedinHiringProject = Static<typeof LinkedinHiringProjectSchema>;

/**
 *
 */
export const LinkedinSearchItemSchema = Type.Object({
  id: UniqueIdSchema,
  title: Type.String(),
  additional_data: Type.Optional(Type.Record(Type.String(), Type.Union([Type.String(), Type.Number(), Type.Boolean()]))),
});

export type LinkedinSearchItem = Static<typeof LinkedinSearchItemSchema>;

export const LinkedinPeopleSearchResultSchema = Type.Object({
  type: Type.Literal('PEOPLE'),
  id: Type.String(),
  public_identifier: Type.Union([Type.String(), Type.Null()]),
  public_profile_url: Type.Union([Type.String(), Type.Null()]),
  profile_url: Type.Union([Type.String(), Type.Null()]),
  profile_picture_url: Type.Union([Type.String(), Type.Null()]),
  member_urn: Type.Union([Type.String(), Type.Null()]),
  name: Type.Union([Type.String(), Type.Null()]),
  first_name: Type.Optional(Type.String()),
  last_name: Type.Optional(Type.String()),
  network_distance: Type.Union([
    Type.Literal('DISTANCE_1'),
    Type.Literal('DISTANCE_2'),
    Type.Literal('DISTANCE_3'),
    Type.Literal('OUT_OF_NETWORK'),
  ]),
  location: Type.Union([Type.String(), Type.Null()]),
  industry: Type.Union([Type.String(), Type.Null()]),
  headline: Type.String(),
  connections_count: Type.Optional(Type.Number()),
  pending_invitation: Type.Optional(Type.Boolean()),
  can_send_inmail: Type.Optional(Type.Boolean()),
  recruiter_candidate_id: Type.Optional(Type.String()),
  premium: Type.Optional(Type.Boolean()),
  open_profile: Type.Optional(Type.Boolean()),
  shared_connections_count: Type.Optional(Type.Number()),
  last_outreach_activity: Type.Optional(
    Type.Object({
      type: Type.Union([Type.Literal('SEND_MESSAGE'), Type.Literal('ACCEPT_INVITATION')]),
      performed_at: Type.String(),
    }),
  ),
  current_positions: Type.Optional(
    Type.Array(
      Type.Object({
        company: Type.String(),
        company_id: Type.Union([Type.String(), Type.Null()]),
        description: Type.Union([Type.String(), Type.Null()]),
        role: Type.String(),
        location: Type.Union([Type.String(), Type.Null()]),
        tenure_at_role: Type.Optional(
          Type.Object({
            years: Type.Optional(Type.Number()),
            months: Type.Optional(Type.Number()),
          }),
        ),
        tenure_at_company: Type.Optional(
          Type.Object({
            years: Type.Optional(Type.Number()),
            months: Type.Optional(Type.Number()),
          }),
        ),
        start: Type.Optional(
          Type.Object({
            year: Type.Optional(Type.Number()),
            month: Type.Optional(Type.Number()),
          }),
        ),
        end: Type.Optional(
          Type.Object({
            year: Type.Optional(Type.Number()),
            month: Type.Optional(Type.Number()),
          }),
        ),
      }),
    ),
  ),
  education: Type.Optional(
    Type.Array(
      Type.Object({
        degree: Type.Union([Type.String(), Type.Null()]),
        school: Type.String(),
        school_id: Type.Union([Type.String(), Type.Null()]),
        start: Type.Object({
          year: Type.Optional(Type.Number()),
          month: Type.Optional(Type.Number()),
        }),
        end: Type.Optional(
          Type.Object({
            year: Type.Optional(Type.Number()),
            month: Type.Optional(Type.Number()),
          }),
        ),
      }),
    ),
  ),
  work_experience: Type.Optional(
    Type.Array(
      Type.Object({
        company: Type.String(),
        company_id: Type.Union([Type.String(), Type.Null()]),
        role: Type.String(),
        industry: Type.Union([Type.String(), Type.Null()]),
        start: Type.Object({
          year: Type.Optional(Type.Number()),
          month: Type.Optional(Type.Number()),
        }),
        end: Type.Optional(
          Type.Object({
            year: Type.Optional(Type.Number()),
            month: Type.Optional(Type.Number()),
          }),
        ),
      }),
    ),
  ),
});

export const LinkedinCompanySearchResultSchema = Type.Object({
  type: Type.Literal('COMPANY'),
  id: Type.String(),
  name: Type.String(),
  location: Type.Union([Type.String(), Type.Null()]),
  profile_url: Type.String(),
  industry: Type.String(),
  summary: Type.Union([Type.String(), Type.Null()]),
  followers_count: Type.Optional(Type.Number()),
  job_offers_count: Type.Optional(Type.Number()),
  headcount: Type.Optional(Type.String()),
});

export const LinkedinPostSearchResultSchema = Type.Composite([
  Type.Object({
    type: Type.Literal('POST'),
  }),
  PostSchema,
]);

export const LinkedinSearchResultSchema = Type.Union([
  LinkedinPeopleSearchResultSchema,
  LinkedinCompanySearchResultSchema,
  LinkedinPostSearchResultSchema,
]);

export type LinkedinSearchResult = Static<typeof LinkedinSearchResultSchema>;
