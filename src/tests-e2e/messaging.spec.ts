import { UnipileClient } from "../client.js";
import { config } from "./instance.config.js";

/**
 * @todo Consider https://github.com/Trendyol/jest-testcontainers presets.
 */
//------------------------------------------------------------------------------
describe("MessagingResource", () => {
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
  describe("getAllMessages", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated MessageList " +
        "on getAllMessages " +
        "when no arguments",
      async () => {
        const result = await client.messaging.getAllMessages();
        expect(result.object).toBe("MessageList");
      },
    );
    //--------------------------------------------------------------------------
    it(
      "should return next page of validated MessageList " +
        "on getAllMessages " +
        "when cursor",
      async () => {
        const result = await client.messaging.getAllMessages();
        expect(typeof result.cursor).toBe("string");
        const result2 = await client.messaging.getAllMessages({
          cursor: result.cursor ?? "should_not_be_reached_or_broken_test_setup",
        });
        expect(result2.object).toBe("MessageList");
        expect(result2.items[0].id).not.toBe(result.items[0].id);
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getAllChats", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated ChatList " +
        "on getAllChats " +
        "when no arguments",
      async () => {
        // try {
        const result = await client.messaging.getAllChats();
        expect(result.object).toBe("ChatList");
        // } catch (err) {
        //   console.log(err);
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getAllMessagesFromChat", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated ChatList " +
        "on getAllChats " +
        "when no arguments",
      async () => {
        // try {
        const chat = await client.messaging.getAllChats({ limit: 1 });
        const result = await client.messaging.getAllMessagesFromChat({
          chat_id: chat.items[0].id,
        });
        expect(result.object).toBe("MessageList");
        // } catch (err) {
        //   console.log(err);
        // }
      },
    );
  });
});
