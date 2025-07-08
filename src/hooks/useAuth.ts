import { useEffect, useState } from "react";

function parseJwt(token: string): Record<string, any> | null {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

function getTokenExpiry(token: string): number | null {
  const payload = parseJwt(token);
  return payload?.exp ? payload.exp * 1000 : null;
}

export function useAuth() {
  const [accessToken, setAccessToken] = useState<string>("");
  const [idToken, setIdToken] = useState<string>("");
  const [roles, setRoles] = useState<string[]>([]);
  const [showExpiryDialog, setShowExpiryDialog] = useState<boolean>(false);
  const [tokensLoaded, setTokensLoaded] = useState<boolean>(false);

  useEffect(() => {
    const a = sessionStorage.getItem("a") || "";
    const i = sessionStorage.getItem("i") || "";
    const r = sessionStorage.getItem("r");

    setAccessToken(a);
    setIdToken(i);

    if (r) {
      try {
        const parsed = JSON.parse(r);
        if (Array.isArray(parsed)) setRoles(parsed);
      } catch {
        console.warn("Invalid roles format");
      }
    }

    setTokensLoaded(true);

    // Real expiry time (for reference)
    const realExpiry = getTokenExpiry(a);
    if (!realExpiry) return;

    // ----
    // TESTING OVERRIDE: Simulate expiry 2 minutes from now
    const testExpiry = Date.now() + 2 * 60 * 1000; // 2 minutes from now
    // ----

    const now = Date.now();
    const oneMinuteBefore = testExpiry - 60000; // 1 minute before simulated expiry

    if (now >= oneMinuteBefore) {
      setShowExpiryDialog(true);
    } else {
      const timeout = setTimeout(() => {
        setShowExpiryDialog(true);
      }, oneMinuteBefore - now);

      return () => clearTimeout(timeout);
    }
  }, []);

  const allowedRoles: string[] = (import.meta.env.VITE_ROLES || "")
    .split(",")
    .map((r: string) => r.trim().toLowerCase())
    .filter(Boolean);

  const isAuthorized = roles.some((r) =>
    allowedRoles.includes(r.toLowerCase())
  );
  const isRoot = roles.includes("root");
  const restrictedRoles = roles.filter(
    (r) => !allowedRoles.includes(r.toLowerCase())
  );
  const showLegend = restrictedRoles.length > 0 && !isRoot;

  const logout = () => {
    sessionStorage.clear();
    window.location.href = "/auth/config?goodbye=true";
  };

  const reauth = () => {
    sessionStorage.setItem("post-reauth-return", window.location.pathname);
    window.location.href = "/auth/config?refresh=true";
  };

  return {
    accessToken,
    idToken,
    roles,
    isRoot,
    isAuthorized,
    restrictedRoles,
    showLegend,
    showExpiryDialog,
    reauth,
    logout,
    setShowExpiryDialog,
    tokensLoaded,
  };
}
