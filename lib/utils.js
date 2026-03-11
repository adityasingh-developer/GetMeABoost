export function toText(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

export function toHref(value) {
  const text = toText(value);
  if (!text) return "#";
  if (/^(https?:\/\/|mailto:|tel:)/i.test(text)) return text;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return `mailto:${text}`;
  if (/^\+?[\d\s()-]{6,}$/.test(text)) return `tel:${text.replace(/[^\d+]/g, "")}`;
  return `https://${text}`;
}

export function normalizeLinkKey(rawKey) {
  const base = toText(rawKey);
  if (!base) return "";

  const noDots = base.replaceAll(".", "_");
  const noLeadingDollar = noDots.replace(/^\$+/, "");
  return noLeadingDollar;
}

export function normalizeLinks(input) {
  if (!input || typeof input !== "object") {
    return {};
  }

  let entries = [];
  if (input instanceof Map) {
    entries = Array.from(input.entries());
  } else if (Array.isArray(input)) {
    entries = input;
  } else {
    entries = Object.entries(input);
  }

  const normalized = {};
  for (const [rawKey, rawValue] of entries) {
    const key = normalizeLinkKey(rawKey);
    const value = toText(rawValue);

    if (!key || !value) {
      continue;
    }

    normalized[key] = value;
  }

  return normalized;
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

  return JSON.stringify({
    name: String(snapshot?.name ?? "").trim(),
    profileImage: String(snapshot?.profileImage ?? "").trim(),
    bannerImage: String(snapshot?.bannerImage ?? "").trim(),
    description: String(snapshot?.description ?? "").trim(),
    links: sortedLinks,
    pageSections: sortedPageSections,
  });
}

export { normalizePageSections } from "./pageSections";
