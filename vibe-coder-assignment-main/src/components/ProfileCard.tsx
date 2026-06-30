import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { useInfluencerStore } from "@/store/useInfluencerStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { selectedProfiles, addProfile, removeProfile } = useInfluencerStore();

  const isSelected = selectedProfiles.some((p) => p.user_id === profile.user_id);

  const handleClick = () => {
    navigate(`/profile/${profile.username}?platform=${platform}`);
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
      className="flex items-center gap-3 p-3 border border-gray-300 mb-2 cursor-pointer hover:bg-gray-50 w-[700px]"
      data-search={searchQuery}
    >
      <img
        src={profile.picture}
        alt={`${profile.fullname} profile`}
        className="w-12 h-12 rounded-full"
      />
      <div className="text-left flex-1">
        <div className="font-bold">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-600">{profile.fullname}</div>
        <div className="text-sm">{formatFollowers(profile.followers)}</div>
      </div>
      <button
        type="button"
        onClick={handleToggleList}
        className={`px-3 py-1 text-sm rounded font-medium transition-colors ${
          isSelected
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-gray-800 hover:bg-gray-900 text-white"
        }`}
      >
        {isSelected ? "Remove" : "Add to List"}
      </button>
    </div>
  );
}

