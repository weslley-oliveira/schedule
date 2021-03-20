import { useContext, useEffect } from "react";
import { Context } from '../contexts/Context'
import Head from 'next/head'
import Booking from "../components/Booking";
import  Link  from "next/link";


export default function Home({ data }) {

  let { setData } = useContext(Context);


  useEffect(() => {
   setData(data)
  }, []);

  return (
    <>
    <Head>
      <title>Booking | App</title>
    </Head>
    <div className="py-4">
      <Link href="/admin">
        <a className="p-2 text-gray-700 font-bold m-4 border border-blue-600 rounded-xl cursor-pointer">Admin</a>
      </Link>
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
