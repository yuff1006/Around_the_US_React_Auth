import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children, path }) {
  return (
    <Route path={path}>
      {isLoggedIn ? children : <Redirect to="/login" />}
    </Route>
  );
}

export default ProtectedRoute;
