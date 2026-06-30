import { describe, expect, it } from "vitest";
import { getProfileDescriptionText } from "./profileContent";

describe("getProfileDescriptionText", () => {
  it("uses a concise fallback for promotional descriptions", () => {
    const description = getProfileDescriptionText({
      username: "cristiano",
      fullname: "Cristiano Ronaldo",
      description: "Join my NFT journey on @Binance. Click the link below to get started.",
    }, "instagram");

    expect(description).toBe("Cristiano Ronaldo is an instagram creator");
  });

  it("truncates verbose descriptions", () => {
    const description = getProfileDescriptionText({
      username: "mrbeast",
      fullname: "MrBeast",
      description:
        "I want to make the world a better place before I die and I love creating huge challenges for amazing causes.",
    });

    expect(description).toContain("I want to make the world a better place before I die");
    expect(description.endsWith("…")).toBe(true);
  });
});
