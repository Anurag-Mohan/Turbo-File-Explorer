// MyContext.tsx
import React, {
    createContext,
    useContext,
    ReactNode,
    Dispatch,
    SetStateAction,
  } from "react";
  
  type MyContextType = {
    globalState: string; 
    setGlobalState: Dispatch<SetStateAction<string>>;
    globalSearchState: string[]; 
    setGlobalSearchState: React.Dispatch<React.SetStateAction<string[]>>;
  };
  
  const MyContext = createContext<MyContextType | undefined>(undefined);
  
  export const MyContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [globalState, setGlobalState] = React.useState<string>("Search here");
  
    const [globalSearchState, setGlobalSearchState] = React.useState<string[]>([
      " ",
    ]);
  
    return (
      <MyContext.Provider
        value={{
          globalState,
          setGlobalState,
          globalSearchState,
          setGlobalSearchState,
        }}
      >
        {children}
      </MyContext.Provider>
    );
  };
  
  export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
      throw new Error("Context Error");
    }
    return context;
  };