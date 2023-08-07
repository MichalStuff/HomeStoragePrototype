import Welcome from "./Views/Welcome";
import { useAuthContext } from "./Hooks/useAuthContext";
import Home from "./Views/Home";
import Layout from "./Components/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Views/Login";
import Signup from "./Views/Signup";
import Scanner from "./Views/Scanner";
import Storage from "./Views/Storage";
import { useEffect } from "react";
import { useUserProductContext } from "./Hooks/useUserProductContext";
import Add from "./Views/Add";

const App = () => {
  const { user } = useAuthContext();
  const { dispatch } = useUserProductContext();
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchUserItems = async () => {
      const response = await fetch(`${API}/user/get/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      dispatch({ type: "ADD_ITEMS", payload: json });
    };
    if (user) fetchUserItems();
  }, [user]);

  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/welcome" />}
          />
          <Route
            path="/welcome"
            element={!user ? <Welcome /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/scan"
            element={user ? <Scanner /> : <Navigate to="/welcome" />}
          />
          <Route
            path="/storage"
            element={user ? <Storage /> : <Navigate to="/welcome" />}
          />
          <Route
            path="/add"
            element={user ? <Add /> : <Navigate to="/welcome" />}
          />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default App;
