// Talks to https://github.com/arpanwayne/plotra-lens-backend
//
// VITE_API_URL can override this at build time; falls back to the deployed
// backend so the app works out of the box without extra config.
const API_BASE_URL =
  (import.meta.env["VITE_API_URL"] as string | undefined)?.replace(/\/$/, "") ||
  "https://plotra-lens-backend.vercel.app";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    // no JSON body (e.g. network-level failure) — fall through to generic error
  }

  if (!res.ok) {
    const message =
      (body && typeof body === "object" && "error" in body && typeof body.error === "string"
        ? body.error
        : null) ?? "Something went wrong. Please try again.";
    throw new ApiError(message, res.status);
  }

  return body as T;
}

export type Dealer = {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  plan: string;
};

export function login(email: string, password: string) {
  return request<{ token: string; dealer: Dealer }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function forgotPassword(email: string) {
  return request<{ message: string; devResetToken?: string }>("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(token: string, password: string) {
  return request<{ message: string }>("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, password }),
  });
}

export function submitAccessRequest(input: {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  message?: string | undefined;
}) {
  return request<{ message: string }>("/api/access-requests", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

const AUTH_TOKEN_KEY = "plotra_lens_token";
const AUTH_DEALER_KEY = "plotra_lens_dealer";

export function saveSession(token: string, dealer: Dealer) {
  sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  sessionStorage.setItem(AUTH_DEALER_KEY, JSON.stringify(dealer));
}

export function getSession(): { token: string; dealer: Dealer } | null {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
  const dealerRaw = sessionStorage.getItem(AUTH_DEALER_KEY);
  if (!token || !dealerRaw) return null;
  try {
    return { token, dealer: JSON.parse(dealerRaw) as Dealer };
  } catch {
    return null;
  }
}

export function clearSession() {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_DEALER_KEY);
}
