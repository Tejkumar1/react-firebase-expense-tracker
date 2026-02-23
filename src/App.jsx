import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // make sure this path is correct
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";


export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      console.log("Auth user:", u);
      setUser(u);
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);


  if (checking) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Loading authentication...</h2>
      </div>
    );
  }

  return (
    
      <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard user={user} /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    
  );
}
