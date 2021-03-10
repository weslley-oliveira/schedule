import { createContext, ReactNode, useState } from "react";

interface ContextData {
  isOn: boolean;
  onOff: () => void;
}

interface ContextProviderProps {
  children: ReactNode
}

export const Context = createContext({} as ContextData)


export function ContextProvider({ children }: ContextProviderProps) {  
  const [isOn, setState] = useState(false);     

  function onOff() {      
        if (isOn){
          setState(false)} else {              
          setState(true)      
        }      
  }
  
  return (
    <Context.Provider value={{
      isOn,
      onOff
      }}>
      { children }
    </Context.Provider>
  )
}