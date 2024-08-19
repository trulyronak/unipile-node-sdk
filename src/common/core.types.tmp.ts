/**
 * @todo Find a way to share these definitions with focus-front/core.
 */

/**
 *
 */
export type SingleOrArray<T> = T | T[];

/**
 * Helper debug type.
 */
export type Check<T, S> = [T] extends [S]
  ? [S] extends [T]
    ? true
    : false
  : false;

/**
 * Check if A extends B.
 */
export type Extends<A, B> = [A] extends [B] ? A : never;

/**
 * Pick given keys from given type schema T and make them required.
 */
export type Demand<T, K extends keyof T> = {
  [P in K]-?: T[P];
};

/**
 *
 */
export type RequiredProps<T, K extends keyof T> = T & Demand<T, K>;

/**
 * @note Opaque type.
 */
declare const validUuid: unique symbol;
export type Uuid = string & { [validUuid]: true };

/**
 *
 */
export type AccountSourceServiceStatus =
  | "STOPPED"
  | "OK"
  | "ERROR"
  | "CREDENTIALS"
  | "PERMISSIONS"
  | "CONNECTING";

/**
 *
 */
export type AccountSourceType = "MAILS" | "CALENDAR" | "CALLS" | "MESSAGING";

/**
 * @note This definition is based on how an AccountSource used to be identified
 *       in sources.slice.
 *
 *       It implies that there can only be 1 Source for each AccountSourceType
 *       per Account.
 *
 *       If this changes, AccountSourceId should be changed accordingly.
 */
export type AccountSourceId = `${Uuid}_${AccountSourceType}`;

/**
 *
 */
export type Entries<T extends object> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

/**
 *  ISO 8601 UTC Calendar Date in extended format :
 *
 *  YYYY-MM-DD
 *
 * @note Opaque type.
 */
declare const validUTCDate: unique symbol;
export type UTCDate = string & { [validUTCDate]: true };

/**
 * ISO 8601 UTC Datetime in extended format :
 *
 * YYYY-MM-DDTHH:mm:ssZ
 *
 * @note Opaque type.
 */
declare const validUTCDateTime: unique symbol;
export type UTCDateTime = string & { [validUTCDateTime]: true };

/**
 * ISO 8601 UTC Datetime with milliseconds in extended format :
 *
 * YYYY-MM-DDTHH:mm:ss.SSSZ
 *
 * @note Opaque type.
 */
declare const validUTCDateTimeMs: unique symbol;
export type UTCDateTimeMs = string & { [validUTCDateTimeMs]: true };

/**
 *
 */
export function isUTCDateTimeMs(value: unknown): value is UTCDateTimeMs {
  if (typeof value !== "string") {
    return false;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return false;
  }

  return value === parsed.toISOString();
}

/**
 *  Number of milliseconds since January 1, 1970, 00:00:00 UTC.
 *
 * @note Opaque type.
 */
declare const validUnixTimeMs: unique symbol;
export type UnixTimeMs = number & { [validUnixTimeMs]: true };

/**
 *
 */
export function isUnixTimeMs(value: unknown): value is UnixTimeMs {
  if (typeof value !== "number") {
    return false;
  }

  const parsed = new Date(value);
  const time = parsed.getTime();
  if (Number.isNaN(time)) {
    return false;
  }

  return value === time;
}

/**
 *  Time of the day with format hh:mm
 *
 * @note Opaque type.
 */
declare const validHourMinuteTime: unique symbol;
export type HourMinuteTime = string & { [validHourMinuteTime]: true };

/**
 *
 */
export function isHourMinuteTime(value: unknown): value is HourMinuteTime {
  if (typeof value !== "string") return false;

  const parsed = value.split(":");
  if (parsed.length !== 2) return false;

  for (let i = 0; i < parsed.length; i++) {
    const parseNumber = Number(parsed[i]);
    if (
      isNaN(parseNumber) ||
      Math.sign(parseNumber) === -1 ||
      parsed[i].length !== 2 ||
      parsed[i] > (i === 0 ? "23" : "59")
    )
      return false;
  }

  return true;
}

/**
 *  IANA timezone identifier.
 *
 * @see https://www.iana.org/time-zones
 * @see https://unicode-org.github.io/cldr-staging/charts/37/supplemental/zone_tzid.html
 *
 * @note Opaque type.
 */
declare const validTzid: unique symbol;
export type Tzid = string & { [validTzid]: true };

const dtfCache: Record<string, true> = {};
/**
 *
 */
