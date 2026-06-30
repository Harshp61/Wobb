import { useEffect, useState } from "react";

interface ProfileAvatarProps {
  src: string | undefined;
  alt: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/** Generates a deterministic HSL color from a string. */
function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 45%)`;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

const sizeMap = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-lg",
  xl: "w-32 h-32 text-4xl",
} as const;

/**
 * Displays a profile picture with an automatic initials fallback
 * when the image URL is broken or unreachable.
 */
export function ProfileAvatar({
  src,
  alt,
  name,
  size = "md",
  className = "",
}: ProfileAvatarProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [src]);

  const sizeClass = sizeMap[size];

  if (!src || imgError) {
    const initials = getInitials(name) || "?";
    const bg = stringToColor(name);
    return (
      <div
        className={`${sizeClass} rounded-full flex items-center justify-center font-bold text-white select-none shrink-0 ${className}`}
        style={{ backgroundColor: bg }}
        aria-label={alt}
        role="img"
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      onError={() => setImgError(true)}
      className={`${sizeClass} rounded-full object-cover shrink-0 ${className}`}
    />
  );
}
