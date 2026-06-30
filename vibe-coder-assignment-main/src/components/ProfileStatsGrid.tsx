import type { FullUserProfile } from "@/types";
import { formatCompactNumber, formatEngagementRate } from "@/utils/formatters";
import { StatCard } from "./StatCard";

interface ProfileStatsGridProps {
  user: FullUserProfile;
}

export function ProfileStatsGrid({ user }: ProfileStatsGridProps) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
      <StatCard label="Followers" value={formatCompactNumber(user.followers, 2)} />
      <StatCard label="Engagement Rate" value={formatEngagementRate(user.engagement_rate)} />
      
      {user.posts_count !== undefined && (
        <StatCard label="Posts" value={user.posts_count} />
      )}
      
      {user.avg_likes !== undefined && (
        <StatCard label="Avg Likes" value={formatCompactNumber(user.avg_likes)} />
      )}
      
      {user.avg_comments !== undefined && (
        <StatCard label="Avg Comments" value={formatCompactNumber(user.avg_comments)} />
      )}
      
      {user.avg_views !== undefined && user.avg_views > 0 && (
        <StatCard label="Avg Views" value={formatCompactNumber(user.avg_views)} />
      )}
      
      {user.engagements !== undefined && (
        <StatCard label="Engagements" value={formatCompactNumber(user.engagements)} />
      )}
    </div>
  );
}
