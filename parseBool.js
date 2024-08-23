function parseBoolean(value) {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    const lowerCaseValue = value.toLowerCase();
    if (lowerCaseValue === "true") {
      return true;
    } else if (lowerCaseValue === "false") {
      return false;
    }
  }
}

module.exports = { parseBoolean };
