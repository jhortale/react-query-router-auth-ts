import { Navigate } from "react-router-dom"

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const AuthRoute: React.ComponentType<P> = (props) => {
    // Check if the user is authenticated
    // You can use your own authentication logic here
    const isAuthenticated = localStorage.getItem('token') !== null;

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return <Component {...props} />;
  };

  return AuthRoute;
};

export default withAuth