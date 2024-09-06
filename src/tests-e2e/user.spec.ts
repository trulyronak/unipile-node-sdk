import { UnipileClient } from "../client.js";
import { config } from "./instance.config.js";

/** */
//------------------------------------------------------------------------------
describe("UserResource", () => {
  let client: UnipileClient;
  //   beforeAll(async () => {});

  beforeEach(async () => {
    client = new UnipileClient(config.BASE_URL, config.ACCESS_TOKEN, {
      logRequestPayload: config.logRequestPayload,
      logRequestResult: config.logRequestResult,
      validateRequestPayload: true,
      validateRequestPayloadLevel: "error",
    });
  });

  //----------------------------------------------------------------------------
  describe("getProfile", () => {
    //--------------------------------------------------------------------------
    it(
      "should return UserProfile for any account provider" +
        "on getProfile " +
        "when identifier",
      async () => {
        try {
          const accounts = await client.account.getAll({ limit: 1 });
          //   accounts.items = [accounts.items[0]];
          //   console.log(
          //     ...AccountListResponseValidator.Errors(accounts),
          //     JSON.stringify(accounts.items[0], null, 2),
          //   );
          const account_id = accounts.items[0].id;

          const attendees = await client.messaging.getAllAttendees({
            account_id,
          });
          const identifier = attendees.items[0].provider_id;

          const result = await client.users.getProfile({
            account_id,
            identifier,
          });

          expect(result.object).toBe("UserProfile");
        } catch (err) {
          console.log("err", err);
          throw err;
        }
      },
    );
    it(
      "should return a validated UserProfile " +
        "on getProfile " +
        "when linkedIn account id " +
        "and linkedIn options",
      async () => {
        // try {
        const accounts = await client.account.getAll();
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) => acc.type === "LINKEDIN",
        )[0].id;

        const attendees = await client.messaging.getAllAttendees({
          account_id,
        });
        const identifier = attendees.items[0].provider_id;

        const result = await client.users.getProfile({
          account_id,
          identifier,
          linkedin_sections: "*",
          // notify: true, //option to add cf branch feat/2780
        });

        expect(result.object).toBe("UserProfile");
        expect(result.provider).toBe("LINKEDIN");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getOwnProfile", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated AccountOwnerProfile " +
        "on getOwnProfile " +
        "when linkedIn account Id",
      async () => {
        // try {
        const accounts = await client.account.getAll({ limit: 1 });
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items[0].id;

        const result = await client.users.getOwnProfile(account_id);
        expect(result.object).toBe("AccountOwnerProfile");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("sendInvitation", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated UserInvitationSent " +
        "on sendInvitation " +
        "when linkedIn account id " +
        "and message",
      async () => {
        // try {
        const accounts = await client.account.getAll();
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) => acc.type === "LINKEDIN",
        )[0].id;

        // Search provider id of someone you have in relations or not to send invitation
        const accountTestProviderId = "ACoAAFET2tcBxW3tSw1OyASzEO8SO5T8Bk8a3Wg";
        const result = await client.users.sendInvitation({
          account_id,
          provider_id: accountTestProviderId,
          message: "test send invitation",
        });

        expect(result.object).toBe("UserInvitationSent");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getAllInvitationsSent", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated InvitationList " +
        "on getAllInvitationsSent " +
        "when linkedIn account Id",
      async () => {
        // try {
        const accounts = await client.account.getAll({ limit: 1 });
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) => acc.type === "LINKEDIN",
        )[0].id;

        const result = await client.users.getAllInvitationsSent({ account_id });
        // console.log(JSON.stringify(result, null, 2));
        expect(result.object).toBe("InvitationList");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("cancelInvitationSent", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated InvitationCanceled " +
        "on cancelInvitationSent " +
        "when linkedIn account Id " +
        "and invitation Id",
      async () => {
        // try {
        const accounts = await client.account.getAll({ limit: 1 });
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) => acc.type === "LINKEDIN",
        )[0].id;

        const invitation_id = (
          await client.users.getAllInvitationsSent({ account_id })
        ).items[0].id;

        const result = await client.users.cancelInvitationSent({
          account_id,
          invitation_id,
        });
        expect(result.object).toBe("InvitationCanceled");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getAllPosts", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated PostList " +
        "on getAllPosts " +
        "when linkedIn account Id " +
        "and identifier",
      async () => {
        // try {
        const accounts = await client.account.getAll({ limit: 1 });
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) => acc.type === "LINKEDIN",
        )[0].id;

        const attendees = await client.messaging.getAllAttendees({
          account_id,
        });
        const identifier = attendees.items[0].provider_id;

        const result = await client.users.getAllPosts({
          account_id,
          identifier,
        });
        expect(result.object).toBe("PostList");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getPost", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated Post " +
        "on getPost " +
        "when linkedIn account Id " +
        "and post Id",
      async () => {
        // try {
        const accounts = await client.account.getAll({ limit: 1 });
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) => acc.type === "LINKEDIN",
        )[0].id;

        const attendees = await client.messaging.getAllAttendees({
          account_id,
        });
        const identifier = attendees.items[0].provider_id;

        const posts = await client.users.getAllPosts({
          account_id,
          identifier,
        });
        // console.log(JSON.stringify(posts, null, 2));
        const post_id = posts.items[0].id;

        const result = await client.users.getPost({ account_id, post_id });

        expect(result.object).toBe("Post");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("sendPostComment", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated CommentSent " +
        "on sendPostComment " +
        "when linkedIn account Id, post Id" +
        "and comment",
      async () => {
        // try {
        const accounts = await client.account.getAll({ limit: 1 });
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) => acc.type === "LINKEDIN",
        )[0].id;

        const attendees = await client.messaging.getAllAttendees({
          account_id,
        });
        const identifier = attendees.items[0].provider_id;

        const posts = await client.users.getAllPosts({
          account_id,
          identifier,
        });
        const post_id = posts.items[0].id;

        const result = await client.users.sendPostComment({
          account_id,
          post_id,
          text: "comment",
        });
        expect(result.object).toBe("CommentSent");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("createPost", () => {
    //--------------------------------------------------------------------------
    it.skip(
      "should return a validated PostCreated " +
        "on createPost " +
        "when linkedIn account Id" +
        "and content",
      async () => {
        // try {
        const accounts = await client.account.getAll({ limit: 1 });
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) => acc.type === "LINKEDIN",
        )[0].id;

        const result = await client.users.createPost({
          account_id,
          text: "post content",
        });
        expect(result.object).toBe("PostCreated");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getAllPostComments", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated CommentList " +
        "on getAllPostComments " +
        "when linkedIn account Id" +
        "and post Id",
      async () => {
        // try {
        const accounts = await client.account.getAll({ limit: 1 });
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) => acc.type === "LINKEDIN",
        )[0].id;

        const attendees = await client.messaging.getAllAttendees({
          account_id,
        });
        const identifier = attendees.items[0].provider_id;

        const posts = await client.users.getAllPosts({
          account_id,
          identifier,
        });
        const post_id = posts.items[0].id;

        const result = await client.users.getAllPostComments({
          account_id,
          post_id,
        });
        console.log(JSON.stringify(result, null, 2));
        expect(result.object).toBe("CommentList");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("sendPostReaction", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated ReactionAdded " +
        "on sendPostReaction " +
        "when linkedIn account Id, post Id" +
        "and reaction",
      async () => {
        // try {
        const accounts = await client.account.getAll({ limit: 1 });
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) => acc.type === "LINKEDIN",
        )[0].id;

        const attendees = await client.messaging.getAllAttendees({
          account_id,
        });
        const identifier = attendees.items[0].provider_id;

        const posts = await client.users.getAllPosts({
          account_id,
          identifier,
        });
        const post_id = posts.items[0].id;

        const result = await client.users.sendPostReaction({
          account_id,
          post_id,
          reaction_type: "like",
        });
        expect(result.object).toBe("ReactionAdded");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getAllRelations", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated UserRelationsList " +
        "on getAllRelations " +
        "when linkedIn account Id",
      async () => {
        // try {
        const accounts = await client.account.getAll({ limit: 1 });
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) => acc.type === "LINKEDIN",
        )[0].id;

        const result = await client.users.getAllRelations({
          account_id,
        });
        expect(result.object).toBe("UserRelationsList");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getCompanyProfile", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated CompanyProfile " +
        "on getCompanyProfile " +
        "when linkedIn account Id" +
        "and company name",
      async () => {
        // try {
        const accounts = await client.account.getAll({ limit: 1 });
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) => acc.type === "LINKEDIN",
        )[0].id;

        const result = await client.users.getCompanyProfile({
          account_id,
          identifier: "Unipile",
        });

        // console.log(JSON.stringify(result, null, 2));
        expect(result.object).toBe("CompanyProfile");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
});
