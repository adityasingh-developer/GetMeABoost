"use client";

import React from "react";
import FollowButton from "./FollowButton";
import QuickSupportForm from "./QuickSupportForm";
import { normalizePageSections } from "@/lib/pageSections";

const normalizeLinkName = (value = "") => String(value ?? "").trim().toLowerCase().replace(/[\s_-]+/g, "");

const ICON_DATA = {
  youtube: {
    viewBox: "0 0 48 34",
    paths: [
      { d: "M47.52 7.334s-.469-3.331-1.908-4.798C43.787.61 41.74.601 40.803.49 34.086 0 24.01 0 24.01 0h-.021S13.914 0 7.197.49c-.939.111-2.983.12-4.81 2.046C.949 4.003.48 7.334.48 7.334S0 11.247 0 15.158v3.668c0 3.912.48 7.823.48 7.823s.469 3.331 1.907 4.798c1.827 1.926 4.225 1.866 5.293 2.067 3.84.371 16.32.486 16.32.486s10.086-.015 16.803-.505c.937-.113 2.984-.122 4.809-2.048 1.439-1.467 1.908-4.798 1.908-4.798s.48-3.911.48-7.823v-3.668c0-3.911-.48-7.824-.48-7.824ZM19.042 23.27V9.688l12.969 6.814-12.969 6.768Z", fill: "#CE1312" },
    ],
  },
  mail: {
    viewBox: "0 0 1024 1024",
    paths: [
      { d: "M863.5 224H258.3C178.5 294.4 128 397.4 128 512s50.5 217.6 130.3 288h605.1c35.3 0 64-28.7 64-64V288c.1-35.4-28.5-64-63.9-64z", fill: "#536DFE" },
      { d: "M125.1 289.7L512 673.6l382.6-385.5L512 543.9z", fill: "#FFEA00" },
    ],
  },
  discord: {
    viewBox: "0 0 256 199",
    paths: [
      { d: "M216.856 16.597C200.285 8.843 182.566 3.208 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0C96.911 9.645 94.193 4.113 91.897 0 73.353 3.208 55.613 8.864 39.042 16.638 5.618 67.147-3.443 116.401 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193 5.215-7.177 9.866-14.807 13.873-22.849-7.631-2.899-14.94-6.478-21.846-10.632 1.832-1.357 3.624-2.777 5.355-4.237 42.123 19.702 87.89 19.702 129.51 0 1.752 1.46 3.544 2.88 5.356 4.237-6.927 4.175-14.256 7.753-21.887 10.653 4.007 8.02 8.638 15.671 13.873 22.848 21.142-6.581 42.646-16.637 64.815-33.213 5.316-56.287-9.081-105.089-38.056-148.359ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.148-26.2 23.015-26.2c12.866 0 23.236 11.804 23.014 26.2 0 14.375-10.168 26.18-23.014 26.18Zm85.051 0c-12.645 0-23.015-11.805-23.015-26.18s10.148-26.2 23.015-26.2c12.866 0 23.236 11.804 23.014 26.2 0 14.375-10.148 26.18-23.014 26.18Z", fill: "#5865F2" },
    ],
  },
  telegram: {
    viewBox: "0 0 256 256",
    paths: [
      { d: "M128 0C57.307 0 0 57.307 0 128s57.307 128 128 128 128-57.307 128-128S198.693 0 128 0Z", fill: "#40B3E0" },
      { d: "M190.283 73.631 167.421 188.898s-3.197 7.994-11.99 4.157l-52.758-40.448-19.184-9.272-32.294-10.872s-4.956-1.758-5.436-5.595c-.479-3.837 5.596-5.915 5.596-5.915l128.376-50.36s10.552-4.636 10.552 3.038Z", fill: "#fff" },
    ],
  },
  phone: {
    viewBox: "0 0 16 16",
    paths: [
      { d: "M14.031 11.852c-.428-.539-1.123-1.32-1.718-1.394-.362-.045-.778.255-1.188.538-.08.04-.698.408-.773.43-.396.113-1.241.146-1.752-.32-.492-.45-1.27-1.283-1.898-2.046-.6-.786-1.229-1.731-1.551-2.311-.336-.601-.094-1.396.114-1.746.038-.063.498-.536.601-.646l.015.018c.381-.32.78-.645.825-.997.074-.586-.525-1.439-.953-1.979-.428-.541-1.091-1.488-1.994-1.354-.34.05-.633.169-.922.34l-.008-.009a.357.357 0 0 1-.048.037l-.025.013.003.004c-.166.128-.64.482-.694.53-.586.521-1.468 1.748-.786 3.955.506 1.64 1.585 3.566 3.055 5.514l-.008.007c.072.094.146.179.221.27.07.093.139.185.211.277l.01-.007c1.56 1.879 3.196 3.381 4.689 4.267 2.01 1.192 3.439.655 4.099.228.062-.041.534-.408.694-.529l.004.004.018-.02.043-.033-.006-.008a2.423 2.423 0 0 0 .57-.799c.351-.829-.42-1.693-.848-2.234Z", fill: "#434343" },
    ],
  },
  github: {
    viewBox: "0 0 20 20",
    paths: [
      {
        d: "M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399",
        fill: "currentColor",
        transform: "translate(-84 -7399)",
      },
    ],
  },
  portfolio: {
    viewBox: "0 0 100 100",
    paths: [
      { d: "M38,29h4c0.6,0,1-0.4,1-1v-3h14v3c0,0.6,0.4,1,1,1h4c0.6,0,1-0.4,1-1v-3c0-3.3-2.7-6-6-6H43c-3.3,0-6,2.7-6,6 v3C37,28.6,37.4,29,38,29z", fill: "currentColor" },
      { d: "M74,35H26c-3.3,0-6,2.7-6,6v32c0,3.3,2.7,6,6,6h48c3.3,0,6-2.7,6-6V41C80,37.7,77.3,35,74,35z", fill: "currentColor" },
    ],
  },
};

