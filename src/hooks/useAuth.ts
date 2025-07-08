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

    const expiry = getTokenExpiry(a);
    if (!expiry) return;

    const now = Date.now();
    const oneMinuteBefore = expiry - 60000;

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
    window.location.href = "/auth/logout";
  };

  const refreshToken = async () => {
    try {
      const res = await fetch("/auth/refresh", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Token refresh failed");

      const { accessToken: newToken }: { accessToken: string } =
        await res.json();
      sessionStorage.setItem("a", newToken);
      setAccessToken(newToken);
      setShowExpiryDialog(false);
    } catch (err) {
      console.error("Refresh failed", err);
      logout();
    }
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
    refreshToken,
    logout,
    setShowExpiryDialog,
    tokensLoaded,
  };
}
