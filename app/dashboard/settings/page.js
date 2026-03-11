"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useDashboardData } from "@/app/dashboard/DashboardDataContext";
import { buildLinksArray, buildLinksObject, serializeSettingsSnapshot } from "lib/utils";

export default function DashboardSettingsPage() {
  const { update } = useSession();
  const { dashboardData, setDashboardData } = useDashboardData();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [goal, setGoal] = useState(0);
  const [profileImage, setProfileImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [description, setDescription] = useState("");
  const [linksRows, setLinksRows] = useState([{ id: "initial", key: "", value: "" }]);
  const [pageSections, setPageSections] = useState({});
  const [initialSnapshot, setInitialSnapshot] = useState(null);

  useEffect(() => {
    setName(dashboardData?.name || "");
    setUsername(dashboardData?.username || "");
    setProfileImage(dashboardData?.profileImage || "");
    setBannerImage(dashboardData?.bannerImage || "");
    setDescription(dashboardData?.description || "");
    setLinksRows(buildLinksArray(dashboardData?.links || {}));
    setPageSections(dashboardData?.pageSections || {});
    setGoal(dashboardData?.goal || 0)
    setInitialSnapshot({
      name: dashboardData?.name || "",
      profileImage: dashboardData?.profileImage || "",
      bannerImage: dashboardData?.bannerImage || "",
      description: dashboardData?.description || "",
      links: dashboardData?.links || {},
      pageSections: dashboardData?.pageSections || {},
    });
    setIsLoading(false);
    setError("");
  }, [dashboardData]);

  const normalizedLinks = useMemo(() => buildLinksObject(linksRows), [linksRows]);
  const currentSnapshot = useMemo(
    () => ({
      name: name.trim(),
      profileImage: profileImage.trim(),
      bannerImage: bannerImage.trim(),
      description: description.trim(),
      links: normalizedLinks,
      pageSections,
    }),
    [name, profileImage, bannerImage, description, normalizedLinks, pageSections]
  );
  const hasChanges = useMemo(() => {
    if (!initialSnapshot) return false;
    return serializeSettingsSnapshot(currentSnapshot) !== serializeSettingsSnapshot(initialSnapshot);
  }, [currentSnapshot, initialSnapshot]);

  const handleAddLink = () => {
    setLinksRows((prev) => [...prev, { id: `${Date.now()}-${prev.length}`, key: "", value: "" }]);
  };

  const handleRemoveLink = (id) => {
    setLinksRows((prev) => {
      const nextRows = prev.filter((row) => row.id !== id);
      return nextRows.length ? nextRows : [{ id: `${Date.now()}-empty`, key: "", value: "" }];
    });
  };

  const handleUpdateLink = (id, field, value) => {
    setLinksRows((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      if (!hasChanges) {
        setSuccess("No changes to save.");
        return;
      }

      const payload = {
        ...currentSnapshot,
      };

      const res = await fetch("/api/users/me/profile-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to update settings.");
      }

      await update({
        ...data?.user,
      });

      setName(data?.user?.name || payload.name);
      setUsername(data?.user?.username || username);
      setProfileImage(data?.user?.profileImage || payload.profileImage);
      setBannerImage(data?.user?.bannerImage || payload.bannerImage);
      setDescription(data?.user?.description || payload.description);
      const nextLinks = data?.user?.links || normalizedLinks;
      const nextPageSections = data?.user?.pageSections || pageSections;
      setLinksRows(buildLinksArray(nextLinks));
      setPageSections(nextPageSections);
      setInitialSnapshot({
        name: data?.user?.name || payload.name,
        profileImage: data?.user?.profileImage || payload.profileImage,
        bannerImage: data?.user?.bannerImage || payload.bannerImage,
        description: data?.user?.description || payload.description,
        links: nextLinks,
        pageSections: nextPageSections,
      });
      setDashboardData((prev) => ({
        ...prev,
        name: data?.user?.name || payload.name,
        profileImage: data?.user?.profileImage || payload.profileImage,
        bannerImage: data?.user?.bannerImage || payload.bannerImage,
        description: data?.user?.description || payload.description,
        links: nextLinks,
        pageSections: nextPageSections,
      }));
      setSuccess(data?.message || "Settings updated.");
    } catch (submitError) {
      setError(submitError.message || "Failed to update settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p className="text-neutral-300">Loading settings...</p>;
  }

  return (
    <div className="border border-[#222] bg-[#151515] p-6">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-neutral-300">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="h-11 border border-[#333] bg-[#101010] px-3 outline-none focus:border-[#d5ba80]"
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-neutral-300">Username</span>
            <input
              title="UserName is fixed and cannot be changed"
              type="text"
              value={username}
              readOnly
              className="h-11 border border-[#333] bg-[#161616] px-3 outline-none text-neutral-300"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-neutral-300">Profile Picture URL</span>
            <input
              type="url"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              placeholder="https://..."
              className="h-11 border border-[#333] bg-[#101010] px-3 outline-none focus:border-[#d5ba80]"
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm text-neutral-300">Banner Image URL</span>
            <input
              type="url"
              value={bannerImage}
              onChange={(e) => setBannerImage(e.target.value)}
              placeholder="https://..."
              className="h-11 border border-[#333] bg-[#101010] px-3 outline-none focus:border-[#d5ba80]"
              required
            />
          </label>
        </div>


        <div className="flex gap-3">
          <label className="flex flex-col w-1/2 gap-2">
            <span className="text-sm text-neutral-300">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="border border-[#333] bg-[#101010] px-3 py-2 outline-none focus:border-[#d5ba80] resize-none"
              required
            />
          </label>

          <label className="flex flex-col gap-2 w-1/4">
            <span className="text-sm text-neutral-300">Goal</span>
            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Your Goal?"
              className="h-11 border border-[#333] bg-[#101010] px-3 outline-none focus:border-[#d5ba80]"
              required
            />
          </label>
        </div>

        <div className="border border-[#2b2b2b] bg-[#111] p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Socials</h2>
            <button
              type="button"
              onClick={handleAddLink}
              className="h-10 border border-[#444] px-7 text-md hover:bg-[#1f1f1f] transition-colors cursor-pointer"
            >
              Add Link
            </button>
          </div>

          <p className="text-xs text-neutral-400 mt-2">
            Use any key/value pair. Example: `youtube` + `https://youtube.com/@yourchannel`
          </p>

          <div className="mt-4 flex flex-col gap-3">
            {linksRows.map((row) => (
              <div key={row.id} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-2">
                <input
                  type="text"
                  value={row.key}
                  onChange={(e) => handleUpdateLink(row.id, "key", e.target.value)}
                  placeholder="Key (youtube, linkedin, website)"
                  className="h-10 border border-[#333] bg-[#101010] px-3 outline-none focus:border-[#d5ba80]"
                />
                <input
                  type="text"
                  value={row.value}
                  onChange={(e) => handleUpdateLink(row.id, "value", e.target.value)}
                  placeholder="Value (url)"
                  className="h-10 border border-[#333] bg-[#101010] px-3 outline-none focus:border-[#d5ba80]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveLink(row.id)}
                  className="h-11 border border-[#442424] px-7 text-[#fff0f0] hover:bg-[#492727] transition-colors cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        {success ? <p className="text-sm text-green-400">{success}</p> : null}

        <div>
          <button
            type="submit"
            disabled={isSubmitting || !hasChanges}
            className="h-11 bg-[#d5ba80] px-5 text-black font-medium hover:brightness-95 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