function SocialIcon({ type }) {
  const icon = ICON_DATA[type];
  if (!icon) return null;

  return (
    <svg viewBox={icon.viewBox} aria-hidden="true" className="size-5">
      {icon.paths.map((pathProps) => (
        <path key={pathProps.d} {...pathProps} />
      ))}
    </svg>
  );
}

function resolveSocialIconType(key = "", value = "") {
  const normalizedKey = normalizeLinkName(key);
  const normalizedValue = String(value ?? "").toLowerCase();

  if (normalizedKey.includes("youtube") || normalizedValue.includes("youtube.com") || normalizedValue.includes("youtu.be")) return "youtube";
  if (["mail", "email", "gmail"].includes(normalizedKey) || normalizedValue.startsWith("mailto:")) return "mail";
  if (normalizedKey.includes("github") || normalizedValue.includes("github.com")) return "github";
  if (normalizedKey.includes("discord") || normalizedValue.includes("discord.gg") || normalizedValue.includes("discord.com")) return "discord";
  if (normalizedKey.includes("telegram") || normalizedValue.includes("t.me") || normalizedValue.includes("telegram.me")) return "telegram";
  if (["portfolio", "website", "site", "web"].includes(normalizedKey)) return "portfolio";

  const phoneTokens = ["whatsapp", "mobile", "mobilenumber", "phone", "phonenumber", "contactnumber", "call"];
  if (phoneTokens.includes(normalizedKey) || normalizedValue.includes("wa.me") || normalizedValue.includes("whatsapp.com")) return "phone";

  return null;
}

