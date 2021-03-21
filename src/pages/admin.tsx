import Link from "next/link"
import { useContext, useEffect } from "react";
import AddDates from "../components/addDates"
import { Context } from "../contexts/Context";
import { connectToDatabase }  from "../util/mongodb"

function admin({ data }) {

    
  let { setData } = useContext(Context);


  useEffect(() => {
   setData(data)
  }, []);

    return (
        <div className="py-4">
        <Link href="/">
            <a className="p-2 text-gray-700 font-bold m-4 border border-blue-600 rounded-xl cursor-pointer">voltar</a>
        </Link>
        <AddDates/>
        </div>
    )
}

export default admin



export async function getServerSideProps() {
  //const res = await fetch(`http://localhost:3000/api/date`)
  const { db } = await connectToDatabase();

  const response = await db.collection("hours").find().sort({ metacritic: -1 }).toArray();
 // const data = await res.json()
  return {
    props: {
      data: JSON.parse(JSON.stringify(response)),
     } // will be passed to the page component as props
  }
}