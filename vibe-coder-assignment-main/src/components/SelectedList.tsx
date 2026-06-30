import { useInfluencerStore } from '@/store/useInfluencerStore';
import { useNavigate } from 'react-router-dom';
import type { UserProfileSummary } from '@/types';

export function SelectedList() {
  const { selectedProfiles, removeProfile } = useInfluencerStore();
  const navigate = useNavigate();

  if (selectedProfiles.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No profiles selected.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-xl font-semibold mb-2">Selected Profiles</h2>
      {selectedProfiles.map((profile: UserProfileSummary) => (
        <div
          key={profile.user_id}
          className="flex items-center justify-between p-2 border rounded hover:bg-gray-50 cursor-pointer"
          onClick={() => navigate(`/profile/${profile.username}?platform=instagram`)}
        >
          <div className="flex items-center gap-3">
            <img src={profile.picture} alt={profile.fullname} className="w-8 h-8 rounded-full" />
            <span>@{profile.username}</span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeProfile(profile.user_id);
            }}
            className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
