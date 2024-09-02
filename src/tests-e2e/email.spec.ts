// import { AccountListResponseValidator } from "../accounts/accounts-list.schema.js";
import { UnipileClient } from "../client.js";
import { MailAttendee } from "../types/index.js";
import { config } from "./instance.config.js";

/** */
//------------------------------------------------------------------------------
describe("EmailResource", () => {
  let client: UnipileClient;
  //   beforeAll(async () => {});

  beforeEach(async () => {
    client = new UnipileClient(config.BASE_URL, config.ACCESS_TOKEN, {
      logRequestPayload: config.logRequestPayload,
      logRequestResult: config.logRequestResult,
      validateRequestPayload: false,
    });
  });

  //----------------------------------------------------------------------------
  describe("getAll", () => {
    //--------------------------------------------------------------------------
    it(
      "should return return a validated EmailList " +
        "on getAll " +
        "when account_id",
      async () => {
        try {
          const accounts = await client.account.getAll();
          //   accounts.items = [accounts.items[0]];
          //   console.log(
          //     ...AccountListResponseValidator.Errors(accounts),
          //     JSON.stringify(accounts.items[0], null, 2),
          //   );
          const account_id = accounts.items.filter(
            (acc) =>
              acc.type === "MAIL" ||
              acc.type === "EXCHANGE" ||
              acc.type === "GOOGLE_OAUTH" ||
              acc.type === "OUTLOOK" ||
              acc.type === "ICLOUD",
          )[0].id;

          const result = await client.email.getAll({ account_id });
          expect(result.object).toBe("EmailList");
        } catch (err) {
          console.log("err", err, JSON.stringify((err as any).body[0].value));
          throw err;
        }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getAllFolders", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated FolderList " +
        "on getAllFolders " +
        "when no arguments",
      async () => {
        // try {
        const result = await client.email.getAllFolders();
        expect(result.object).toBe("FolderList");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getOne", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated Email " + "on getOne " + "when mail Id",
      async () => {
        // try {

        const accounts = await client.account.getAll();
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) =>
            acc.type === "MAIL" ||
            acc.type === "EXCHANGE" ||
            acc.type === "GOOGLE_OAUTH" ||
            acc.type === "OUTLOOK" ||
            acc.type === "ICLOUD",
        )[0].id;

        const mail = await client.email.getAll({
          account_id,
          limit: 1,
        });
        expect(mail.object).toBe("EmailList");

        const result = await client.email.getOne(mail.items[0].id);
        expect(result.object).toBe("Email");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
    it(
      "should return a validated Email " + "on getOne.byId " + "when mail Id",
      async () => {
        // try {

        const accounts = await client.account.getAll();
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) =>
            acc.type === "MAIL" ||
            acc.type === "EXCHANGE" ||
            acc.type === "GOOGLE_OAUTH" ||
            acc.type === "OUTLOOK" ||
            acc.type === "ICLOUD",
        )[0].id;

        const mail = await client.email.getAll({
          account_id,
          limit: 1,
        });

        //missing query options (e.g. unread)
        const result = await client.email.getOne.byId({
          email_id: mail.items[0].id,
          account_id,
        });
        expect(result.object).toBe("Email");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
    it(
      "should return a validated Email " +
        "on getOne.byProviderId " +
        "when provider_id",
      async () => {
        // try {

        const accounts = await client.account.getAll();
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) =>
            acc.type === "MAIL" ||
            acc.type === "EXCHANGE" ||
            acc.type === "GOOGLE_OAUTH" ||
            acc.type === "OUTLOOK" ||
            acc.type === "ICLOUD",
        )[0].id;

        const mail = await client.email.getAll({
          account_id,
          limit: 1,
        });

        //missing query options (e.g. unread)
        const result = await client.email.getOne.byProviderId({
          email_provider_id: mail.items[0].id,
          account_id,
        });
        expect(result.object).toBe("Email");
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
      "should return a validated EmailDeleted " + "on delete " + "when mail Id",
      async () => {
        // try {

        const accounts = await client.account.getAll();
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) =>
            acc.type === "MAIL" ||
            acc.type === "EXCHANGE" ||
            acc.type === "GOOGLE_OAUTH" ||
            acc.type === "OUTLOOK" ||
            acc.type === "ICLOUD",
        )[0].id;

        const mail = await client.email.getAll({
          account_id,
          limit: 1,
        });

        const result = await client.email.delete(mail.items[0].id);
        expect(result.object).toBe("EmailDeleted");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
    //--------------------------------------------------------------------------
    it(
      "should return a validated EmailDeleted " +
        "on delete.byId " +
        "when mail Id",
      async () => {
        // try {

        const accounts = await client.account.getAll();
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) =>
            acc.type === "MAIL" ||
            acc.type === "EXCHANGE" ||
            acc.type === "GOOGLE_OAUTH" ||
            acc.type === "OUTLOOK" ||
            acc.type === "ICLOUD",
        )[0].id;

        const mail = await client.email.getAll({
          account_id,
          limit: 1,
        });

        const result = await client.email.delete.byId({
          email_id: mail.items[0].id,
          account_id,
        });
        expect(result.object).toBe("EmailDeleted");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
    //--------------------------------------------------------------------------
    it(
      "should return a validated EmailDeleted " +
        "on delete.byProviderId " +
        "when provider_id",
      async () => {
        // try {

        const accounts = await client.account.getAll();
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) =>
            acc.type === "MAIL" ||
            acc.type === "EXCHANGE" ||
            acc.type === "GOOGLE_OAUTH" ||
            acc.type === "OUTLOOK" ||
            acc.type === "ICLOUD",
        )[0].id;

        const mail = await client.email.getAll({
          account_id,
          limit: 1,
        });

        const result = await client.email.delete.byProviderId({
          email_provider_id: mail.items[0].id,
          account_id,
        });
        expect(result.object).toBe("EmailDeleted");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("update", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated EmailUpdated " + "on update " + "when mail Id",
      async () => {
        // try {

        const accounts = await client.account.getAll();
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) =>
            acc.type === "MAIL" ||
            acc.type === "EXCHANGE" ||
            acc.type === "GOOGLE_OAUTH" ||
            acc.type === "OUTLOOK" ||
            acc.type === "ICLOUD",
        )[0].id;

        const mail = await client.email.getAll({
          account_id,
          limit: 1,
        });

        //missing query options (e.g. unread)
        const result = await client.email.update(mail.items[0].id);
        expect(result.object).toBe("EmailUpdated");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
    //--------------------------------------------------------------------------
    it(
      "should return a validated EmailUpdated " +
        "on update.byId " +
        "when mail Id",
      async () => {
        // try {

        const accounts = await client.account.getAll();
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) =>
            acc.type === "MAIL" ||
            acc.type === "EXCHANGE" ||
            acc.type === "GOOGLE_OAUTH" ||
            acc.type === "OUTLOOK" ||
            acc.type === "ICLOUD",
        )[0].id;

        const mail = await client.email.getAll({
          account_id,
          limit: 1,
        });

        const result = await client.email.update.byId({
          email_id: mail.items[0].id,
          account_id,
        });
        expect(result.object).toBe("EmailUpdated");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
    //--------------------------------------------------------------------------
    it(
      "should return a validated EmailUpdated " +
        "on update.byProviderId " +
        "when provider_id ",
      async () => {
        // try {

        const accounts = await client.account.getAll();
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) =>
            acc.type === "MAIL" ||
            acc.type === "EXCHANGE" ||
            acc.type === "GOOGLE_OAUTH" ||
            acc.type === "OUTLOOK" ||
            acc.type === "ICLOUD",
        )[0].id;

        const mail = await client.email.getAll({
          account_id,
          limit: 1,
        });

        const result = await client.email.update.byProviderId({
          email_provider_id: mail.items[0].id,
          account_id,
        });
        expect(result.object).toBe("EmailUpdated");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getOneFolder", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated Folder " +
        "on getOneFolder " +
        "when folder Id",
      async () => {
        // try {

        const accounts = await client.account.getAll();
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) =>
            acc.type === "MAIL" ||
            acc.type === "EXCHANGE" ||
            acc.type === "GOOGLE_OAUTH" ||
            acc.type === "OUTLOOK" ||
            acc.type === "ICLOUD",
        )[0].id;

        const folders = await client.email.getAllFolders({
          account_id,
        });

        const result = await client.email.getOneFolder(folders.items[0].id);
        expect(result.object).toBe("Folder");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
    //--------------------------------------------------------------------------
    it(
      "should return a validated Folder " +
        "on getOneFolder.byId " +
        "when folder Id",
      async () => {
        // try {

        const accounts = await client.account.getAll();
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) =>
            acc.type === "MAIL" ||
            acc.type === "EXCHANGE" ||
            acc.type === "GOOGLE_OAUTH" ||
            acc.type === "OUTLOOK" ||
            acc.type === "ICLOUD",
        )[0].id;

        const folders = await client.email.getAllFolders({
          account_id,
        });

        const result = await client.email.getOneFolder.byId({
          folder_id: folders.items[0].id,
          account_id,
        });
        expect(result.object).toBe("Folder");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
    //--------------------------------------------------------------------------
    it(
      "should return a validated Folder " +
        "on getOneFolder.byProviderId " +
        "when folder_provider_id",
      async () => {
        // try {

        const accounts = await client.account.getAll();
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) =>
            acc.type === "MAIL" ||
            acc.type === "EXCHANGE" ||
            acc.type === "GOOGLE_OAUTH" ||
            acc.type === "OUTLOOK" ||
            acc.type === "ICLOUD",
        )[0].id;

        const folders = await client.email.getAllFolders({
          account_id,
        });

        const result = await client.email.getOneFolder.byProviderId({
          folder_provider_id: folders.items[0].id,
          account_id,
        });
        expect(result.object).toBe("Folder");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("getEmailAttachment", () => {
    //--------------------------------------------------------------------------
    it(
      "should return a validated Email Attachment " +
        "on getEmailAttachment " +
        "when mail Id " +
        "and attachment Id",
      async () => {
        // try {
        const result = await client.email.getEmailAttachment({
          email_id: config.MAIL_ATTACHMENT_MAIL_ID,
          attachment_id: config.MAIL_ATTACHMENT_ATTACHMENT_ID,
        });
        expect(result.constructor.name).toBe("Blob");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
      10000,
    );
    //--------------------------------------------------------------------------
    it(
      "should return a validated Email Attachment " +
        "on getEmailAttachment.byId " +
        "when mail Id " +
        "and attachment Id",
      async () => {
        // try {
        const result = await client.email.getEmailAttachment.byId({
          email_id: config.MAIL_ATTACHMENT_MAIL_ID,
          attachment_id: config.MAIL_ATTACHMENT_ATTACHMENT_ID,
        });
        expect(result.constructor.name).toBe("Blob");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
    //--------------------------------------------------------------------------
    it.only(
      "should return a validated Email Attachment " +
        "on getEmailAttachment.byProviderId " +
        "when provider_id " +
        "and attachment Id",
      async () => {
        // try {

        const result = await client.email.getEmailAttachment.byProviderId({
          account_id: config.MAIL_ATTACHMENT_ACCOUNT_ID,
          email_provider_id: config.MAIL_ATTACHMENT_MAIL_PROVIDER_ID,
          attachment_id: config.MAIL_ATTACHMENT_ATTACHMENT_ID,
        });
        expect(result.constructor.name).toBe("Blob");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });
  //----------------------------------------------------------------------------
  describe("send", () => {
    //--------------------------------------------------------------------------
    it.skip(
      "should send a validated EmailSent " +
        "on send " +
        "when minimal options",
      async () => {
        // try {

        const accounts = await client.account.getAll();
        //   accounts.items = [accounts.items[0]];
        //   console.log(
        //     ...AccountListResponseValidator.Errors(accounts),
        //     JSON.stringify(accounts.items[0], null, 2),
        //   );
        const account_id = accounts.items.filter(
          (acc) =>
            acc.type === "MAIL" ||
            acc.type === "EXCHANGE" ||
            acc.type === "GOOGLE_OAUTH" ||
            acc.type === "OUTLOOK" ||
            acc.type === "ICLOUD",
        )[0].id;

        const to: MailAttendee[] = [{ identifier: "testunipile@gmail.com" }];
        const result = await client.email.send({
          account_id,
          body: "send a mail",
          to,
        });

        expect(result.object).toBe("EmailSent");
        // } catch (err) {
        //   console.log(err);
        //   throw err;
        // }
      },
    );
  });

  //----------------------------------------------------------------------------
});
