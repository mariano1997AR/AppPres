import {useAuth} from '../../hooks/useAuth.js';
import {Loader} from '../Loader.jsx';
import { Login } from '../Login/Login.jsx';


// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated,loading } = useAuth();

  //   // Muestra la pantalla de carga mientras se verifica la autenticación
  if (loading) {
    return <Loader></Loader>;
  }

    // Si el usuario no está autenticado, redirige al login
    if (!isAuthenticated) {
        return <Login />;
    }
  // Si está autenticado, renderiza el contenido protegido
  return children;
};
