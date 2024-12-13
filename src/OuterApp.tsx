import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./Security/AuthContext";
import Login from "./Security/Login/Login";
import App from "./App";
import Context from './Data/Context';


const OuterApp: React.FC = () =>  {
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useState<{ username: string;} | null>(null);
  const [manifest, setManifest] = useState({appName: ''});

  useEffect(() => {

   // Listen for visibility change events
    const handleVisibilityChange = () => {
      const channel = new BroadcastChannel('app-channel');
      channel.postMessage({ type: 'APP_ACTIVE' });
      channel.close(); // Close the channel after sending the message 

    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    fetch('/secure/manifest.json')
    .then((response) => response.json())
    .then((data) => {debugger; setManifest({appName: data.short_name})})
    .catch((error) => console.error('Error fetching manifest:', error));

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <Context.Provider value={manifest}>
      <AuthProvider>
        <Routes>
          {/* Public Route */}
          <Route
            path="/login"
            element={<Login setAuth={setAuth} />}
          />

          {/* Protected Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Context.Provider>
  );
};

// Wrap the `OuterApp` with `Router`
const AppWrapper: React.FC = () => (
  <Router basename="/secure">
    <OuterApp />
  </Router>
);

export default AppWrapper;
