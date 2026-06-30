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
  const [prevUsername, setPrevUsername] = useState<string | undefined>(undefined);

  // Reset state during render if username changes
  if (username !== prevUsername) {
    setPrevUsername(username);
    setProfileData(null);
    setIsLoading(!!username);
    setError(null);
  }

  useEffect(() => {
    if (!username) return;

    let cancelled = false;

    loadProfileByUsername(username)
      .then((data) => {
        if (cancelled) return;
        if (data) {
          setProfileData(data);
          setError(null);
        } else {
          setProfileData(null);
          setError(`Could not find profile for ${username}`);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setProfileData(null);
        setError(err instanceof Error ? err.message : String(err));
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { profileData, isLoading, error };
}
