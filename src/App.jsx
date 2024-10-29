
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Dashboard } from './components/Login/Dashboard';
import { ProtectedRoute } from './components/protectedRules/ProtectedRoute.jsx';
import './App.css'
import { ObtenerApp } from './components/ObtenerApp/ObtenerApp.jsx';
import { useState, useEffect } from 'react';
import { Loader } from './components/Loader.jsx';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <BrowserRouter basename='/AppPres'>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path='/obtenerApp' element={<ObtenerApp></ObtenerApp>} />
          </Routes>
        </Router>
      )}
    </BrowserRouter>
  )
}

export default App
