import type { UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  searchQuery: string;
}

export function ProfileList({
  profiles,
  searchQuery,
}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">No profiles found</p>
        <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}
