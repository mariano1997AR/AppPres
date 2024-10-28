import { Navigate } from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth.js';
import {Loader} from '../Loader.jsx';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated,loading } = useAuth();

  //   // Muestra la pantalla de carga mientras se verifica la autenticación
  if (loading) {
    return <Loader></Loader>;
  }

    // Si el usuario no está autenticado, redirige al login
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
  // Si está autenticado, renderiza el contenido protegido
  return children;
};
