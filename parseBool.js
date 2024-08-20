function parseBoolean(value) {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }
  return !!value; // Fallback, converts truthy/falsy values to true/false
}

module.exports = { parseBoolean };
