export const toTitleCase = (s: string) => {
  if (!s) {
    return "";
  }
  return s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();
};
