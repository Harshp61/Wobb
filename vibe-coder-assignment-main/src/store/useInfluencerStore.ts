import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";

export interface InfluencerStore {
  selectedProfiles: UserProfileSummary[];
  addProfile: (profile: UserProfileSummary) => void;
  removeProfile: (userId: string) => void;
  clearSelection: () => void;
}

export const useInfluencerStore = create<InfluencerStore>()(
  persist(
    (set) => ({
      selectedProfiles: [],
      addProfile: (profile) =>
        set((state) => {
          const exists = state.selectedProfiles.some((p) => p.user_id === profile.user_id);
          if (exists) return {};
          return { selectedProfiles: [...state.selectedProfiles, profile] };
        }),
      removeProfile: (userId) =>
        set((state) => ({
          selectedProfiles: state.selectedProfiles.filter((p) => p.user_id !== userId),
        })),
      clearSelection: () => set({ selectedProfiles: [] }),
    }),
    {
      name: "influencer-list-storage",
    }
  )
);
