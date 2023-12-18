function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
function keysToSnakeCase(obj: Record<string, any>): Record<string, any> {
  const snakeCaseObj: Record<string, any> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const snakeCaseKey = toSnakeCase(key);
      snakeCaseObj[snakeCaseKey] = obj[key];
    }
  }

  return snakeCaseObj;
}
function deepKeysToSnakeCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(deepKeysToSnakeCase);
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce(
      (result, key) => {
        result[toSnakeCase(key)] = deepKeysToSnakeCase(obj[key]);
        return result;
      },
      {} as Record<string, any>,
    );
  }
  return obj;
}
export default Object.freeze({
  deepKeysToSnakeCase,
  keysToSnakeCase,
});
