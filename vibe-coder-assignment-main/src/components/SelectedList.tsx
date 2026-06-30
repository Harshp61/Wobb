import { useInfluencerStore } from '@/store/useInfluencerStore';
import { useNavigate } from 'react-router-dom';
import { ProfileAvatar } from './ProfileAvatar';
import type { UserProfileSummary } from '@/types';
import { getProfileDescriptionText } from '@/utils/profileContent';

export function SelectedList() {
  const { selectedProfiles, removeProfile } = useInfluencerStore();
  const navigate = useNavigate();

  if (selectedProfiles.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Selected Profiles ({selectedProfiles.length})
        </h2>
        <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span>Your list</span>
        </div>
      </div>
      <div className="space-y-2">
        {selectedProfiles.map((profile: UserProfileSummary) => (
          <div
            key={profile.user_id}
            className="group flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700 rounded-xl hover:shadow-md hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer"
            onClick={() => navigate(`/profile/${profile.username}`)}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <ProfileAvatar 
                src={profile.picture} 
                alt={profile.fullname} 
                name={profile.fullname} 
                size="sm" 
                className="ring-2 ring-purple-100 dark:ring-purple-900/50"
              />
              <div className="min-w-0 flex-1">
                <span className="font-medium text-gray-900 dark:text-gray-100 truncate">@{profile.username}</span>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{getProfileDescriptionText(profile, profile.type)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeProfile(profile.user_id);
              }}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all duration-200"
              aria-label="Remove profile"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
