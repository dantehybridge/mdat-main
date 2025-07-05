import React from "react";

interface TokenFieldProps {
  label: string;
  token?: string;
  cypher?: string;
}

function mask(token = "", visible = 6) {
  return token.length > visible ? token.slice(0, visible) + "..." : "********";
}

export default function Field({ label, token, cypher }: TokenFieldProps) {
  const displayValue = cypher ? mask(token, 24) : token;

  return (
    <div>
      <label className="block text-gray-600 font-medium mb-1">{label}:</label>
      <div className="bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-800 break-all">
        {displayValue || "(empty)"}
      </div>
    </div>
  );
}
