export type SupportedProtocols = 'http' | 'https';
export type ApiVersion = 'v1' | 'v2';
export type MessagingProvider = 'LINKEDIN' | 'WHATSAPP' | 'INSTAGRAM' | 'MESSENGER' | 'TELEGRAM' | 'TWITTER';
export type MailProvider = 'MAIL' | 'GOOGLE' | 'OUTLOOK'
export type SupportedProvider = MessagingProvider | MailProvider;

export type ClientOptions = {
  apiVersion: ApiVersion;
  logRequestResult: boolean;
  logRequestPayload: boolean;
  validateRequestPayload: boolean;
};

export type ClientInstantiationOptions = Partial<ClientOptions>;
