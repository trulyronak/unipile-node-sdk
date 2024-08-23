import { UnipileClient } from '../client.js';
import { RequestOptions, Response } from '../types/index.js';
import { deleteWebhookValidator, postWebhookValidator } from '../validation.js';
import { WebhookCreateResponse, WebhookCreateResponseValidator } from '../webhooks/webhooks-create.types.js';
import { WebhookDeleteResponse, WebhookDeleteResponseValidator } from '../webhooks/webhooks-delete.types.js';
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

  async create(input: any, options?: RequestOptions): Promise<WebhookCreateResponse> {
    return await this.client.request.send({
      path: ['webhooks'],
      method: 'POST',
      body: input,
      options,
      validator: WebhookCreateResponseValidator,
    });
  }

  async delete(id: string, options?: RequestOptions): Promise<WebhookDeleteResponse> {
    return await this.client.request.send({
      path: ['webhooks', id],
      method: 'DELETE',
      options,
      validator: WebhookDeleteResponseValidator,
    });
  }
}
