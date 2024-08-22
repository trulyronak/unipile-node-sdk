import { AccountListResponseValidator } from "../accounts/accounts-list.schema.js";
import { UnipileClient } from "../client.js";
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
    it.only(
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
          console.log("err", err, JSON.stringify(err.body[0].value));
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
  });
});
