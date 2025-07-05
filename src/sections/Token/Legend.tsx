import React from "react";

interface LegendProps {
  roles: string[];
}

export default function Legend({ roles }: LegendProps) {
  return (
    <div className="bg-yellow-100 text-yellow-800 px-4 py-3 rounded text-sm flex flex-wrap items-center gap-1">
      <span>As a&nbsp;</span>
      {roles.map((role, i) => (
        <span
          key={role}
          className="bg-yellow-300 text-yellow-900 font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
        >
          {role}
          {i < roles.length - 1 ? "," : ""}
        </span>
      ))}
      <span>&nbsp;, you don't have enough clearance.</span>
    </div>
  );
}
