import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const UserProductContext = createContext();

export const UserProductReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEMS":
      return { userItems: action.payload };

    case "UPDATE_ITEMS": {
      let updatedItem = action.payload;
      return {
        userItems: [
          ...state.userItems.filter((item) => item._id !== action.payload._id),
          updatedItem,
        ],
      };
    }
    default:
      return state;
  }
};

export const UserProductContextProvier = ({ children }) => {
  const [state, dispatch] = useReducer(UserProductReducer, {
    userItems: null,
  });

  return (
    <UserProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserProductContext.Provider>
  );
};

UserProductContextProvier.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProductContext;
