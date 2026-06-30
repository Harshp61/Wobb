import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { ProfileStatsGrid } from "@/components/ProfileStatsGrid";
import { useProfile } from "@/hooks/useProfile";
import { useInfluencerStore } from "@/store/useInfluencerStore";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";

  const { profileData, isLoading, error } = useProfile(username);
  const { selectedProfiles, addProfile, removeProfile } = useInfluencerStore();

  if (!username) {
    return (
      <Layout>
        <p className="text-red-600">Invalid profile username</p>
        <Link to="/" className="text-blue-600 underline">Back</Link>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-gray-400">Loading...</p>
      </Layout>
    );
  }

  if (error || !profileData) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-red-600 mb-4">
          {error || `Could not load profile details for ${username}`}
        </p>
        <Link to="/" className="text-blue-600 underline">
          Back to search
        </Link>
      </Layout>
    );
  }

  const user = profileData.data.user_profile;
  const isSelected = selectedProfiles.some((p) => p.user_id === user.user_id);

  const handleToggleList = () => {
    if (isSelected) {
      removeProfile(user.user_id);
    } else {
      addProfile(user);
    }
  };

  return (
    <Layout title={user.fullname}>
      <Link to="/" className="text-sm text-blue-600 mb-4 inline-block">
        ← Back to search
      </Link>

      <div className="flex gap-6 items-start text-left max-w-2xl mx-auto">
        <ProfileAvatar
          src={user.picture}
          alt={`${user.fullname} profile`}
          name={user.fullname}
          size="lg"
          className="border"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold">
            @{user.username}
            <VerifiedBadge verified={user.is_verified} />
          </h2>
          <p className="text-gray-600">{user.fullname}</p>
          <p className="text-xs text-gray-400 mt-1">
            Platform: {user.type || platform}
          </p>

          {user.description && (
            <p className="mt-3 text-sm text-gray-700">{user.description}</p>
          )}

          <ProfileStatsGrid user={user} />

          {user.url && (
            <a
              href={user.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-blue-600 text-sm"
            >
              View on platform →
            </a>
          )}

          <button
            onClick={handleToggleList}
            className={`block mt-4 px-4 py-2 rounded text-sm font-medium transition-colors ${
              isSelected
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gray-800 hover:bg-gray-900 text-white"
            }`}
          >
            {isSelected ? "Remove from List" : "Add to List"}
          </button>
        </div>
      </div>
    </Layout>
  );
}
