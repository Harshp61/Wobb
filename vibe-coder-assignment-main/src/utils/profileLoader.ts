import type { ProfileDetailResponse } from "@/types";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json",
  { eager: true }
);

export function loadProfileByUsername(
  username: string
): ProfileDetailResponse | null {
  const path = `../assets/data/profiles/${username}.json`;
  const loader = profileModules[path];

  if (!loader) {
    return null;
  }

  try {
    const result = loader as { default?: ProfileDetailResponse } | ProfileDetailResponse;
    const data =
      (result as { default?: ProfileDetailResponse }).default ?? result;
    return data as ProfileDetailResponse;
  } catch (error) {
    return null;
  }
}
