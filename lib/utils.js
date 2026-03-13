export function toText(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

export function filterLinks(input) {
  if (!input || typeof input !== "object") return {};
  const entries = input instanceof Map ? Array.from(input.entries()) : Object.entries(input);
  const filtered = {};
  for (const [rawKey, rawValue] of entries) {
    const key = String(rawKey ?? "").trim();
    const value = String(rawValue ?? "").trim();
    if (!key || !value) continue;
    if (!/^https?:\/\//i.test(value)) continue;
    filtered[key] = value;
  }
  return filtered;
}

export function toHref(value) {
  const text = toText(value);
  if (!text) return "#";
  if (/^(https?:\/\/|mailto:|tel:)/i.test(text)) return text;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return `mailto:${text}`;
  if (/^\+?[\d\s()-]{6,}$/.test(text)) return `tel:${text.replace(/[^\d+]/g, "")}`;
  return `https://${text}`;
}

export function buildLinksArray(linksObject = {}) {
  const entries = Object.entries(linksObject || {});
  if (!entries.length) {
    return [{ id: `${Date.now()}-0`, key: "", value: "" }];
  }

  return entries.map(([key, value], index) => ({
    id: `${Date.now()}-${index}`,
    key: String(key ?? ""),
    value: String(value ?? ""),
  }));
}

export function buildLinksObject(rows) {
  const links = {};
  for (const row of rows) {
    const key = String(row?.key ?? "").trim();
    const value = String(row?.value ?? "").trim();
    if (!key || !value) {
      continue;
    }
    links[key] = value;
  }
  return links;
}

export function serializeSettingsSnapshot(snapshot) {
  const safeLinks = snapshot?.links && typeof snapshot.links === "object" ? snapshot.links : {};
  const safePageSections =
    snapshot?.pageSections && typeof snapshot.pageSections === "object" ? snapshot.pageSections : {};
  const sortedLinks = Object.keys(safeLinks)
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, key) => {
      acc[key] = safeLinks[key];
      return acc;
    }, {});
  const sortedPageSections = Object.keys(safePageSections)
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, key) => {
      acc[key] = Boolean(safePageSections[key]);
      return acc;
    }, {});
  const safeSupportUnlocks = Array.isArray(snapshot?.supportUnlocks) ? snapshot.supportUnlocks : [];
  const normalizedSupportUnlocks = safeSupportUnlocks
    .map((item) => ({
      title: String(item?.title ?? "").trim(),
      description: String(item?.description ?? "").trim(),
    }))
    .filter((item) => item.title || item.description);

  return JSON.stringify({
    name: String(snapshot?.name ?? "").trim(),
    profileImage: String(snapshot?.profileImage ?? "").trim(),
    bannerImage: String(snapshot?.bannerImage ?? "").trim(),
    description: String(snapshot?.description ?? "").trim(),
    goal: Number(snapshot?.goal ?? 0),
    supportUnlocks: normalizedSupportUnlocks,
    links: sortedLinks,
    pageSections: sortedPageSections,
  });
}

export { normalizePageSections } from "./pageSections";
