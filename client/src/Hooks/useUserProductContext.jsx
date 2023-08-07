import { useContext } from "react";
import { UserProductContext } from "../Context/UserProductContext";

export const useUserProductContext = () => {
  const context = useContext(UserProductContext);

  if (!context) {
    throw Error(
      "useuserProductContext must be inside an UserProductContextProvider"
    );
  }

  return context;
};
