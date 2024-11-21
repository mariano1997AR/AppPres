import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const enviarCode = (code)=>{
      return code;
  }

  //funcion de inicio de sesion con redireccion
  const login = (code) => {;
    if (code === 'adminmariano') {
      enviarCode(code);
      localStorage.setItem('token', 'fake-jwt-token');
      setIsAuthenticated(true);
      setLoading(true); //activar la pantalla de carga
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 1000)
    } else {
      alert('usuario o contrasenia incorrectos');
    }
   
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login'); //redirigir al login al cerrar sesion 
  }


  return { isAuthenticated, loading, login, logout,enviarCode};

}