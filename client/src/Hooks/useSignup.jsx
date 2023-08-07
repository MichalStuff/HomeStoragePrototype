import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const API = import.meta.env.VITE_API;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const clearError = () => {
    setError(null);
    console.log("clear error");
  };

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${API}/user/signu`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      // console.log(json);
      // console.log(error);
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error, clearError };
};
