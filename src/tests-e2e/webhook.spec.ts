import { UnipileClient } from "../client.js";
import { config } from "./instance.config.js";

/** */
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
        //   throw err;
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
        //   throw err;
        // }
      },
    );
  });
});
