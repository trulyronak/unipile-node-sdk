import { UnipileClient } from '../client.js';
import { RequestOptions, Response } from '../types/index.js';
import { deleteWebhookValidator, getWebhooksValidator, postWebhookValidator } from '../validation.js';
import { WebhookListResponse, WebhookListResponseValidator } from '../webhooks/webhooks-list.types.js';

export class WebhookResource {
  constructor(private client: UnipileClient) {}

  async getAll(options?: RequestOptions): Promise<WebhookListResponse> {
    return await this.client.request.send({
      path: ['webhooks'],
      method: 'GET',
      options,
      validator: WebhookListResponseValidator,
    });
  }

  async create(input: any, options?: RequestOptions): Promise<Response.PostWebhook> {
    return await this.client.request.send({
      path: ['webhooks'],
      method: 'POST',
      body: input,
      options,
      validator: postWebhookValidator,
    });
  }

  async delete(id: string, options?: RequestOptions): Promise<Response.DeleteWebhook> {
    return await this.client.request.send({
      path: ['webhooks', id],
      method: 'DELETE',
      options,
      validator: deleteWebhookValidator,
    });
  }
}
