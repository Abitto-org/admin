import { Navigate } from "react-router-dom";

function App() {
  // const isAuthenticated = checkToken();
  // return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/auth/login" />;

  return <Navigate to="/dashboard" replace />;
}

export default App;
