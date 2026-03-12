"use client";

import { useMemo, useState } from "react";
import CreatorPageContent from "@/components/CreatorPageContent";
import { normalizePageSections } from "@/lib/pageSections";

export default function MyPageEditor({
  creatorUsername = "",
  username = "",
  description = "",
  profileImage = "",
  bannerImage = "",
  links = {},
  supporters = [],
  followersCount = 0,
  membershipTiers = [],
  membersCount = 0,
  totalSupportAmount = 0,
  goal = 0,
  supportUnlocks = [],
  pageSections = {},
  onPageSectionsChange,
}) {
  const [sectionVisibility, setSectionVisibility] = useState(() => normalizePageSections(pageSections));
  const [error, setError] = useState("");
  const [isSavingSection, setIsSavingSection] = useState("");
  const [savedAt, setSavedAt] = useState(null);

  const normalizedSectionVisibility = useMemo(
    () => normalizePageSections(sectionVisibility),
    [sectionVisibility]
  );

  const toggleSection = async (sectionKey) => {
    if (!sectionKey || isSavingSection) return;

    const previous = normalizedSectionVisibility;
    const next = { ...previous, [sectionKey]: !previous[sectionKey] };
    setSectionVisibility(next);
    setError("");
    setIsSavingSection(sectionKey);

    try {
      const res = await fetch("/api/users/me/profile-status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageSections: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to save section visibility.");
      }

      setSectionVisibility(normalizePageSections(data?.pageSections));
      if (onPageSectionsChange) {
        onPageSectionsChange(normalizePageSections(data?.pageSections));
      }
      setSavedAt(new Date());
    } catch (saveError) {
      setSectionVisibility(previous);
      setError(saveError.message || "Failed to save section visibility.");
    } finally {
      setIsSavingSection("");
    }
  };

  return (
    <div className="pb-12">
      <div className="max-w-7xl mx-auto px-4 mb-4">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-3 text-sm text-neutral-300">
          <p>Click each section&apos;s top-right button to show or hide it from your public `/{creatorUsername || "username"}` page.</p>
          {isSavingSection ? <p className="text-amber-300 mt-1">Saving...</p> : null}
          {savedAt ? <p className="text-green-400 mt-1">Saved at {savedAt.toLocaleTimeString()}</p> : null}
          {error ? <p className="text-red-400 mt-1">{error}</p> : null}
        </div>
      </div>

      <CreatorPageContent
        creatorUsername={creatorUsername}
        username={username}
        description={description}
        profileImage={profileImage}
        bannerImage={bannerImage}
        links={links}
        supporters={supporters}
        followersCount={followersCount}
        membershipTiers={membershipTiers}
        membersCount={membersCount}
        totalSupportAmount={totalSupportAmount}
        goal={goal}
        supportUnlocks={supportUnlocks}
        sectionVisibility={normalizedSectionVisibility}
        editable
        showHiddenInPreview
        onToggleSection={toggleSection}
      />
    </div>
  );
}
