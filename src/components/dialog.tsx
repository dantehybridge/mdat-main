import React from "react";

interface DialogProps {
  open: boolean;
  onConfirm: () => void;
  onDiscard: () => void;
  children?: React.ReactNode;
}

export default function Dialog({ open, onConfirm, onDiscard, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm" style={{ backgroundColor: "rgba(243, 244, 246, 0.7)" }}>
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center space-y-5">
        {children}

        <div className="flex justify-center gap-4 mt-6">    
          <button
            onClick={onDiscard}
            className="bg-gray-200 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition font-semibold"
          >
            Yes, log me out
          </button>
        </div>
      </div>
    </div>
  );
}
