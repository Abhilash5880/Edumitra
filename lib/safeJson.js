export function safeParseJSON(text) {
  try {
    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]");
    if (jsonStart === -1 || jsonEnd === -1) return null;

    const sliced = text.slice(jsonStart, jsonEnd + 1);
    return JSON.parse(sliced);
  } catch {
    return null;
  }
}
