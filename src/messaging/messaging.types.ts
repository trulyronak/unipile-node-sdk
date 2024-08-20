import { Static, Type } from "@sinclair/typebox";

export const MessagingAccountTypeSchema = Type.Union([
  Type.Literal("WHATSAPP"),
  Type.Literal("LINKEDIN"),
  Type.Literal("SLACK"),
  Type.Literal("TWITTER"),
  Type.Literal("MESSENGER"),
  Type.Literal("INSTAGRAM"),
  Type.Literal("TELEGRAM"),
]);

export enum MessagingAccountTypeEnum {
  WHATSAPP = "WHATSAPP",
  LINKEDIN = "LINKEDIN",
  SLACK = "SLACK",
  TWITTER = "TWITTER",
  MESSENGER = "MESSENGER",
  INSTAGRAM = "INSTAGRAM",
  TELEGRAM = "TELEGRAM",
}

export type MessagingAccountType = Static<typeof MessagingAccountTypeSchema>;
