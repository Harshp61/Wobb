import { useState } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { SelectedList } from "@/components/SelectedList";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  return (
    <Layout title="Find Influencers">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Discover Top Creators
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Browse and connect with influencers across social platforms</p>
      </div>

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <SelectedList />

      <div className="flex items-center justify-between mb-4 px-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-purple-600 dark:text-purple-400">{filtered.length}</span>
          <span className="mx-1">of</span>
          <span className="font-semibold">{allProfiles.length}</span>
          <span className="ml-1">creators on</span>
          <span className="ml-1 font-semibold capitalize">{platform}</span>
        </p>
      </div>

      <ProfileList profiles={filtered} searchQuery={searchQuery} />
    </Layout>
  );
}
