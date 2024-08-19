import QRCode from 'qrcode';
import {
  ConnectAccountInput,
  GetAccountsInput,
  Output,
  PostCodeCheckpointInput,
  PostHostedAuthLinkInput,
  ReconnectAccountInput,
  RequestOptions,
  Response,
  untypedYetValidator,
  UnipileClient,
  PostInstagramAccountInput,
  PostMessengerAccountInput,
  postQrCodeBasedAccountValidator,
  PostTwitterAccountInput,
  LinkedinBasicAuthenticationInput,
  LinkedinCookieAuthenticationInput,
} from '../index.js';
import { AccountListApiResponse, AccountListResponseValidator } from '../accounts/accounts-list.schema.js';
import { AccountApiResponse, AccountApiResponseValidator } from '../accounts/account.types.js';
import { AccountConnectApiResponse, AccountConnectApiResponseValidator } from '../accounts/accounts-create.types.js';
import { AccountReconnectApiResponse, AccountReconnectApiResponseValidator } from '../accounts/accounts-reconnect.types.js';

export class AccountResource {
  constructor(private client: UnipileClient) {}

  async getAll(input: GetAccountsInput = {}, options?: RequestOptions): Promise<AccountListApiResponse> {
    const { limit, cursor } = input;

    const parameters: Record<string, string> = {};
    if (limit) parameters.limit = String(limit);
    if (cursor) parameters.cursor = cursor;

    return await this.client.request.send({
      path: ['accounts'],
      method: 'GET',
      options,
      parameters,
      validator: AccountListResponseValidator,
    });
  }

  async getOne(account_id: string, options?: RequestOptions): Promise<AccountApiResponse> {
    return await this.client.request.send({
      path: ['accounts', account_id],
      method: 'GET',
      options,
      validator: AccountApiResponseValidator,
    });
  }

  async connect(input: ConnectAccountInput, options?: RequestOptions): Promise<AccountConnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts'],
      method: 'POST',
      body: input,
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountConnectApiResponseValidator,
    });
  }

  async reconnect(input: ReconnectAccountInput, options?: RequestOptions): Promise<AccountReconnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts', input.account_id],
      method: 'POST',
      body: input,
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountReconnectApiResponseValidator,
    });
  }

  async connectWhatsapp(options?: RequestOptions): Promise<Output.PostQrCodeBasedAccount> {
    const response = await this.client.request.send<Response.PostQrCodeBasedAccount>({
      path: ['accounts'],
      method: 'POST',
      body: {
        provider: 'WHATSAPP',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: postQrCodeBasedAccountValidator,
    });

    return {
      qrCodeString: await QRCode.toString(response.checkpoint.qrcode),
      code: response.checkpoint.qrcode,
    };
  }

  async reconnectWhatsapp(account_id: string, options?: RequestOptions): Promise<Output.PostQrCodeBasedAccount> {
    const response = await this.client.request.send<Response.PostQrCodeBasedAccount>({
      path: ['accounts', account_id],
      method: 'POST',
      body: {
        provider: 'WHATSAPP',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: postQrCodeBasedAccountValidator,
    });

    return {
      qrCodeString: await QRCode.toString(response.checkpoint.qrcode),
      code: response.checkpoint.qrcode,
    };
  }

  async connectTelegram(options?: RequestOptions): Promise<Output.PostQrCodeBasedAccount> {
    const response = await this.client.request.send<Response.PostQrCodeBasedAccount>({
      path: ['accounts'],
      method: 'POST',
      body: {
        provider: 'TELEGRAM',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: postQrCodeBasedAccountValidator,
    });

    return {
      qrCodeString: await QRCode.toString(response.checkpoint.qrcode),
      code: response.checkpoint.qrcode,
    };
  }

  async reconnectTelegram(account_id: string, options?: RequestOptions): Promise<Output.PostQrCodeBasedAccount> {
    const response = await this.client.request.send<Response.PostQrCodeBasedAccount>({
      path: ['accounts', account_id],
      method: 'POST',
      body: {
        provider: 'TELEGRAM',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: postQrCodeBasedAccountValidator,
    });

    return {
      qrCodeString: await QRCode.toString(response.checkpoint.qrcode),
      code: response.checkpoint.qrcode,
    };
  }

  async connectLinkedin(input: LinkedinBasicAuthenticationInput, options?: RequestOptions): Promise<AccountConnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts'],
      method: 'POST',
      body: {
        provider: 'LINKEDIN',
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountConnectApiResponseValidator,
    });
  }

  async connectLinkedinWithCookie(
    input: LinkedinCookieAuthenticationInput,
    options?: RequestOptions,
  ): Promise<AccountConnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts'],
      method: 'POST',
      body: {
        provider: 'LINKEDIN',
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountConnectApiResponseValidator,
    });
  }

  async reconnectLinkedin(
    input: LinkedinBasicAuthenticationInput & { account_id: string },
    options?: RequestOptions,
  ): Promise<AccountReconnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts', input.account_id],
      method: 'POST',
      body: {
        provider: 'LINKEDIN',
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountReconnectApiResponseValidator,
    });
  }

  async reconnectLinkedinWithCookie(
    input: LinkedinCookieAuthenticationInput & { account_id: string },
    options?: RequestOptions,
  ): Promise<AccountReconnectApiResponse> {
    return await this.client.request.send({
      path: ['accounts', input.account_id],
      method: 'POST',
      body: {
        provider: 'LINKEDIN',
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: AccountReconnectApiResponseValidator,
    });
  }

  async connectInstagram(input: PostInstagramAccountInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['accounts'],
      method: 'POST',
      body: {
        provider: 'INSTAGRAM',
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: untypedYetValidator,
    });
  }

  async reconnectInstagram(
    input: PostInstagramAccountInput & { account_id: string },
    options?: RequestOptions,
  ): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['accounts', input.account_id],
      method: 'POST',
      body: {
        provider: 'INSTAGRAM',
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: untypedYetValidator,
    });
  }

  async connectTwitter(input: PostTwitterAccountInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['accounts'],
      method: 'POST',
      body: {
        provider: 'TWITTER',
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: untypedYetValidator,
    });
  }

  async reconnectTwitter(
    input: PostTwitterAccountInput & { account_id: string },
    options?: RequestOptions,
  ): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['accounts', input.account_id],
      method: 'POST',
      body: {
        provider: 'TWITTER',
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: untypedYetValidator,
    });
  }

  async connectMessenger(input: PostMessengerAccountInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['accounts'],
      method: 'POST',
      body: {
        provider: 'MESSENGER',
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: untypedYetValidator,
    });
  }

  async reconnectMessenger(
    input: PostMessengerAccountInput & { account_id: string },
    options?: RequestOptions,
  ): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['accounts', input.account_id],
      method: 'POST',
      body: {
        provider: 'MESSENGER',
        ...input,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: untypedYetValidator,
    });
  }

  async delete(account_id: string, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['accounts', account_id],
      method: 'DELETE',
      options,
      validator: untypedYetValidator,
    });
  }

  async solveCodeCheckpoint(input: PostCodeCheckpointInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['accounts', 'checkpoint'],
      method: 'POST',
      body: input,
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: untypedYetValidator,
    });
  }

  async createHostedAuthLink(input: PostHostedAuthLinkInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['hosted', 'accounts', 'link'],
      method: 'POST',
      body: input,
      headers: {
        'Content-Type': 'application/json',
      },
      options,
      validator: untypedYetValidator,
    });
  }
}
