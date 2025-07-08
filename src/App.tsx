import Head from './sections/Head';
import Home from './sections/Home';
import Foot from './sections/Foot';

import Dialog from './components/dialog';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const {
    accessToken,
    idToken,
    showExpiryDialog,
    refreshToken,
    logout,
  } = useAuth();

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
          onConfirm={refreshToken}
          onDiscard={logout}
        >
          <h2 className="text-xl font-semibold mb-2">Session Expiring</h2>
          <p className="text-gray-600 text-sm mb-4">
            Your session will expire in less than 1 minute.
          </p>
        </Dialog>
        <Home />
      </main>
      <Foot />
    </div>
  );
}
