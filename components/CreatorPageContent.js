"use client";

import React, { useEffect, useState } from "react"
import FollowButton from "./FollowButton"
import QuickSupportForm from "./QuickSupportForm"
import SupportersList from "./SupportersList"
import { normalizePageSections } from "@/lib/pageSections"

const normalizeLinkName = (value = "") => String(value ?? "").trim().toLowerCase().replace(/[\s_-]+/g, "");

const ICON_PATHS = {
  youtube: "/icons/social-youtube.svg",
  mail: "/icons/social-mail.svg",
  github: "/icons/social-github.svg",
  discord: "/icons/social-discord.svg",
  telegram: "/icons/social-telegram.svg",
  portfolio: "/icons/social-portfolio.svg",
  phone: "/icons/social-phone.svg",
};

function resolveSocialIconType(key = "", value = "") {
  const normalizedKey = normalizeLinkName(key)
  const normalizedValue = String(value ?? "").toLowerCase()

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

function SectionShell({ sectionKey, visible, editable = false, showHiddenInPreview = false, onToggleSection, children, }) {
  if (!visible && !showHiddenInPreview) {
    return null;
  }

  const hiddenOnPublic = !visible;

  return (
    <div className={`relative ${hiddenOnPublic && showHiddenInPreview ? "opacity-75" : ""}`}>
      {editable ? (
        <div className="absolute right-3 top-1 z-20 flex items-center gap-2">
          {hiddenOnPublic ? (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-100">
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
  )
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
  totalSupportAmount,
  isFollowed = false,
  supportFormDisabled = false,
  sectionVisibility = {},
  goal,
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
  }

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
  ]
  const [goalBar, setgoalBar] = useState(0)
  useEffect(() => {
    setgoalBar(Math.ceil((totalSupportAmount / goal) * 100))
  }, [])


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
                    const icon = iconType ? <img src={ICON_PATHS[iconType]} alt="" aria-hidden className="size-5" /> : null;

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
                    className={`rounded-2xl border bg-linear-to-b p-4 flex flex-col justify-between ${tierStyles[Math.min(index, tierStyles.length - 1)]}`}
                  >
                    <p className='text-2xl font-bold text-[#f2d6a0] text-center'>${tier?.price ?? 0}</p>
                    <h3 className='text-lg font-semibold text-center mt-1'>{tier?.name || `Tier ${index + 1}`}</h3>
                    <ul className='space-y-2 text-xs text-neutral-200 text-center'>
                      {
                        tier.description.map((e, i) => {
                          return (
                            <li key={i}>{e || "Exclusive members-only content."}</li>
                          )
                        })
                      }
                    </ul>
                    <div>
                      <div className='h-px bg-neutral-700/70 my-3'></div>
                      <button className='mt-4 w-full cursor-pointer py-2 rounded-lg bg-[#d5ba80] text-black font-semibold hover:brightness-110 duration-200'>
                        Join ${tier?.price ?? 0}
                      </button>
                    </div>
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

            <div className='mt-5'>
              <SupportersList
                supporters={recentSupporters}
              />
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
                  <span>Raised: ${totalSupportAmount}</span>
                  <span>Goal: ${goal}</span>
                </div>
                <div className='h-3 w-full bg-neutral-800 rounded-full overflow-hidden'>
                  <div className="h-3 bg-[#caae72]" style={{ width: `${goalBar}%` }}></div>
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
  )
}
