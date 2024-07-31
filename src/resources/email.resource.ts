import { FormData } from 'formdata-node';
import { Blob } from 'node-fetch';
import {
  GetAllEmailsInput,
  GetAllFoldersInput,
  GetEmailAttachmentInput,
  UpdateEmailInput,
  RequestOptions,
  Response,
  SendEmailInput,
  UnipileClient,
  untypedYetValidator,
  UpdateEmailByProviderIdInput,
  GetEmailAttachmentByProviderIdInput,
} from '../index.js';

type EmailMethodCallableByProviderId<T> = {
  (...args: any): Promise<T>;
  byId(...args: any): Promise<T>;
  byProviderId(...args: any): Promise<T>;
}

export class EmailResource {
  /**
   * Get one email, either by its ID or by its provider ID.
   * @example email.getOne('email_id')
   * @example email.getOne.byProviderId('email_provider_id', 'account_id')
   */
  public getOne: EmailMethodCallableByProviderId<Response.UntypedYet>;

  /**
   * Delete an email, either by its ID or by its provider ID.
   * @example email.delete('email_id')
   * @example email.delete.byProviderId('email_provider_id', 'account_id')
   */
  public delete: EmailMethodCallableByProviderId<Response.UntypedYet>;

  /**
   * Update an email, either by its ID or by its provider ID.
   * @example email.update({ email_id: 'email_id', folders: ['folder'] })
   * @example email.update.byProviderId({ email_provider_id: 'email_provider_id', account_id: 'account_id', folders: ['folder'] })
   */
  public update: EmailMethodCallableByProviderId<Response.UntypedYet>;

  /**
   * Get one folder, either by its ID or by its provider ID.
   * @example email.getOneFolder('folder_id')
   * @example email.getOneFolder.byProviderId('folder_provider_id', 'account_id')
   */
  public getOneFolder: EmailMethodCallableByProviderId<Response.UntypedYet>;

  /**
   * Get an attachment, either by the email ID or by the email provider ID.
   * @example email.getEmailAttachment({ email_id: 'email_id', attachment_id: 'attachment_id' })
   * @example email.getEmailAttachment.byProviderId({ email_provider_id: 'email_provider_id', attachment_id: 'attachment_id', account_id: 'account_id' })
  */
  public getEmailAttachment: EmailMethodCallableByProviderId<Response.UntypedYet>;

  constructor(private client: UnipileClient) {
    this.getOne = this._getOne.bind(this) as EmailMethodCallableByProviderId<Response.UntypedYet>;
    this.getOne.byId = this._getOne.bind(this);
    this.getOne.byProviderId = this._getOneByProviderId.bind(this);

    this.delete = this._delete.bind(this) as EmailMethodCallableByProviderId<Response.UntypedYet>;
    this.delete.byId = this._delete.bind(this);
    this.delete.byProviderId = this._deleteByProviderId.bind(this);

    this.update = this._update.bind(this) as EmailMethodCallableByProviderId<Response.UntypedYet>;
    this.update.byId = this._update.bind(this);
    this.update.byProviderId = this._updateByProviderId.bind(this);

    this.getOneFolder = this._getOneFolder.bind(this) as EmailMethodCallableByProviderId<Response.UntypedYet>;
    this.getOneFolder.byId = this._getOneFolder.bind(this);
    this.getOneFolder.byProviderId = this._getOneFolderByProviderId.bind(this);

    this.getEmailAttachment = this._getEmailAttachment.bind(this) as EmailMethodCallableByProviderId<Response.UntypedYet>;
    this.getEmailAttachment.byId = this._getEmailAttachment.bind(this);
    this.getEmailAttachment.byProviderId = this._getEmailAttachmentByProviderId.bind(this);
  }

  async getAll(input: GetAllEmailsInput = {}, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { account_id, role, folder, from, to, any_email, before, after, limit, cursor } = input;

    const parameters: Record<string, string> = {};
    if (account_id) parameters.account_id = account_id;
    if (role) parameters.role = role;
    if (folder) parameters.folder = folder;
    if (from) parameters.from = from;
    if (to) parameters.to = to;
    if (any_email) parameters.any_email = any_email;
    if (before) parameters.before = before;
    if (after) parameters.after = after;
    if (limit) parameters.limit = String(limit);
    if (cursor) parameters.cursor = cursor;

    return await this.client.request.send({
      path: ['emails'],
      method: 'GET',
      options,
      parameters,
      validator: untypedYetValidator,
    });
  }

