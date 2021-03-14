import { useContext } from "react";
import { Context } from '../contexts/Context'
import Head from 'next/head'
import Booking from "../components/Booking";


export default function Home({ data }) {

  let { isOn } = useContext(Context);
  console.log(data)
  return (
    <>
    <Head>
      <title>Booking | App</title>
    </Head>
    <div className="">
      <Booking/>
    </div> 
    </>   
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/date`)
  const data = await res.json()
  return {
    props: { data }, // will be passed to the page component as props
  }
}
