import React, { useEffect, useState } from "react";

import Field from "./Token/Field";
import Legend from "./Token/Legend";

export default function Home() {
  const [aToken, setAToken] = useState("");
  const [iToken, setIToken] = useState("");
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const a = sessionStorage.getItem("a");
    const i = sessionStorage.getItem("i");
    const r = sessionStorage.getItem("r");

    if (a) setAToken(a);
    if (i) setIToken(i);
    if (r) {
      try {
        const parsed = JSON.parse(r);
        if (Array.isArray(parsed)) setRoles(parsed);
      } catch {
        console.warn("Failed to parse roles");
      }
    }
  }, []);

  const allowedRoles: string[] = (import.meta.env.VITE_ROLES || "")
    .split(",")
    .map((r: string) => r.trim())
    .filter(Boolean);

  // Get restricted roles (not allowed)
  const restrictedRoles = roles.filter((r) => !allowedRoles.includes(r));

  // If all roles are restricted, mask tokens and show Legend
  const isRestricted = restrictedRoles.length > 0;

  return (
    <div className="bg-white rounded shadow p-6 space-y-4">
      <Field label="ID Token" token={iToken} cypher={isRestricted ? "true" : undefined} />
      <Field label="Access Token" token={aToken} cypher={isRestricted ? "true" : undefined} />

      {isRestricted && <Legend roles={restrictedRoles} />}
    </div>
  );
}