  private async _getOne(email_id: string, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['emails', email_id],
      method: 'GET',
      options,
      validator: untypedYetValidator,
    });
  }

  private async _getOneByProviderId(email_provider_id: string, account_id: string, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['emails', email_provider_id],
      method: 'GET',
      options,
      parameters: { account_id },
      validator: untypedYetValidator,
    });
  }

  private async _delete(email_id: string, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['emails', email_id],
      method: 'DELETE',
      options,
      validator: untypedYetValidator,
    });
  }

  private async _deleteByProviderId(email_provider_id: string, account_id: string, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['emails', email_provider_id],
      method: 'DELETE',
      options,
      parameters: { account_id },
      validator: untypedYetValidator,
    });
  }

  private async _update(input: UpdateEmailInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { email_id, folders, unread } = input;

    const body: Record<string, any> = {};
    if (folders) body.folders = folders;
    if (unread !== undefined) body.unread = unread;

    return await this.client.request.send({
      path: ['emails', email_id],
      method: 'PUT',
      body,
      options,
      validator: untypedYetValidator,
    });
  }

  private async _updateByProviderId(input: UpdateEmailByProviderIdInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { email_provider_id, account_id, folders, unread } = input;

    const body: Record<string, any> = {};
    if (folders) body.folders = folders;
    if (unread !== undefined) body.unread = unread;

    return await this.client.request.send({
      path: ['emails', email_provider_id],
      method: 'PUT',
      body,
      options,
      parameters: { account_id },
      validator: untypedYetValidator,
    });
  }

  async getAllFolders(input: GetAllFoldersInput = {}, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { account_id } = input;

    const parameters: Record<string, string> = {};
    if (account_id) parameters.account_id = account_id;

    return await this.client.request.send({
      path: ['folders'],
      method: 'GET',
      options,
      parameters,
      validator: untypedYetValidator,
    });
  }

  private async _getOneFolder(folder_id: string, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['folders', folder_id],
      method: 'GET',
      options,
      validator: untypedYetValidator,
    });
  }

  private async _getOneFolderByProviderId(folder_provider_id: string, account_id: string, options?: RequestOptions): Promise<Response.UntypedYet> {
    return await this.client.request.send({
      path: ['folders', folder_provider_id],
      method: 'GET',
      options,
      parameters: { account_id },
      validator: untypedYetValidator,
    });
  }

  async send(input: SendEmailInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { account_id, to, cc, bcc, subject, draft_id, body, attachments, from, custom_headers, tracking_options } = input;
    const formDataBody = new FormData();

    formDataBody.append('body', body);
    formDataBody.append('account_id', account_id);
    if (draft_id) formDataBody.append('draft_id', draft_id);
    if (subject) formDataBody.append('subject', subject);

    if (attachments !== undefined) {
      for (const [filename, buffer] of attachments) {
        formDataBody.append('attachments', new Blob([buffer]), filename);
      }
    }

    formDataBody.append('to', JSON.stringify(to));
    if (cc !== undefined) {
      formDataBody.append('cc', JSON.stringify(cc));
    }
    if (bcc !== undefined) {
      formDataBody.append('bcc', JSON.stringify(bcc));
    }
    if (from !== undefined) {
      formDataBody.append('from', JSON.stringify(from));
    }

    if (custom_headers !== undefined) {
      formDataBody.append('custom_headers', JSON.stringify(custom_headers));
    }

    if (tracking_options !== undefined) {
      formDataBody.append('tracking_options', JSON.stringify(tracking_options));
    }

    return await this.client.request.send({
      path: ['emails'],
      method: 'POST',
      body: formDataBody,
      headers: {
        // @todo find why adding the "Content-Type: multipart/form-data" header make the request fail
      },
      options,
      validator: untypedYetValidator,
    });
  }

  private async _getEmailAttachment(input: GetEmailAttachmentInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { email_id, attachment_id } = input;

    return await this.client.request.send({
      path: [email_id, 'attachments', attachment_id],
      method: 'GET',
      options,
      validator: untypedYetValidator,
    });
  }

  private async _getEmailAttachmentByProviderId(input: GetEmailAttachmentByProviderIdInput, options?: RequestOptions): Promise<Response.UntypedYet> {
    const { email_provider_id, attachment_id, account_id } = input;

    return await this.client.request.send({
      path: [email_provider_id, 'attachments', attachment_id],
      method: 'GET',
      options,
      parameters: { account_id },
      validator: untypedYetValidator,
    });
  }
}
