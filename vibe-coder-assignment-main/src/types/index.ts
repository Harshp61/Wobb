/**
 * Supported platforms in the application
 */
export type Platform = "instagram" | "youtube" | "tiktok";

/**
 * Summary of a user profile retrieved from search listings
 */
export interface UserProfileSummary {
  user_id: string;
  username: string;
  url: string;
  picture: string;
  fullname: string;
  is_verified: boolean;
  followers: number;
  engagements?: number;
  engagement_rate?: number;
  handle?: string;
  avg_views?: number;
}

/**
 * A single account wrapper returned in searches
 */
export interface SearchAccount {
  account: {
    user_profile: UserProfileSummary;
    audience_source: string;
  };
}

/**
 * Platform search response format
 */
export interface SearchData {
  total: number;
  accounts: SearchAccount[];
}

/**
 * Detailed user profile model containing full stats
 */
export interface FullUserProfile extends UserProfileSummary {
  type?: Platform;
  description?: string;
  is_business?: boolean;
  posts_count?: number;
  avg_likes?: number;
  avg_comments?: number;
  avg_reels_plays?: number;
  gender?: string;
  age_group?: string;
}

/**
 * Detailed profile load response format
 */
export interface ProfileDetailResponse {
  cached?: boolean;
  data: {
    success: boolean;
    user_profile: FullUserProfile;
  };
}

