import { useNavigate } from "react-router-dom";
import type { UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { ProfileAvatar } from "./ProfileAvatar";
import { formatFollowers } from "@/utils/formatters";
import { useInfluencerStore } from "@/store/useInfluencerStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  searchQuery: string;
}

export function ProfileCard({
  profile,
  searchQuery,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { selectedProfiles, addProfile, removeProfile } = useInfluencerStore();

  const isSelected = selectedProfiles.some((p) => p.user_id === profile.user_id);

  const handleClick = () => {
    navigate(`/profile/${profile.username}`);
  };

  const handleToggleList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      removeProfile(profile.user_id);
    } else {
      addProfile(profile);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl cursor-pointer hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:-translate-y-1"
      data-search={searchQuery}
    >
      <div className="relative">
        <ProfileAvatar
          src={profile.picture}
          alt={`${profile.fullname} profile`}
          name={profile.fullname}
          size="lg"
          className="ring-4 ring-transparent group-hover:ring-purple-100 dark:group-hover:ring-purple-900/50 transition-all duration-300"
        />
        {isSelected && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <div className="text-left flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-gray-900 dark:text-gray-100 truncate">@{profile.username}</span>
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">{profile.fullname}</div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">{formatFollowers(profile.followers)}</span>
          <span className="text-xs text-gray-400">followers</span>
        </div>
      </div>
      <button
        type="button"
        onClick={handleToggleList}
        className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
          isSelected
            ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/25"
            : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
        }`}
      >
        {isSelected ? "Remove" : "Add"}
      </button>
    </div>
  );
}