export function isTzid(tzid: unknown): tzid is Tzid {
  if (typeof tzid !== "string") return false;

  if (!dtfCache[tzid]) {
    try {
      Intl.DateTimeFormat(undefined, { timeZone: tzid });
      dtfCache[tzid] = true;
      return true;
    } catch {
      return false;
    }
  }
  return true;
}

/**
 * @note atob(), btoa() throw InvalidCharacterError when given data is invalid.
 *
 * @note Opaque type.
 */
declare const validHttpUrl: unique symbol;
export type HttpUrl = string & { [validHttpUrl]: true };

/**
 *
 */
export function isHttpUrl(url: unknown): url is HttpUrl {
  if (typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (error) {
    return false;
  }
}

/**
 *
 */
export interface ImapConnectionParams {
  imap_host: string;
  imap_port: number;
  imap_user: string;
  smtp_host: string;
  smtp_port: number;
  smtp_user: string;
}

/**
 * @note atob(), btoa() throw InvalidCharacterError when given data is invalid.
 *
 * @note Opaque type.
 */
declare const validBase64: unique symbol;
export type Base64 = string & { [validBase64]: true };

const NOT_BASE64_CHAR_REGEX = /[^A-Za-z0-9+/=]/;
/**
 *
 */
export function isBase64(s: string): s is Base64 {
  const length = s.length;
  if (length % 4 !== 0 || NOT_BASE64_CHAR_REGEX.test(s)) {
    return false;
  }
  const firstPaddingChar = s.indexOf("=");
  return (
    firstPaddingChar === -1 ||
    firstPaddingChar === length - 1 ||
    (firstPaddingChar === length - 2 && s[length - 1] === "=")
  );
}

/**
 *
 */
export const ACCESS_TOKEN_SEPARATOR = ".";
type AccessTokenSeparator = typeof ACCESS_TOKEN_SEPARATOR;

/**
 * @note Opaque type.
 */
declare const validAccessTokenPrefix: unique symbol;
export type AccessTokenPrefix = Base64 & { [validAccessTokenPrefix]: true };

/**
 * @note Opaque type.
 */
declare const validAccessTokenSecret: unique symbol;
export type AccessTokenSecret = Base64 & { [validAccessTokenSecret]: true };

/**
 *
 */
export type AccessTokenString =
  `${AccessTokenPrefix}${AccessTokenSeparator}${AccessTokenSecret}`;

/**
 * @note Opaque type.
 */
declare const validHashedAccessTokenSecret: unique symbol;
export type HashedAccessTokenSecret = Base64 & {
  [validHashedAccessTokenSecret]: true;
};

/**
 *
 */
export type HashedAccessToken =
  `${AccessTokenPrefix}${AccessTokenSeparator}${HashedAccessTokenSecret}`;

/**
 *
 */
export function isAccessToken(s: string): s is AccessTokenString {
  const [prefix, secret] = s.split(ACCESS_TOKEN_SEPARATOR);
  return (
    typeof prefix === "string" &&
    typeof secret === "string" &&
    isBase64(prefix) &&
    isBase64(secret)
  );
}

/**
 *
 */
export function isHashedAccessToken(s: string): s is HashedAccessToken {
  const [prefix, hashedSecret] = s.split(ACCESS_TOKEN_SEPARATOR);
  return (
    typeof prefix === "string" &&
    typeof hashedSecret === "string" &&
    isBase64(prefix) &&
    isBase64(hashedSecret)
  );
}

/**
 *
 */
export type Select<T, R extends keyof T> = Partial<Omit<T, R>> &
  Required<Pick<T, R>>;

/**
 *
 */
export type OptionalToUnionUndefined<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? T[P] | undefined : T[P];
};

/**
 * Remove index signatures from given type.
 * See https://stackoverflow.com/questions/51465182/how-to-remove-index-signature-using-mapped-types
 */
export type RemoveIndexSignature<T extends object> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : symbol extends K
    ? never
    : K]: T[K];
};

/**
 *  Like keyof, but distributive over and preserving discriminating union type.
 */
export type AllKeys<T> = T extends T ? keyof T : never;

/**
 * Like Omit, but distributive over and preserving discriminating union type.
 * See https://github.com/microsoft/TypeScript/issues/28791
 */
export type Strip<T, K extends AllKeys<T>> = T extends T ? Omit<T, K> : never;

/**
 * Make some property optional.
 *
 * @see https://github.com/piotrwitek/utility-types for non-distributive version.
 */
export type Optional<T, K extends AllKeys<T> = AllKeys<T>> = T extends T ? Omit<T, K> & Partial<Pick<T, K>> : never;
