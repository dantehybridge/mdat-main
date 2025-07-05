import React from "react";

interface LegendProps {
  role: string;
}

export default function Legend({ role }: LegendProps) {
  return (
    <div className="bg-yellow-100 text-yellow-800 px-4 py-3 rounded text-sm">
      As a <span className="font-semibold">{role}</span>, you don't have enough clearance.
    </div>
  );
}
