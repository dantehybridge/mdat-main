import React from "react";

interface LegendProps {
  roles: string[];
}

export default function Legend({ roles }: LegendProps) {
  return (
    <div className="p-4 bg-yellow-50 border border-yellow-400 rounded">
      <p className="font-semibold mb-2">Restricted roles:</p>
      <ul className="list-disc list-inside space-y-1">
        {roles.map((role) => (
          <li key={role} className="text-red-600">
            {role}
          </li>
        ))}
      </ul>
    </div>
  );
}
