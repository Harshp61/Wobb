import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { ProfileStatsGrid } from "@/components/ProfileStatsGrid";
import { useProfile } from "@/hooks/useProfile";
import { useInfluencerStore } from "@/store/useInfluencerStore";
import { getProfileDescriptionText } from "@/utils/profileContent";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();

  const { profileData, isLoading, error } = useProfile(username);
  const { selectedProfiles, addProfile, removeProfile } = useInfluencerStore();

  if (!username) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-600 text-lg mb-4">Invalid profile username</p>
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout title={`@${username}`}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !profileData) {
    return (
      <Layout title={`@${username}`}>
        <div className="text-center py-12">
          <p className="text-red-600 text-lg mb-4">
            {error || `Could not load profile details for ${username}`}
          </p>
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  const user = profileData.data.user_profile;
  const isSelected = selectedProfiles.some((p) => p.user_id === user.user_id);
  const displayDescription = getProfileDescriptionText(user, user.type);

  const handleToggleList = () => {
    if (isSelected) {
      removeProfile(user.user_id);
    } else {
      addProfile(user);
    }
  };

  return (
    <Layout title={user.fullname}>
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium mb-6 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to search
      </Link>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-32"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row gap-6 -mt-16">
            <div className="relative">
              <ProfileAvatar
                src={user.picture}
                alt={`${user.fullname} profile`}
                name={user.fullname}
                size="xl"
                className="border-4 border-white dark:border-slate-800 shadow-xl"
              />
            </div>
            <div className="flex-1 pt-4">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    @{user.username}
                    <VerifiedBadge verified={user.is_verified} />
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">{user.fullname}</p>
                  {user.type && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium capitalize">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        {user.type}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleToggleList}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/25"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Remove from List
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add to List
                    </>
                  )}
                </button>
              </div>

              {displayDescription && (
                <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">{displayDescription}</p>
              )}

              <ProfileStatsGrid user={user} />

              {user.url && (
                <a
                  href={user.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View on platform
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
