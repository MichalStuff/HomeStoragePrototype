import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const API = import.meta.env.VITE_API;
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const { dispatch } = useAuthContext();
  // use inside input to clear Error message after changing character
  const clearError = () => {
    setError(null);
    console.log("clear error");
  };

  const login = async (email, password) => {
    setError(null);
    setIsLoading(true);
    const response = await fetch(`${API}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log(response);
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      //save user to the local storage
      localStorage.setItem("user", JSON.stringify(json));
      // update auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error, clearError };
};
