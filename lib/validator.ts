export function isNonEmptyString(v: unknown, min = 1) {
  return typeof v === "string" && v.trim().length >= min;
}


export function isCategory(v: unknown) {
  return v === "se" || v === "devops" || v === "aiml";
}


export function toSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
