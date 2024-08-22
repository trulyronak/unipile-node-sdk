import { UnipileClient } from "../client.js";
import { config } from "./instance.config.js";

/** */
//------------------------------------------------------------------------------
describe("AccountResource", () => {
  let client: UnipileClient;
  //   beforeAll(async () => {});
  beforeEach(() => {
    client = new UnipileClient(config.BASE_URL, config.ACCESS_TOKEN, {
      logRequestPayload: config.logRequestPayload,
      logRequestResult: config.logRequestResult,
      validateRequestPayload: true,
    });
  });

  //----------------------------------------------------------------------------
  describe("getAll", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated AccountList " +
        "on getAll " +
        "when no arguments",
      async () => {
        const result = await client.account.getAll();
        expect(result.object).toBe("AccountList");
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getOne", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated Account " + "on getOne " + "when no arguments",
      async () => {
        // try {
        const result = await client.account.getAll();
        const account_id = result.items[0].id;
        expect(typeof account_id).toBe("string");
        const result1 = await client.account.getOne(account_id);
        expect(result1.object).toBe("Account");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("connect", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated AccountCreated response " +
        "on connect " +
        "when no checkpoint",
      async () => {
        // try {
        const result = await client.account.connect({
          provider: "MAIL",
          username: config.MAIL_USERNAME,
          password: config.MAIL_PASSWORD,
        });
        expect(result.object).toBe("AccountCreated");

        /**
         * @todo Figure out a way to either guarantee correct clean up or simply
         *       the target test instance in a known state, like a container
         *       image.
         */
        const resultDelete = await client.account.delete(result.account_id);
        expect(resultDelete.object).toBe("AccountDeleted");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("reconnect", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated AccountReconnected response " +
        "on reconnect " +
        "when no checkpoint",
      async () => {
        // try {
        const result = await client.account.connect({
          provider: "MAIL",
          username: config.MAIL_USERNAME,
          password: config.MAIL_PASSWORD,
        });
        expect(result.object).toBe("AccountCreated");

        const resultReconnect = await client.account.reconnect({
          account_id: result.account_id,
          provider: "MAIL",
          username: config.MAIL_USERNAME,
          password: config.MAIL_PASSWORD,
        });
        expect(resultReconnect.object).toBe("AccountReconnected");

        /**
         * @todo Figure out a way to either guarantee correct clean up or simply
         *       the target test instance in a known state, like a container
         *       image.
         */
        const resultDelete = await client.account.delete(result.account_id);
        expect(resultDelete.object).toBe("AccountDeleted");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("connectLinkedin", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated AccountCreated or Checkpoint response " +
        "on connectLinkedin " +
        "when ",
      async () => {
        // try {
        const result = await client.account.connectLinkedin({
          username: config.LINKEDIN_USERNAME,
          password: config.LINKEDIN_PASSWORD,
        });
        expect(
          result.object === "AccountCreated" || result.object === "Checkpoint",
        ).toBe(true);

        if (result.object === "AccountCreated") {
          /**
           * @todo Figure out a way to either guarantee correct clean up or simply
           *       the target test instance in a known state, like a container
           *       image.
           */
          const resultDelete = await client.account.delete(result.account_id);
          expect(resultDelete.object).toBe("AccountDeleted");
        } else {
          /**
           * @todo Ask what kind of cleanup is needed on Checkpoint.
           */
        }
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("connectLinkedinWithCookie", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated AccountCreated or Checkpoint response " +
        "on connectLinkedinWithCookie " +
        "when ",
      async () => {
        // try {
        const result = await client.account.connectLinkedinWithCookie({
          access_token: config.LINKEDIN_ACCESS_TOKEN,
          user_agent: config.LINKEDIN_USER_AGENT,
        });

        expect(
          result.object === "AccountCreated" || result.object === "Checkpoint",
        ).toBe(true);

        if (result.object === "AccountCreated") {
          /**
           * @todo Figure out a way to either guarantee correct clean up or simply
           *       the target test instance in a known state, like a container
           *       image.
           */
          const resultDelete = await client.account.delete(result.account_id);
          expect(resultDelete.object).toBe("AccountDeleted");
        } else {
          /**
           * @todo Ask what kind of cleanup is needed on Checkpoint.
           */
        }
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("reconnectLinkedin", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated AccountReconnected or Checkpoint response  " +
        "on reconnectLinkedin " +
        "when ",
      async () => {
        // try {
        /**
         * @note This one requires a pre-existing Account.
         *
         * @todo Consider using a container image ?
         */
        const result = await client.account.reconnectLinkedin({
          account_id: config.LINKEDIN_RECONNECT_BASIC_ACCOUNT_ID,
          username: config.LINKEDIN_RECONNECT_BASIC_USERNAME,
          password: config.LINKEDIN_RECONNECT_BASIC_PASSWORD,
        });
        expect(
          result.object === "AccountReconnected" ||
            result.object === "Checkpoint",
        ).toBe(true);
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("reconnectLinkedinWithCookie", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated AccountReconnected or Checkpoint response  " +
        "on reconnectLinkedinWithCookie " +
        "when ",
      async () => {
        // try {
        /**
         * @note This one requires a pre-existing Account.
         *
         * @todo Consider using a container image ?
         */
        const result = await client.account.reconnectLinkedinWithCookie({
          account_id: config.LINKEDIN_RECONNECT_COOKIE_ACCOUNT_ID,
          access_token: config.LINKEDIN_RECONNECT_COOKIE_ACCESS_TOKEN,
          user_agent: config.LINKEDIN_RECONNECT_COOKIE_USER_AGENT,
        });
        expect(
          result.object === "AccountReconnected" ||
            result.object === "Checkpoint",
        ).toBe(true);
      },
    );
  });

  //----------------------------------------------------------------------------
  describe("connectInstagram", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated AccountCreated or Checkpoint response " +
        "on connectInstagram " +
        "when ",
      async () => {
        // try {
        const result = await client.account.connectInstagram({
          username: config.INSTAGRAM_USERNAME,
          password: config.INSTAGRAM_PASSWORD,
        });
        expect(
          result.object === "AccountCreated" || result.object === "Checkpoint",
        ).toBe(true);

        if (result.object === "AccountCreated") {
          /**
           * @todo Figure out a way to either guarantee correct clean up or simply
           *       the target test instance in a known state, like a container
           *       image.
           */
          const resultDelete = await client.account.delete(result.account_id);
          expect(resultDelete.object).toBe("AccountDeleted");
        } else {
          /**
           * @todo Ask what kind of cleanup is needed on Checkpoint.
           */
        }
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("reconnectInstagram", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated AccountReconnected or Checkpoint response  " +
        "on reconnectInstagram " +
        "when ",
      async () => {
        // try {
        /**
         * @note This one requires a pre-existing Account.
         *
         * @todo Consider using a container image ?
         */
        const result = await client.account.reconnectInstagram({
          account_id: config.INSTAGRAM_RECONNECT_ACCOUNT_ID,
          username: config.INSTAGRAM_RECONNECT_USERNAME,
          password: config.INSTAGRAM_RECONNECT_PASSWORD,
        });
        expect(
          result.object === "AccountReconnected" ||
            result.object === "Checkpoint",
        ).toBe(true);
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("connectTwitter", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated AccountCreated or Checkpoint response " +
        "on connectTwitter " +
        "when ",
      async () => {
        // try {
        const result = await client.account.connectTwitter({
          username: config.TWITTER_USERNAME,
          password: config.TWITTER_PASSWORD,
        });
        expect(
          result.object === "AccountCreated" || result.object === "Checkpoint",
        ).toBe(true);

        if (result.object === "AccountCreated") {
          /**
           * @todo Figure out a way to either guarantee correct clean up or simply
           *       the target test instance in a known state, like a container
           *       image.
           */
          const resultDelete = await client.account.delete(result.account_id);
          expect(resultDelete.object).toBe("AccountDeleted");
        } else {
          /**
           * @todo Ask what kind of cleanup is needed on Checkpoint.
           */
        }
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("reconnectTwitter", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated AccountReconnected or Checkpoint response  " +
        "on reconnectTwitter " +
        "when ",
      async () => {
        // try {
        /**
         * @note This one requires a pre-existing Account.
         *
         * @todo Consider using a container image ?
         */
        const result = await client.account.reconnectTwitter({
          account_id: config.TWITTER_RECONNECT_ACCOUNT_ID,
          username: config.TWITTER_RECONNECT_USERNAME,
          password: config.TWITTER_RECONNECT_PASSWORD,
        });
        expect(
          result.object === "AccountReconnected" ||
            result.object === "Checkpoint",
        ).toBe(true);
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("connectMessenger", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated AccountCreated or Checkpoint response " +
        "on connectMessenger " +
        "when ",
      async () => {
        // try {
        const result = await client.account.connectMessenger({
          username: config.MESSENGER_USERNAME,
          password: config.MESSENGER_PASSWORD,
        });
        expect(
          result.object === "AccountCreated" || result.object === "Checkpoint",
        ).toBe(true);

        if (result.object === "AccountCreated") {
          /**
           * @todo Figure out a way to either guarantee correct clean up or simply
           *       the target test instance in a known state, like a container
           *       image.
           */
          const resultDelete = await client.account.delete(result.account_id);
          expect(resultDelete.object).toBe("AccountDeleted");
        } else {
          /**
           * @todo Ask what kind of cleanup is needed on Checkpoint.
           */
        }
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("reconnectMessenger", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated AccountReconnected or Checkpoint response  " +
        "on reconnectMessenger " +
        "when ",
      async () => {
        // try {
        /**
         * @note This one requires a pre-existing Account.
         *
         * @todo Consider using a container image ?
         */
        const result = await client.account.reconnectMessenger({
          account_id: config.MESSENGER_RECONNECT_ACCOUNT_ID,
          username: config.MESSENGER_RECONNECT_USERNAME,
          password: config.MESSENGER_RECONNECT_PASSWORD,
        });
        expect(
          result.object === "AccountReconnected" ||
            result.object === "Checkpoint",
        ).toBe(true);
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("delete", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated AccountDeleted response " +
        "on delete " +
        "when ",
      async () => {
        // try {
        const result = await client.account.connect({
          provider: "MAIL",
          username: config.MAIL_USERNAME,
          password: config.MAIL_PASSWORD,
        });
        expect(result.object).toBe("AccountCreated");

        /**
         * @todo Figure out a way to either guarantee correct clean up or simply
         *       the target test instance in a known state, like a container
         *       image.
         */
        const resultDelete = await client.account.delete(result.account_id);
        expect(resultDelete.object).toBe("AccountDeleted");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("solveCodeCheckpoint", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated AccountCreated, AccountReconnected or Checkpoint response " +
        "on solveCodeCheckpoint " +
        "when ",
      async () => {
        // try {
        /**
         * @todo Figure out how we can guarantee a scenario where a checkpoint
         *       returned ?
         *       If there's no way, how about a dedicated account_id hardcoded
         *       in headless API to mock a response for this scenario ?
         *       No test at all ?
         */
        const result = await client.account.solveCodeCheckpoint({
          provider: "LINKEDIN",
          account_id: config.LINKEDIN_CHECKPOINT_ACCOUNT_ID,
          code: config.LINKEDIN_CHECKPOINT_CODE,
        });
        expect(result.object).toBe("AccountCreated");

        /**
         * @todo Figure out a way to either guarantee correct clean up or simply
         *       the target test instance in a known state, like a container
         *       image.
         */
        const resultDelete = await client.account.delete(result.account_id);
        expect(resultDelete.object).toBe("AccountDeleted");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("createHostedAuthLink", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated HostedAuthUrl response " +
        "on createHostedAuthLink " +
        "when ",
      async () => {
        // try {
        const result = await client.account.createHostedAuthLink({
          name: "Hosted Authentication",
          type: "create",
          api_url: "http://localhost:3114",
          providers: ["LINKEDIN"],
          success_redirect_url: "https://www.google.com/",
          failure_redirect_url: "https://www.google.com/",
          expiresOn: "2055-12-31T23:59:59.999Z",
        });
        expect(result.object).toBe("HostedAuthUrl");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
});
