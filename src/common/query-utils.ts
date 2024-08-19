export const UTCDateTimeExample = "2025-12-31T23:59:59.999Z";
export const UTCDateTimePattern =
  "^[1-2]\\d{3}-[0-1]\\d-[0-3]\\dT\\d{2}:\\d{2}:\\d{2}.\\d{3}Z$";

/**
 * Parse entering query/body to match with the validation schemas
 * @param query The query object or body of the request
 * @param rules An object whose keys are the data types to match, and the values the props that should be parsed (nested props must use dot syntax)
 */
export const parseNestPayload = (
  payload: any,
  rules: Partial<
    Record<
      "number" | "boolean" | "array" | "json" | "comma_separated_list",
      string[]
    >
  >
) => {
  try {
    if (typeof payload !== "object") return payload;

    return Object.entries(rules).reduce(
      (acc, [type, properties]) => {
        for (const property of properties) {
          /**
           * Handle direct property
           */
          if (!property.includes(".")) {
            if (hasKey(payload, property)) {
              acc[property] = parseValue(type, acc[property]);
            }
            continue;
          }

          /**
           * Handle nested property
           */
          const [rootProperty, ...nestedProperties] = property.split(".");
          let value = acc[rootProperty];

          for (const nestedPropery of nestedProperties) {
            if (!value) {
              value = null;
              break;
            } else value = value[nestedPropery] ?? null;
          }

          if (value === null) continue;

          const updatedProperty = parseNestedObject(
            rootProperty,
            nestedProperties,
            parseValue(type, value)
          );

          acc = mergeDeepObjects(acc, updatedProperty);
        }

        return acc;
      },
      { ...payload } as { [key: string]: any }
    );
  } catch (error) {
    console.log(error);

    return payload;
  }
};

/**
 * Check if a direct or nested property exists in an object
 * @param obj - The object to be tested
 * @param keys - A string for direct property or an array of strings for nested property
 */
const hasKey = (obj: any, keys: string | string[]): boolean => {
  if (!obj || typeof obj !== "object") return false;
  if (typeof keys === "string") return keys in obj;

  const [currentKey, ...nextKeys] = keys;
  if (nextKeys.length === 0 && currentKey in obj) return true;
  return hasKey(obj[currentKey], nextKeys);
};

/**
 * Parse value according to type
 */
const parseValue = (
  type: string,
  value: any
): number | boolean | string | any[] => {
  if (type === "number") return Number(value);
  if (type === "boolean")
    return value === "true" ? true : value === "false" ? false : value;
  if (type === "array") return Array.isArray(value) ? value : [value];
  if (type === "comma_separated_list") return value.split(",");
  if (type === "json") return JSON.parse(value);
  return value;
};

/**
 * Reconstruct nested properties
 */
const parseNestedObject = (
  key: string,
  [next, ...nestedKeys]: string[],
  value: any
): object => {
  return { [key]: !next ? value : parseNestedObject(next, nestedKeys, value) };
};

/**
 * Deeply merge base object with parsed nested property
 */
const mergeDeepObjects = (
  baseObj: { [key: string]: any },
  update: { [key: string]: any }
): any => {
  return Object.entries(update).reduce(
    (result, [key, updatedValue]) => {
      if (typeof updatedValue === "object") {
        if (typeof result[key] === "object") {
          result[key] = mergeDeepObjects(result[key], update[key]);
        } else {
          result[key] = { ...updatedValue };
        }
      } else {
        result[key] = updatedValue;
      }

      return result;
    },
    { ...baseObj }
  );
};
