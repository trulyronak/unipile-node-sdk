/** Fake i18n to avoid modifying schemas definitions too much. */
export const i18n = {
  t: (key: string, ...args: unknown[]): string => key,
};
