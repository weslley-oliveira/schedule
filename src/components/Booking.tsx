import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../contexts/Context';
import moment from 'moment';
import Calendar from "./calendar/index";

function Booking() {
    const { data } = useContext(Context);
    const [selectedDate, setSelectedDate] = useState(moment());

    const [morning , setMorning ] = useState([])
    const [afternoon , setAfternoon ] = useState([])

    useEffect(() => {
        let selected = selectedDate.format('L')
        let item = data.find(item => item.date == selected)     

        try {            
            setMorning(item.morning)
            setAfternoon(item.afternoon)
          }
          catch(err) {
            setMorning([])
            setAfternoon([])              
          }        
      }, [selectedDate]);   
    
    

    return (
        <div className="p-2 text-gray-600">            
            <div>                
                <Calendar value={selectedDate} onChange={setSelectedDate} />
            </div>
            {morning.length || afternoon.length ?
            <div className="py-4 grid grid-cols-2 text-center">
                
                <div>
                    <span className="font-semibold p-4">Morning</span>
                    <ul className="flex flex-col gap-2 py-4">                        
                        {morning.map((m) => (
                            <li className=" mx-2 p-2 cursor-pointer border border-gray-500 rounded-lg hover:bg-gray-200" 
                            key={m}>{m}</li>
                            ))}                     
                    </ul>
                    
                </div>
                     

                {afternoon.length?
                <div>
                    <span className="font-semibold p-4">Afternoon</span>
                    <ul className="flex flex-col gap-2 py-4">                        
                        {afternoon.map((t) => (
                            <li
                            className="mx-2 p-2 cursor-pointer border border-gray-500 rounded-lg hover:bg-gray-200"
                             key={t}>{t}</li>
                        ))}                        
                    </ul>
                </div>
                        : null }
            </div>  
            :   
            <p>
                Sorry, there are no slots available on this day. Please try a different day or reducing the hours.
            </p>} 
        </div>
    )
}

export default Booking
