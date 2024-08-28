import { UnipileClient } from "../client.js";
import { config } from "./instance.config.js";
import fs from "fs/promises";
import path from "path";
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
  describe("getAllChats", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated ChatList " +
        "on getAllChats " +
        "when no arguments",
      async () => {
        // try {
        const result = await client.messaging.getAllChats({ limit: 8 });
        expect(result.object).toBe("ChatList");
        // } catch (err) {
        //   console.log("err", err, JSON.stringify(err.body[0].value));
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getChat", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated Chat " + "on getChat " + "when no arguments",
      async () => {
        // try {
        const chat = await client.messaging.getAllChats({ limit: 1 });
        const resultGetChat = await client.messaging.getChat(chat.items[0].id);
        expect(resultGetChat.object).toBe("Chat");
        // } catch (err) {
        //   console.log("err", err, JSON.stringify(err.body[0].value));
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
        //   console.log("err", err, JSON.stringify(err.body[0].value));
        //   throw err;
        // }
      },
    );
  });

  //----------------------------------------------------------------------------
  describe("sendMessage", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated MessageSent response " +
        "on sendMessage " +
        "when ",
      async () => {
        // try {
        const chat = await client.messaging.getAllChats({ limit: 1 });
        const resultSend = await client.messaging.sendMessage({
          chat_id: chat.items[0].id,
          //   text: "messaging.spec.ts sendMessage",
          text: "All T, all shade.",
        });
        expect(resultSend.object).toBe("MessageSent");
        // } catch (err) {
        //   console.log("err", err, JSON.stringify(err.body[0].value));
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("startNewChat", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated ChatStarted response " +
        "on startNewChat " +
        "when ",
      async () => {
        // try {
        const account = await client.account.getAll({ limit: 2 });
        const account_id = account.items[0].id;
        const attendee = (
          await client.messaging.getAllAttendees({
            account_id,
            limit: 3,
          })
        ).items.find((att) => att.is_self !== 1);
        expect(attendee).toBeDefined();

        const result = await client.messaging.startNewChat({
          account_id,
          //   attendees_ids: ["ACoAAAcDMMQBODyLwZrRcgYhrkCafURGqva0U4E"],
          attendees_ids: [
            attendee?.provider_id ?? "expected an attendee_provider_id",
          ],
          //   text: "messaging.spec.ts startNewChat",
          text: "extravaganza",
        });
        expect(result.object).toBe("ChatStarted");
        // } catch (err) {
        // console.log("err", err, JSON.stringify(err.body[0].value));
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getAllAttendeesFromChat", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated ChatAttendeeList " +
        "on getAllAttendeesFromChat " +
        "when ",
      async () => {
        // try {
        const chat = await client.messaging.getAllChats({ limit: 1 });
        const resultAttendees = await client.messaging.getAllAttendeesFromChat(
          chat.items[0].id,
        );

        expect(resultAttendees.object).toBe("ChatAttendeeList");
        // } catch (err) {
        //   console.log("err", err, JSON.stringify(err.body[0].value));
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getMessage", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated Message " + "on getMessage " + "when ",
      async () => {
        // try {
        const message = await client.messaging.getAllMessages({ limit: 1 });
        const resultGetMessage = await client.messaging.getMessage(
          message.items[0].id,
        );

        expect(resultGetMessage.object).toBe("Message");
        // } catch (err) {
        //   console.log("err", err, JSON.stringify(err.body[0].value));
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getAllMessages", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated MessageList " +
        "on getAllMessages " +
        "when no arguments",
      async () => {
        // try {
        const result = await client.messaging.getAllMessages();
        expect(result.object).toBe("MessageList");
        // } catch (err) {
        //   console.log("err", err, JSON.stringify(err.body[0].value));
        //   throw err;
        // }
      },
    );
  });

  //----------------------------------------------------------------------------
  describe("getAllMessagesFromAttendee", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated MessageList " +
        "on getAllMessagesFromAttendee " +
        "when ",
      async () => {
        // try {
        const account = await client.account.getAll({ limit: 1 });
        const account_id = account.items[0].id;
        const attendee = await client.messaging.getAllAttendees({
          account_id,
          limit: 1,
        });
        const result = await client.messaging.getAllMessagesFromAttendee({
          attendee_id: attendee.items[0].id,
        });
        expect(result.object).toBe("MessageList");
        // } catch (err) {
        //   console.log("err", err, JSON.stringify(err.body[0].value));
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getAllChatsFromAttendee", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated MessageList " +
        "on getAllChatsFromAttendee " +
        "when ",
      async () => {
        // try {
        const account = await client.account.getAll({ limit: 1 });
        const account_id = account.items[0].id;
        const attendee = await client.messaging.getAllAttendees({
          account_id,
          limit: 1,
        });
        const result = await client.messaging.getAllMessagesFromAttendee({
          attendee_id: attendee.items[0].id,
        });
        expect(result.object).toBe("MessageList");
        // } catch (err) {
        //   console.log("err", err, JSON.stringify(err.body[0].value));
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getMessageAttachment", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a Blob " + "on getMessageAttachment " + "when ",
      async () => {
        // try {
        const filepath = path.resolve(__dirname, "./getMessageAttachment.png");
        console.log(filepath);
        const fileBuffer = await fs.readFile(filepath);
        // console.log(fileBuffer);
        const chat = await client.messaging.getAllChats({ limit: 1 });
        const resultSend = await client.messaging.sendMessage({
          chat_id: chat.items[0].id,
          //   text: "messaging.spec.ts getMessageAttachment",
          text: "eleganza",
          attachments: [["getMessageAttachment.png", fileBuffer]],
        });
        expect(resultSend.object).toBe("MessageSent");
        expect(typeof resultSend.message_id).toBe("string");

        /**
         * @todo Find another way to guarantee a message with an attachment exists.
         *       Sending one and waiting for it to be synced is very flaky.
         */
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const message = await client.messaging.getMessage(
          resultSend.message_id ?? "expected a message_id",
        );

        const result = await client.messaging.getMessageAttachment({
          message_id: message.id,
          attachment_id: message.attachments[0].id,
        });
        // expect(result).toBeInstanceOf(Blob);
        expect(result.constructor.name).toBe("Blob");
        // } catch (err) {
        //   console.log("err", err, JSON.stringify(err.body[0].value));
        //   throw err;
        // }
      },
      10000,
    );
  });
  //----------------------------------------------------------------------------
  describe("getAllAttendees", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated ChatAttendeeList " +
        "on getAllAttendees " +
        "when ",
      async () => {
        // try {
        const account = await client.account.getAll({ limit: 1 });
        const account_id = account.items[0].id;
        const result = await client.messaging.getAllAttendees({
          account_id,
        });
        expect(result.object).toBe("ChatAttendeeList");
        // } catch (err) {
        //   console.log("err", err, JSON.stringify(err.body[0].value));
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getAttendee", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated ChatAttendee " + "on getAttendee " + "when ",
      async () => {
        // try {
        const account = await client.account.getAll({ limit: 1 });
        const account_id = account.items[0].id;
        const attendee = await client.messaging.getAllAttendees({
          account_id,
        });
        const result = await client.messaging.getAttendee(attendee.items[0].id);
        expect(result.object).toBe("ChatAttendee");
        // } catch (err) {
        //   console.log("err", err, JSON.stringify(err.body[0].value));
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("setChatStatus", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated ChatPatched response " +
        "on setChatStatus " +
        "when ",
      async () => {
        // try {
        const chat = await client.messaging.getAllChats({ limit: 1 });
        const result = await client.messaging.setChatStatus({
          chat_id: chat.items[0].id,
          action: "setReadStatus",
          value: true,
        });
        expect(result.object).toBe("ChatPatched");
        // } catch (err) {
        //   console.log("err", err, JSON.stringify(err.body[0].value));
        //   throw err;
        // }
      },
    );
  });
});
