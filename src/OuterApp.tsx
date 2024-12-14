import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./Security/AuthContext";
import Login from "./Security/Login/Login";
import App, {User} from "./App";
import AppContext from './Data/Context'
import './OuterApp.scss';

// Custom hook to use AppContext in any component
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};


const OuterApp: React.FC = () =>  {
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useState<{ username: string;} | null>(null);
  //const [manifest, setManifest] = useState({appName: ''});

  const [userData, setUserData] = useState<User>({ username: null, name: null });
  const [appName , setAppName] = useState<string>('');

  useEffect(() => {

   // Listen for visibility change events
    const handleVisibilityChange = () => {
      const channel = new BroadcastChannel('app-channel');
      channel.postMessage({ type: 'APP_ACTIVE' });
      channel.close(); // Close the channel after sending the message 

    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);


  return (
    <AppContext.Provider value={{ appName, userData, setAppName, setUserData }}>
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
    </AppContext.Provider>
  );
};

// Wrap the `OuterApp` with `Router`
const AppWrapper: React.FC = () => (
  <Router basename="/secure">
    <OuterApp />
  </Router>
);

export default AppWrapper;
