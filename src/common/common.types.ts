import { Kind, SchemaOptions, Static, Type, TypeRegistry } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler';
import { i18n } from './i18n.fake.js';

// /**
//  * @note The StringEnumType is not is not safe to express a union of strings. I’ve encountered a lot of validation problems with it.
//  * It is possible that the TypeRegistry.Set() is not used properly and overrides the StringEnumType definition everytime it is called.
//  */
// export function StringEnumType<T extends string[]>(
//   kind: string,
//   members: [...T],
//   options?: UnsafeOptions
// ) {
//   TypeRegistry.Set(kind, (schema, value) => members.includes(value as any));
//   return Type.Unsafe<T[number]>({
//     [Kind]: kind,
//     type: "string",
//     enum: members,
//     ...options,
//   });
// }

// /**
//  * This type is an alternative to an union of litterals which is not displayed properly by readme.io
//  * Idealy we want to use the StringEnumType but the it is not reliable at the moment.
//  */
// export function StringPatternType(
//   litterals: Array<string>,
//   options?: StringOptions
// ) {
//   const pattern = `^(${litterals.join("|")})$`;
//   const description = `Accepted values: ${litterals.join(" | ")}`;

//   return Type.String({ pattern, description, ...options });
// }

/**
 * @note Working solution for string unions where TypeRegistry.Set should be top level
 * Brings much better string union presentation in Readme
 * https://github.com/xddq/schema2typebox/issues/16
 */
TypeRegistry.Set('StringEnum', (schema: any, value) => schema.enum.includes(value));

export const StringEnum = <T extends string[]>(values: [...T], options: SchemaOptions = {}) =>
  Type.Unsafe<T[number]>({
    ...options,
    [Kind]: 'StringEnum',
    type: 'string',
    enum: values,
  });

TypeRegistry.Set('NumberEnum', (schema: any, value) => schema.enum.includes(value));

export const NumberEnum = <T extends number[]>(values: [...T], options: SchemaOptions = {}) =>
  Type.Unsafe<T[number]>({
    ...options,
    [Kind]: 'NumberEnum',
    type: 'number',
    enum: values,
  });

/**
 *
 */
export const UniqueIdSchema = Type.String({
  title: 'UniqueId',
  description: i18n.t('api.UniqueId.description'),
  /**
   * 128 bits of data encoded as 22 characters of the following alphabet :\n0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_.!~*'()
   * example: "zYnh13HWV76_G3KyE-cAyg"
   * @note This is very loose definition. Basically we're accepting any
   *       non-empty string for now.
   */
  minLength: 1,
});

export function makeUniqueIdSchema(description: string) {
  return Type.String({
    ...UniqueIdSchema,
    description: `${i18n.t('api.UniqueId.description')} ${description}`,
  });
}

export type UniqueId = Static<typeof UniqueIdSchema>;
export const UniqueIdValidator = TypeCompiler.Compile(UniqueIdSchema);

export const LinkedinRequestUrlSchema = Type.String({
  title: 'LinkedinRequestUrl',
  description: 'An url pointing to some Linkedin API feature',
  pattern: `^https://www.linkedin.com/.*$`,
});

export type LinkedinRequestUrl = Static<typeof LinkedinRequestUrlSchema>;
export const LinkedinRequestUrlValidator = TypeCompiler.Compile(LinkedinRequestUrlSchema);
