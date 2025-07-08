import React from "react";

import Field from "./Token/Field";
import Legend from "./Token/Legend";

import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const {
    accessToken,
    idToken,
    isRoot,
    restrictedRoles,
    showLegend,
  } = useAuth();

  const cypher = true;

  return (
    <div className="bg-white rounded shadow p-6 space-y-4">
      <Field label="ID Token" token={idToken} cypher={cypher} reveals={isRoot} />
      <Field label="Access Token" token={accessToken} cypher={cypher} reveals={isRoot} />
      {showLegend && <Legend roles={restrictedRoles} />}
    </div>
  );
}