function SectionShell({
  sectionKey,
  visible,
  editable = false,
  showHiddenInPreview = false,
  onToggleSection,
  children,
}) {
  if (!visible && !showHiddenInPreview) {
    return null;
  }

  const hiddenOnPublic = !visible;

  return (
    <div className={`relative ${hiddenOnPublic && showHiddenInPreview ? "opacity-55" : ""}`}>
      {editable ? (
        <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
          {hiddenOnPublic ? (
            <span className="rounded-full border border-amber-400/40 bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200">
              Hidden on your page
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => onToggleSection?.(sectionKey)}
            className="rounded-md border border-neutral-600 bg-neutral-950/95 px-2 py-1 text-xs font-medium hover:bg-neutral-800"
          >
            {hiddenOnPublic ? "Show" : "Hide"}
          </button>
        </div>
      ) : null}
      {children}
    </div>
  );
}

export default function CreatorPageContent({
  creatorUsername = "",
  username,
  description = "",
  profileImage = "",
  bannerImage = "",
  links = {},
  supporters = [],
  followersCount = 0,
  membersCount = 0,
  membershipTiers = [],
  isFollowed = false,
  supportFormDisabled = false,
  sectionVisibility = {},
  editable = false,
  showHiddenInPreview = false,
  onToggleSection = null,
}) {
  const visible = normalizePageSections(sectionVisibility);
  const linkEntries = (() => {
    if (!links || typeof links !== "object") return [];
    const entries = links instanceof Map ? Array.from(links.entries()) : Object.entries(links);
    return entries
      .map(([key, value]) => [String(key ?? "").trim(), String(value ?? "").trim()])
      .filter(([key, value]) => key && value);
  })();

  const toHref = (value) => {
    const text = String(value ?? "").trim();
    if (!text) return "#";
    if (/^(https?:\/\/|mailto:|tel:)/i.test(text)) return text;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return `mailto:${text}`;
    if (/^\+?[\d\s()-]{6,}$/.test(text)) return `tel:${text.replace(/[^\d+]/g, "")}`;
    return `https://${text}`;
  };

  const truncateText = (value, maxChars = 150) => {
    const text = String(value ?? "").trim();
    if (!text || text === "-") return "-";
    return text.length > maxChars ? `${text.slice(0, maxChars)}....` : text;
  };

  const supportersCount = supporters.length;
  const recentSupporters = supporters.slice().reverse().slice(0, 6);
  const tiers = Array.isArray(membershipTiers) && membershipTiers.length
    ? membershipTiers
    : [
      { name: "Member", price: 9, description: "Access to exclusive posts" },
      { name: "Pro Member", price: 15, description: "Extra updates + priority replies" },
      { name: "VIP Member", price: 21, description: "Top tier with all perks" },
    ];
  const tierStyles = [
    "border-[#3a3429] from-[#2f2a20] via-[#1d1b1a] to-[#121212]",
    "border-[#4a3f25] from-[#3b321f] via-[#1f1b16] to-[#121212]",
    "border-[#4f4428] from-[#57472d] via-[#221d16] to-[#121212]",
  ];

  return (
    <>
      <SectionShell
        sectionKey="hero"
        visible={visible.hero}
        editable={editable}
        showHiddenInPreview={showHiddenInPreview}
        onToggleSection={onToggleSection}
      >
        <div className='relative'>
          <img src={bannerImage || "/dummyBanner.jpeg"} alt={`${username} banner`} className='w-full h-120 object-cover' />
          <img
            src={profileImage || "/king.jpg"}
            alt={`${username} profile`}
            className='absolute rounded-full border-6 box shadow-[0_0_0_0.6rem_#222] border-[#111] left-1/2 -translate-x-1/2 -bottom-17 w-40 h-40 object-cover'
          />
        </div>

        <div className='flex flex-col gap-5 items-center px-4'>
          <div>
            <h1 className='text-center mt-19 text-4xl font-medium'>{username}</h1>
            <p className='text-center text-xl text-neutral-200'>{description || `Description of ${username}`}</p>
          </div>
          <div className='flex gap-4'>
            <a
              href={visible.supportForm ? "#support-form" : "#"}
              className='bg-[#d5ba80] duration-200 cursor-pointer hover:brightness-120 text-black font-bold py-3 text-lg px-7 rounded-xl'
            >
              Support
            </a>
            {creatorUsername ? (
              <FollowButton
                creatorUsername={creatorUsername}
                initialFollowed={isFollowed}
                initialFollowersCount={followersCount}
              />
            ) : (
              <button
                type="button"
                className='border border-[#d5ba80] duration-200 cursor-pointer hover:bg-[#d5ba80] hover:text-black font-bold py-3 text-lg px-7 rounded-xl'
              >
                Follow {username}
              </button>
            )}
          </div>
        </div>
      </SectionShell>

      <SectionShell
        sectionKey="stats"
        visible={visible.stats}
        editable={editable}
        showHiddenInPreview={showHiddenInPreview}
        onToggleSection={onToggleSection}
      >
        <div className='flex gap-4 flex-wrap justify-center mt-6 px-4'>
          <div className="px-6 items-center bg-neutral-900 rounded-xl cursor-default hover:bg-[#111] duration-200 border-[#111] py-4 text-lg flex flex-col">
            <span className='text-xl'>{supportersCount}</span>
            <p className='text-sm opacity-80'>Supporters</p>
          </div>
          <div className="px-6 items-center bg-neutral-900 rounded-xl cursor-default hover:bg-[#111] duration-200 border-[#111] py-4 text-lg flex flex-col">
            <span className='text-xl'>{followersCount}</span>
            <p className='text-sm opacity-80'>Followers</p>
          </div>
          <div className="px-6 items-center bg-neutral-900 rounded-xl cursor-default hover:bg-[#111] duration-200 border-[#111] py-4 text-lg flex flex-col">
            <span className='text-xl'>{membersCount}</span>
            <p className='text-sm opacity-80'>Members</p>
          </div>
        </div>
      </SectionShell>

      <div className='max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-6'>
        <div className='flex flex-col gap-6'>
          <SectionShell
            sectionKey="about"
            visible={visible.about}
            editable={editable}
            showHiddenInPreview={showHiddenInPreview}
            onToggleSection={onToggleSection}
          >
            <section className='bg-neutral-900/95 border border-neutral-800 rounded-2xl p-6'>
              <h2 className='text-2xl font-semibold'>About Me</h2>
              <p className='mt-4 text-neutral-200 leading-7'>
                {description || `Hey, I am ${username}. I am building projects, sharing progress, and creating a close community for people who want to support my work.`}
              </p>
            </section>
          </SectionShell>

          <SectionShell
            sectionKey="socialLinks"
            visible={visible.socialLinks}
            editable={editable}
            showHiddenInPreview={showHiddenInPreview}
            onToggleSection={onToggleSection}
          >
            <section className='bg-neutral-900/95 border border-neutral-800 rounded-2xl p-6'>
              <h2 className='text-2xl font-semibold'>Social Links</h2>
              <div className='mt-3 flex flex-wrap gap-3'>
                {linkEntries.length ? (
                  linkEntries.map(([key, value]) => {
                    const iconType = resolveSocialIconType(key, value);
                    const icon = iconType ? <SocialIcon type={iconType} /> : null;

                    return (
                      <a
                        key={`${key}-${value}`}
                        href={toHref(value)}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={key}
                        title={key}
                        className='px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-950 hover:bg-neutral-800 duration-200 text-sm inline-flex items-center justify-center min-h-10 min-w-10'
                      >
                        {icon || key}
                      </a>
                    );
                  })
                ) : (
                  <p className='text-sm text-neutral-400'>No links added yet.</p>
                )}
              </div>
            </section>
          </SectionShell>

          <SectionShell
            sectionKey="memberships"
            visible={visible.memberships}
            editable={editable}
            showHiddenInPreview={showHiddenInPreview}
            onToggleSection={onToggleSection}
          >
            <section className='bg-neutral-900/95 border border-neutral-800 rounded-2xl p-6'>
              <h2 className='text-2xl font-semibold'>Memberships</h2>
              <p className='text-neutral-300 mt-2'>Choose a tier to get special perks and support {username}.</p>

              <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
                {tiers.map((tier, index) => (
                  <div
                    key={`${tier?.name || "tier"}-${index}`}
                    className={`rounded-2xl border bg-linear-to-b p-4 ${tierStyles[Math.min(index, tierStyles.length - 1)]}`}
                  >
                    <p className='text-2xl font-bold text-[#f2d6a0] text-center'>${tier?.price ?? 0}</p>
                    <h3 className='text-lg font-semibold text-center mt-1'>{tier?.name || `Tier ${index + 1}`}</h3>
                    <p className='text-xs text-neutral-300 text-center mt-1'>
                      {tier?.description || "Support this creator and unlock exclusive perks."}
                    </p>
                    <div className='h-px bg-neutral-700/70 my-3'></div>
                    <ul className='space-y-2 text-xs text-neutral-200'>
                      <li>{tier?.description || "Exclusive members-only content."}</li>
                    </ul>
                    <button className='mt-4 w-full cursor-pointer py-2 rounded-lg bg-[#d5ba80] text-black font-semibold hover:brightness-110 duration-200'>
                      Join ${tier?.price ?? 0}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </SectionShell>
        </div>

        <SectionShell
          sectionKey="recentSupporters"
          visible={visible.recentSupporters}
          editable={editable}
          showHiddenInPreview={showHiddenInPreview}
          onToggleSection={onToggleSection}
        >
          <aside className='bg-neutral-900/95 border border-neutral-800 rounded-2xl p-6 h-fit'>
            <h2 className='text-2xl font-semibold'>Recent Supporters</h2>
            <p className='text-neutral-300 mt-2'>People, who recently supported {username}!</p>

            <div className='mt-5 space-y-4'>
              {recentSupporters.map((supporter, index) => (
                <div
                  key={supporter?.id || supporter?._id?.toString?.() || `supporter-${index}`}
                  className='flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800'
                >
                  <div className='flex items-center gap-3'>
                    <img
                      src={supporter?.profileImage || "/king.jpg"}
                      alt='Supporter profile'
                      className='size-10 rounded-full object-cover bg-neutral-700'
                    />
                    <div>
                      <p className='font-medium'>{supporter?.name || "Anonymous"}</p>
                      <p className='text-xs text-neutral-400'>{truncateText(supporter?.message) || "-"}</p>
                    </div>
                  </div>
                  <p className='text-[#d5ba80] font-semibold'>${supporter?.amount ?? 0}</p>
                </div>
              ))}
              {!recentSupporters.length ? <p className='text-sm text-neutral-400'>No supporters yet.</p> : null}
            </div>
          </aside>
        </SectionShell>
      </div>

      <div className={`max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 gap-6 ${visible.supportForm || showHiddenInPreview ? "lg:grid-cols-[6fr_4fr]" : "lg:grid-cols-1"}`}>
        <div className='flex flex-col gap-6'>
          <SectionShell
            sectionKey="currentGoal"
            visible={visible.currentGoal}
            editable={editable}
            showHiddenInPreview={showHiddenInPreview}
            onToggleSection={onToggleSection}
          >
            <div className='bg-neutral-900/95 border border-neutral-800 rounded-2xl p-6'>
              <h2 className='text-2xl font-semibold'>Current Goal</h2>
              <p className='text-neutral-300 mt-2'>Help {username} reach this month&apos;s goal.</p>
              <div className='mt-4'>
                <div className='flex justify-between text-sm text-neutral-300 mb-2'>
                  <span>Raised: $1,250</span>
                  <span>Goal: $2,000</span>
                </div>
                <div className='h-3 w-full bg-neutral-800 rounded-full overflow-hidden'>
                  <div className='h-full w-[62%] bg-[#d5ba80]'></div>
                </div>
              </div>
            </div>
          </SectionShell>

          <SectionShell
            sectionKey="supportUnlocks"
            visible={visible.supportUnlocks}
            editable={editable}
            showHiddenInPreview={showHiddenInPreview}
            onToggleSection={onToggleSection}
          >
            <div className='bg-neutral-900/95 border border-neutral-800 rounded-2xl p-6'>
              <h3 className='text-xl font-semibold'>What Support Unlocks</h3>
              <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr'>
                <div className='rounded-xl bg-neutral-950 border border-neutral-800 h-full p-4'>
                  <p className='text-sm text-[#d5ba80]'>Weekly Content</p>
                  <p className='text-sm text-neutral-300 mt-1'>New tutorials, behind-the-scenes posts, and short dev logs.</p>
                </div>
                <div className='rounded-xl bg-neutral-950 border border-neutral-800 h-full p-4'>
                  <p className='text-sm text-[#d5ba80]'>Community Perks</p>
                  <p className='text-sm text-neutral-300 mt-1'>Priority replies, polls, and member-only interaction spaces.</p>
                </div>
                <div className='rounded-xl bg-neutral-950 border border-neutral-800 h-full p-4'>
                  <p className='text-sm text-[#d5ba80]'>Gear & Tools</p>
                  <p className='text-sm text-neutral-300 mt-1'>Support goes into software, hosting, and better production setup.</p>
                </div>
                <div className='rounded-xl bg-neutral-950 border border-neutral-800 h-full p-4'>
                  <p className='text-sm text-[#d5ba80]'>Shoutouts</p>
                  <p className='text-sm text-neutral-300 mt-1'>Top supporters get highlighted in upcoming creator posts.</p>
                </div>
              </div>
            </div>
          </SectionShell>
        </div>

        <SectionShell
          sectionKey="supportForm"
          visible={visible.supportForm}
          editable={editable}
          showHiddenInPreview={showHiddenInPreview}
          onToggleSection={onToggleSection}
        >
          <div id="support-form">
            <QuickSupportForm creatorUsername={creatorUsername} disabled={supportFormDisabled} />
          </div>
        </SectionShell>
      </div>
    </>
  );
}

