import type { Platform, FullUserProfile, UserProfileSummary } from "@/types";
import { getPlatformLabel } from "./dataHelpers";

type ProfileLike = Partial<Pick<UserProfileSummary, "description" | "fullname" | "username" | "type">> &
  Partial<Pick<FullUserProfile, "description" | "fullname" | "username" | "type">>;

const PROMOTIONAL_PATTERNS = [
  /\b(nft|crypto|token|buy now|buy|subscribe|click the link|join my|link below|limited time|offer|earn money|shoutout|dm me|dm for|exclusive offer)\b/i,
  /https?:\/\/\S+/i,
  /\bfollow me\b/i,
];

const MAX_DESCRIPTION_LENGTH = 100;

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function getFallbackDescription(profile: ProfileLike | null | undefined, platform?: Platform): string {
  const label = platform ? getPlatformLabel(platform) : "creator";
  const username = profile?.username?.trim().toLowerCase();
  const fullname = profile?.fullname?.trim();
  const article = /^[aeiou]/i.test(label) ? "an" : "a";

  if (platform && (username === platform.toLowerCase() || username?.includes(platform.toLowerCase()))) {
    return `Official ${label} account`;
  }

  if (fullname) {
    return `${fullname} is ${article} ${label.toLowerCase()} creator`;
  }

  return `Popular creator on ${label}`;
}

function isPromotional(text: string): boolean {
  return PROMOTIONAL_PATTERNS.some((pattern) => pattern.test(text));
}

export function getProfileDescriptionText(
  profile: ProfileLike | null | undefined,
  platform?: Platform
): string {
  const rawDescription = profile?.description;

  if (!rawDescription) {
    return getFallbackDescription(profile, platform ?? profile?.type);
  }

  const normalized = normalizeWhitespace(rawDescription);

  if (!normalized) {
    return getFallbackDescription(profile, platform ?? profile?.type);
  }

  if (isPromotional(normalized)) {
    return getFallbackDescription(profile, platform ?? profile?.type);
  }

  if (normalized.length > MAX_DESCRIPTION_LENGTH) {
    return `${normalized.slice(0, MAX_DESCRIPTION_LENGTH - 1).trimEnd()}…`;
  }

  return normalized;
}
