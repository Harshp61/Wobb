import { useEffect, useState } from "react";
import type { ProfileDetailResponse } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";

/**
 * Hook to load details of a specific influencer profile by their username.
 * Automatically manages loading, error, and caching state.
 */
export function useProfile(username: string | undefined) {
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (!username) {
      setProfileData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = loadProfileByUsername(username);
      if (cancelled) return;
      
      if (data) {
        setProfileData(data);
        setError(null);
      } else {
        setProfileData(null);
        setError(`Could not find profile for ${username}`);
      }
    } catch (err) {
      if (cancelled) return;
      setProfileData(null);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      if (!cancelled) {
        setIsLoading(false);
      }
    }

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { profileData, isLoading, error };
}
