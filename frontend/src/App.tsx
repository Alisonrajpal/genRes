import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Layout/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import ResumeBuilder from "./components/ResumeBuilder/ResumeBuilder";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Templates from "./pages/Templates/Templates";
import Account from "./pages/Account/Account";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App min-h-screen bg-gray-50">
          <Routes>
            {/* SignIn page - accessible without authentication */}
            <Route path="/signin" element={<SignIn />} />

            {/* Protected routes - require authentication */}
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <main>
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <ProtectedRoute>
                            <Home />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/account"
                        element={
                          <ProtectedRoute>
                            <Account />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/builder"
                        element={
                          <ProtectedRoute>
                            <ResumeBuilder />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/templates"
                        element={
                          <ProtectedRoute>
                            <Templates />
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </main>
                </>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
