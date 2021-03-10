import { useContext } from "react";
import Lamp from "../components/Lamp";
import Switch from "../components/SwitchOnOff";
import { Context } from '../contexts/Context'
import Head from 'next/head'


export default function Home() {

  let { isOn } = useContext(Context);

  return (
    <>
    <Head>
      <title>{isOn?'On':'Off'}</title>
    </Head>
    <div className={`h-screen ${isOn ? 'bg-white':'bg-gray-600'}`}>
      <div className="container mx-auto">
        <div className="flex flex-col items-center py-60">
          <Lamp/>
          <div className={`py-10 font-semibold ${isOn ? 'text-gray-600' : 'text-white'}`}>
            <Switch/>
          </div>
        </div>
      </div>
    </div> 
    </>   
  )
}
