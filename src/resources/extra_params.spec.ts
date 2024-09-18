// import { AccountListResponseValidator } from "../accounts/accounts-list.schema.js";
import { UnipileClient } from '../client.js';
import { enableFetchMocks } from 'jest-fetch-mock';
import fetchMock from 'jest-fetch-mock';
/** */
//------------------------------------------------------------------------------
describe('extra_params', () => {
  let client: UnipileClient;

  const BASE_URL = 'http://test';
  const API_URL = BASE_URL + '/api/v1/';

  beforeAll(async () => {
    enableFetchMocks();
  });

  beforeEach(async () => {
    client = new UnipileClient(BASE_URL, 'ACCESS_TOKEN', {
      logRequestPayload: false,
      logRequestResult: false,
      validateRequestPayload: false,
      //   validateRequestPayloadLevel: 'error',
    });

    fetchMock.resetMocks();
    fetchMock.mockResponse(async (req) => ({
      body: JSON.stringify({ url: req.url }),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    }));
  });

  //----------------------------------------------------------------------------
  describe('GET', () => {
    //--------------------------------------------------------------------------
    it('should inject extra_params as query string ' + 'on GET ' + 'when no input params', async () => {
      const r = await client.account.getOne('some_account_id', { extra_params: { xtra: 'test' } });
      //   console.log(r);
      expect((r as any).url).toBe(API_URL + 'accounts/some_account_id?xtra=test');
    });
    //--------------------------------------------------------------------------
    it(
      'should inject extra_params as query string ' +
        'and not overwrite input params ' +
        'on GET ' +
        'when mixed with input params',
      async () => {
        const r = await client.account.getAll({ limit: 30 }, { extra_params: { limit: 'garbage', legit: 'test' } });
        //   console.log(r);
        expect((r as any).url).toBe(API_URL + 'accounts?limit=30&legit=test');
      },
    );
  });
  //----------------------------------------------------------------------------
  describe('POST | PUT', () => {
    //--------------------------------------------------------------------------
    it.skip('should inject extra_params in body ' + 'on POST ' + 'when no input params', async () => {});
    //--------------------------------------------------------------------------
    it(
      'should inject extra_params in body ' +
        'and not overwrite input params ' +
        'on POST ' +
        'when body Content-Type is application/json ' +
        'and mixed with input params',
      async () => {
        const r = await client.account.connect(
          { provider: 'WHATSAPP' },
          { extra_params: { provider: 'garbage', legit: 'test' } },
        );
        console.log(r);
        expect((r as any).url).toBe(API_URL + 'accounts');
        expect(fetchMock.mock.calls[0]?.[1]?.body).toBe(JSON.stringify({ provider: 'WHATSAPP', legit: 'test' }));
      },
    );
    //--------------------------------------------------------------------------
    it(
      'should inject extra_params in body ' +
        'and not overwrite input params ' +
        'on POST ' +
        'when body Content-Type is multipart/form-data ' +
        'and mixed with input params',
      async () => {
        const r = await client.email.send(
          { account_id: 'some_account_id', to: [{ identifier: 'att@mail.com' }], body: 'content' },
          { extra_params: { account_id: 'garbage', legit: 'test' } },
        );

        const expectedFormData = [
          //   ['account_id', 'garbage'],
          ['account_id', 'some_account_id'],
          ['legit', 'test'],
          ['body', 'content'],
          ['to', '[{"identifier":"att@mail.com"}]'],
        ];
        expect((r as any).url).toBe(API_URL + 'emails');
        const resultFormData = [...fetchMock.mock.calls[0]?.[1]?.body.entries()];
        // console.log(r, resultFormData);
        expect(resultFormData).toEqual(expect.arrayContaining(expectedFormData));
        expect(resultFormData.length).toBe(expectedFormData.length);
      },
    );
  });
  //----------------------------------------------------------------------------
  describe('DELETE', () => {
    //--------------------------------------------------------------------------
    it('should inject extra_params as query string ' + 'on DELETE ' + 'when no input params', async () => {
      const r = await client.account.delete('some_account_id', { extra_params: { xtra: 'test' } });
      //   console.log(r);
      expect((r as any).url).toBe(API_URL + 'accounts/some_account_id?xtra=test');
    });
    //--------------------------------------------------------------------------
    it(
      'should inject extra_params as query string ' +
        'and not overwrite input params ' +
        'on DELETE ' +
        'when mixed with input params',
      async () => {
        const r = await client.email.delete.byProviderId('email-id', 'some_account_id', {
          extra_params: { account_id: 'garbage', legit: 'test' },
        });
        // console.log(r);
        expect((r as any).url).toBe(API_URL + 'emails/email-id?account_id=some_account_id&legit=test');
      },
    );
  });
});
