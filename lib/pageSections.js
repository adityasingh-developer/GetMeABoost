export const PAGE_SECTION_KEYS = [
  "hero",
  "stats",
  "about",
  "socialLinks",
  "memberships",
  "recentSupporters",
  "currentGoal",
  "supportUnlocks",
  "supportForm",
];

export const DEFAULT_PAGE_SECTIONS = Object.freeze({
  hero: true,
  stats: true,
  about: true,
  socialLinks: true,
  memberships: true,
  recentSupporters: true,
  currentGoal: true,
  supportUnlocks: true,
  supportForm: true,
});

export function normalizePageSections(input) {
  const source = input && typeof input === "object" ? input : {};
  const normalized = { ...DEFAULT_PAGE_SECTIONS };

  for (const key of PAGE_SECTION_KEYS) {
    if (key in source) {
      normalized[key] = Boolean(source[key]);
    }
  }

  return normalized;
}

