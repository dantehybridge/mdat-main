import React, { useEffect, useState } from "react";
import Head from "./sections/Head";
import Home from "./sections/Home";
import Foot from "./sections/Foot";

import Dialog from "./components/dialog";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const {
    accessToken,
    idToken,
    showExpiryDialog,
    reauth,
    logout,
    tokensLoaded,
    setShowExpiryDialog,
  } = useAuth();

  const [ready, setReady] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Show loading splash screen for 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Countdown logic
  useEffect(() => {
    if (!showExpiryDialog) {
      setCountdown(60);
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          logout(); // 👈 Logout when countdown ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showExpiryDialog]);

  const handleConfirm = () => {
    reauth(); // 👈 Only refresh if the user clicks confirm
  };

  const handleDiscard = () => {
    logout();
  };

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">
          We're getting everything ready for you...
        </p>
      </div>
    );
  }

  if (!tokensLoaded) {
    return null;
  }

  if (!accessToken || !idToken) {
    window.location.href = "/auth/starts";
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Head />
      <main className="flex-grow p-6">
        <Dialog
          open={showExpiryDialog}
          onConfirm={handleConfirm}
          onDiscard={handleDiscard}
          textConfirm="Yes, refresh my session"
          textDiscard="No, log me out"
        >
          <h2 className="text-xl font-semibold mb-2 text-yellow-600">
            👀 Still there?
          </h2>

          <p className="text-gray-700 text-sm mb-2">
            Your session is running out of juice. Want us to plug it back in?
          </p>

          <p className="text-sm text-gray-600 mb-4">
            If you don't answer in{" "}<span className="font-bold text-red-500">{countdown}</span>{" "} second{countdown === 1 ? "" : "s"}, we'll assume you're catching 💤 and log you out.
          </p>
        </Dialog>

        <Home />
      </main>
      <Foot />
    </div>
  );
}
