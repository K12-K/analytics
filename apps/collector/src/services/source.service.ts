export function classifySource(referrer?: string) {
  if (!referrer) return "Direct";

  const lower = referrer.toLowerCase();

  if (lower.includes("google")) return "Google";
  if (lower.includes("linkedin")) return "LinkedIn";
  if (lower.includes("twitter") || lower.includes("x.com"))
    return "Twitter";
  if (lower.includes("facebook")) return "Facebook";
  if (lower.includes("instagram")) return "Instagram";
  if (lower.includes("youtube")) return "YouTube";
  if (lower.includes("t.co")) return "Twitter";
  if (lower.includes("mail")) return "Email";
  if (lower.includes("tracker-test-prod.up.railway.app")) return "Tracker-Test"; // TRACKER_TEST_URL=

  return "Other";
}