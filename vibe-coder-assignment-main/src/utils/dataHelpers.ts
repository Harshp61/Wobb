import instagramData from "@/assets/data/search/instagram.json";
import youtubeData from "@/assets/data/search/youtube.json";
import tiktokData from "@/assets/data/search/tiktok.json";
import type {
  Platform,
  ProfileDetailResponse,
  SearchData,
  UserProfileSummary,
} from "@/types";

const platformData: Record<Platform, SearchData> = {
  instagram: instagramData as SearchData,
  youtube: youtubeData as SearchData,
  tiktok: tiktokData as SearchData,
};

type ProfileImageSource = Partial<UserProfileSummary> & Record<string, unknown>;

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json",
  { eager: true }
);

const detailProfilesByUsername = new Map<string, ProfileImageSource>();
const detailProfilesByUserId = new Map<string, ProfileImageSource>();
const detailProfilesByUrl = new Map<string, ProfileImageSource>();

const profilePictureOverridesByUserId = new Map<string, string>([
  [
    "UCq-Fj5jknLsUf-MWSy4_brA",
    "https://imgs.search.brave.com/Uqwy-uDi-JtXDXCIqfv4kgY2M09sv843FXltpZDz-cQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/Lmx1c2hhLmNvL2Qv/Y29tcGFueV8yOTA1/Njg1NV9sb2dvLmpw/Zw",
  ],
  [
    "UCFFbwnve3yF62-tVXkTyHqg",
    "http://yt3.googleusercontent.com/zGnrFUqmF6Xp2tM8ecG9sVXyHjJUrqa7GnNV_kATAdAvSwfgIg7693GURHASA7C6OPK3YmGZ=s160-c-k-c0x00ffffff-no-rj",
  ],
  [
    "UC-lHJZR3Gqxm24_Vd_AJ5Yw",
    "https://yt3.googleusercontent.com/vik8mAiwHQbXiFyKfZ3__p55_VBdGvwxPpuPJBBwdbF0PjJxikXhrP-C3nLQAMAxGNd_-xQCIg=s160-c-k-c0x00ffffff-no-rj",
  ],
  [
    "UCvlE5gTbOvjiolFlEm-c_Ow",
    "https://yt3.googleusercontent.com/il7dQx5fz3qs2ykOvWQVhtjT-_grY_oPmXlah13q694r_5zUS_7M33pBuUC34Cq0VearBaT1NOE=s160-c-k-c0x00ffffff-no-rj",
  ],
  [
    "UCpEhnqL0y41EpW2TvWAHD7Q",
    "https://yt3.googleusercontent.com/vmmZsYmryt238vqck4KAYf69gOSu22ZfqVE3rwT1tYz4hr68xl7crIUK7kghQgR6RiB9IlQ5mQ=s160-c-k-c0x00ffffff-no-rj",
  ],
]);

function addProfileImageSource(profile: ProfileImageSource) {
  if (typeof profile.picture !== "string" || !profile.picture) return;

  if (typeof profile.username === "string" && profile.username) {
    detailProfilesByUsername.set(profile.username.toLowerCase(), profile);
  }

  if (typeof profile.user_id === "string" && profile.user_id) {
    detailProfilesByUserId.set(profile.user_id, profile);
  }

  if (typeof profile.url === "string" && profile.url) {
    detailProfilesByUrl.set(profile.url.toLowerCase(), profile);
  }
}

function collectProfileImageSources(value: unknown) {
  if (!value || typeof value !== "object") return;

  if (Array.isArray(value)) {
    value.forEach(collectProfileImageSources);
    return;
  }

  const maybeProfile = value as ProfileImageSource;
  if (
    typeof maybeProfile.picture === "string" &&
    (typeof maybeProfile.username === "string" ||
      typeof maybeProfile.user_id === "string" ||
      typeof maybeProfile.url === "string")
  ) {
    addProfileImageSource(maybeProfile);
  }

  Object.values(value).forEach(collectProfileImageSources);
}

Object.values(profileModules).forEach((module) => {
  const profileData =
    (module as { default?: ProfileDetailResponse }).default ?? module;
  collectProfileImageSources(profileData);
});

export function getSearchData(platform: Platform): SearchData {
  return platformData[platform];
}

export function extractProfiles(platform: Platform): UserProfileSummary[] {
  const data = getSearchData(platform);
  return data.accounts.map((item) => {
    const searchProfile = item.account.user_profile;
    const detailProfile =
      detailProfilesByUsername.get(searchProfile.username.toLowerCase()) ??
      detailProfilesByUserId.get(searchProfile.user_id) ??
      detailProfilesByUrl.get(searchProfile.url.toLowerCase());

    return {
      ...searchProfile,
      picture:
        profilePictureOverridesByUserId.get(searchProfile.user_id) ||
        detailProfile?.picture ||
        searchProfile.picture,
      type: platform,
    };
  });
}

export function filterProfiles(
  profiles: UserProfileSummary[],
  query: string
): UserProfileSummary[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return profiles;
  return profiles.filter((p) => {
    const matchUsername = p.username.toLowerCase().includes(normalizedQuery);
    const matchFullname = p.fullname.toLowerCase().includes(normalizedQuery);
    return matchUsername || matchFullname;
  });
}

export const PLATFORMS: Platform[] = ["instagram", "youtube", "tiktok"];

export function getPlatformLabel(platform: Platform): string {
  if (platform === "instagram") return "Instagram";
  if (platform === "youtube") return "YouTube";
  return "TikTok";
}





