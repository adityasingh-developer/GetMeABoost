const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export async function verifyRecaptchaToken(token, expectedAction) {
  const secret = process.env.CAPTCHA_SECRET_KEY;

  if (!secret || !token) {
    return { success: false, reason: "missing_secret_or_token" };
  }

  const body = new URLSearchParams();
  body.append("secret", secret);
  body.append("response", token);

  const response = await fetch(RECAPTCHA_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    cache: "no-store",
  });

  if (!response.ok) {
    return { success: false, reason: "verification_request_failed" };
  }

  const data = await response.json();
  const actionMatches =
    !expectedAction || !data?.action || data.action === expectedAction;

  return {
    success: Boolean(data?.success) && actionMatches,
    score: typeof data?.score === "number" ? data.score : null,
    action: data?.action || null,
    hostname: data?.hostname || null,
    challengeTs: data?.challenge_ts || null,
    errorCodes: Array.isArray(data?.["error-codes"]) ? data["error-codes"] : [],
  };
}
