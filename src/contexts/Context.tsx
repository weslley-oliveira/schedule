import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface ContextData {
  isOn: boolean;
  onOff: () => void;
}

interface ContextProviderProps {
  children: ReactNode 
}

export const Context = createContext({} as ContextData)


export function ContextProvider({ children}: ContextProviderProps) {  

  const cookie = Cookies.get('isOn')
  
  const [isOn, setState] = useState(false);     

  function onOff() {      
        if (isOn){
          setState(false)} else {              
          setState(true)      
        }      
  }

  useEffect(() => {
    if(cookie == 'true'){      
      setState(true)
      alert("You left the light on 🤫")
    }else{setState(false)}        
  }, [])

  useEffect(() => {
    Cookies.set('isOn', String(isOn))
  }, [isOn])
  
  return (
    <Context.Provider value={{
      isOn,
      onOff
      }}>
      { children }
    </Context.Provider>
  )
}