import React, { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import auth from "./context/AuthContext";

const Login = React.lazy(() => import("./components/Login"));
const Profile = React.lazy(() => import("./components/Profile"));

function App() {
  const { isAuth } = auth.useAuth();
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuth ? (
              <Suspense fallback={<h1>Loading...</h1>}>
                <Login />
              </Suspense>
            ) : (
              <Navigate to={"/"} state={{ from: location }} replace />
            )
          }
        />
        <Route path="/" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
