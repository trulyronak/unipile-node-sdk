import { UnipileClient } from "../client.js";
import { config } from "./instance.config.js";

/** */
//------------------------------------------------------------------------------
describe("WebhookResource", () => {
  let client: UnipileClient;
  //   beforeAll(async () => {});
  beforeEach(() => {
    client = new UnipileClient(config.BASE_URL, config.ACCESS_TOKEN, {
      logRequestPayload: true,
      logRequestResult: config.logRequestResult,
      validateRequestPayload: true,
    });
  });

  //----------------------------------------------------------------------------
  describe("getAll", () => {
    //--------------------------------------------------------------------------
    it.only(
      "should return a validated WebhookList " +
        "on getAll " +
        "when no arguments",
      async () => {
        // try {
        const result = await client.webhook.getAll();
        // console.log(JSON.stringify(result, null, 2));
        expect(result.object).toBe("WebhookList");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("create", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated WebhookCreated " + "on create " + "when ",
      async () => {
        // try {
        const resultCreate = await client.webhook.create({
          request_url: "https://www.rpdr.com/werk",
          name: "test_wh",
          format: "json",
          enabled: false,
          source: "messaging",
        });
        expect(resultCreate.object).toBe("WebhookCreated");

        // console.log(resultCreate);
        const resultDelete = await client.webhook.delete(
          resultCreate.webhook_id,
        );
        expect(resultDelete.object).toBe("WebhookDeleted");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("delete", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated WebhookDeleted " + "on delete " + "when  ",
      async () => {
        // try {
        const resultCreate = await client.webhook.create({
          request_url: "https://www.rpdr.com/werk",
          name: "test_wh",
          format: "json",
          //   enabled: true,
          source: "messaging",
        });
        expect(resultCreate.object).toBe("WebhookCreated");
        const result = await client.webhook.delete(resultCreate.webhook_id);
        expect(result.object).toBe("WebhookDeleted");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
});
