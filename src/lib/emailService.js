const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbx9RIB4gmi9WzVX6ljFTJS_NS70x5EXtH3ljFpvDFojY8LyYAwp4mQbzxQr5m5GzpSGmA/exec";

/**
 * Sends email + category to Google Apps Script via GET.
 * Uses no-cors so we never read the response (avoids CORS errors) and never throw.
 * Your script must implement doGet(e) and read e.parameter.email and e.parameter.category.
 */
export async function storeEmail(email, category = "") {
  const params = new URLSearchParams({
    email: (email || "").trim().toLowerCase(),
    category: (category || "").trim(),
  });
  const url = `${WEB_APP_URL}?${params.toString()}`;

  try {
    await fetch(url, { method: "GET", mode: "no-cors" });
  } catch (_) {
    // Ignore so we never show an error; request may still have been sent
  }
  return { success: true };
}

export function getStoredEmails() {
  return [];
}