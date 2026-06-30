export function formatCompactNumber(count: number, precisionForMillions: number = 2): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(precisionForMillions) + "M";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  }
  return count.toString();
}

export function formatFollowers(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M followers";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(0) + "K followers";
  }
  return count + " followers";
}

export function formatEngagementRate(rate: number | undefined): string {
  if (rate === undefined) return "N/A";
  return (rate * 100).toFixed(2) + "%";
}

