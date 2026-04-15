const AUTH_KEY = "piers2u_admin_auth";

// In production, replace with a proper auth system (e.g., NextAuth.js).
// This is a simple client-side check for demo/MVP purposes.
const ADMIN_PASSWORD = "piers2u-admin-2025";

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(AUTH_KEY, "authenticated");
    }
    return true;
  }
  return false;
}

export function logout(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(AUTH_KEY);
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "authenticated";
}
