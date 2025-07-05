import React, { useState } from "react";

interface TokenFieldProps {
  label: string;
  token?: string;
  cypher?: boolean;    // always true in this case
  reveals?: boolean; // root role enables toggle
}

function mask(token = "", visible = 24) {
  return token.length > visible ? token.slice(0, visible) + "..." : "********";
}

export default function Field({ label, token, cypher, reveals }: TokenFieldProps) {
  const [showToken, setShowToken] = useState(false);

  // Always mask tokens (cypher = true) unless user toggles to show (only root can toggle)
  let displayValue = token || "(empty)";

  if (reveals) {
    displayValue = showToken ? token || "(empty)" : mask(token);
  } else if (cypher) {
    displayValue = mask(token);
  }

  return (
    <div>
      <label className="block text-gray-600 font-medium mb-1">{label}:</label>
      <div className="bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-800 break-all flex justify-between items-center">
        <span>{displayValue}</span>
        {reveals && (
          <button
            onClick={() => setShowToken(!showToken)}
            className="ml-4 text-blue-600 hover:underline focus:outline-none"
            type="button"
            aria-label={showToken ? "Hide token" : "Show token"}
          >
            {showToken ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
}
