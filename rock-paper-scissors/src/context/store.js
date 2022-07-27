import { createContext, useContext, useState } from "react";
import { initialState } from "../utils/helpers/store.helpers";

const StoreContext = createContext()

const StoreContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  
  return <StoreContext.Provider value={{state, setState, ...state}}>{children}</StoreContext.Provider>;
}

const useStoreContext = () => useContext(StoreContext);

export {
    StoreContextProvider, 
    useStoreContext,
}