import { describe, expect, it } from "vitest";
import { extractProfiles } from "./dataHelpers";
import { loadProfileByUsername } from "./profileLoader";

const youtubeProfiles = extractProfiles("youtube");

function getYoutubeProfile(username: string) {
  const profile = youtubeProfiles.find((item) => item.username === username);
  expect(profile, `Expected ${username} in YouTube search profiles`).toBeDefined();
  return profile!;
}

describe("YouTube profile image overrides", () => {
  it.each([
    [
      "tseries",
      "https://imgs.search.brave.com/Uqwy-uDi-JtXDXCIqfv4kgY2M09sv843FXltpZDz-cQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/Lmx1c2hhLmNvL2Qv/Y29tcGFueV8yOTA1/Njg1NV9sb2dvLmpw/Zw",
    ],
    [
      "setindia",
      "https://yt3.googleusercontent.com/vmmZsYmryt238vqck4KAYf69gOSu22ZfqVE3rwT1tYz4hr68xl7crIUK7kghQgR6RiB9IlQ5mQ=s160-c-k-c0x00ffffff-no-rj",
    ],
    [
      "vladandniki",
      "https://yt3.googleusercontent.com/il7dQx5fz3qs2ykOvWQVhtjT-_grY_oPmXlah13q694r_5zUS_7M33pBuUC34Cq0VearBaT1NOE=s160-c-k-c0x00ffffff-no-rj",
    ],
    [
      "zeemusiccompany",
      "http://yt3.googleusercontent.com/zGnrFUqmF6Xp2tM8ecG9sVXyHjJUrqa7GnNV_kATAdAvSwfgIg7693GURHASA7C6OPK3YmGZ=s160-c-k-c0x00ffffff-no-rj",
    ],
    [
      "PewDiePie",
      "https://yt3.googleusercontent.com/vik8mAiwHQbXiFyKfZ3__p55_VBdGvwxPpuPJBBwdbF0PjJxikXhrP-C3nLQAMAxGNd_-xQCIg=s160-c-k-c0x00ffffff-no-rj",
    ],
  ])("uses the fixed avatar for %s", (username, expectedPicture) => {
    expect(getYoutubeProfile(username).picture).toBe(expectedPicture);
  });

  it("uses handle URLs for Zee Music Company and SET India", () => {
    expect(getYoutubeProfile("zeemusiccompany").url).toBe(
      "https://www.youtube.com/@zeemusiccompany"
    );
    expect(getYoutubeProfile("setindia").url).toBe(
      "https://www.youtube.com/@SETIndia"
    );
  });
});

describe("YouTube detail profiles", () => {
  it.each([
    ["zeemusiccompany", "https://www.youtube.com/@zeemusiccompany"],
    ["setindia", "https://www.youtube.com/@SETIndia"],
  ])("loads %s as a detail profile", async (username, expectedUrl) => {
    const profileData = await loadProfileByUsername(username);

    expect(profileData?.data.success).toBe(true);
    expect(profileData?.data.user_profile.url).toBe(expectedUrl);
    expect(profileData?.data.user_profile.picture).toBe(
      getYoutubeProfile(username).picture
    );
  });
});

