import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../contexts/Context';
import moment from 'moment';

import Calendar from "./calendar/index";



function Booking() {
    const { data } = useContext(Context);
    const [selectedDate, setSelectedDate] = useState(moment());

    // console.log(selectedDate.format())

    useEffect(() => {
        let selected = selectedDate.format()
        let item = data.find(item => item.date == selected)     

        
        try {
            console.log("🤑", item.morning)
            setMorning(item.morning)
            setAfternoon(item.afternoon)
          }
          catch(err) {
            console.log("😞", err.message)
          }
        // if(item){
        // setMorning(item.morning)
        // setAfternoon(item.afternoon) 
        // }else{alert('vai a merda')}

      }, [selectedDate]);   
    
    const [morning , setMorning ] = useState([])
    const [afternoon , setAfternoon ] = useState([])

    return (
        <div>            
            <div>                
                <ul  className="flex gap-2">
                    <Calendar value={selectedDate} onChange={setSelectedDate} />
                </ul>
            </div>
            
            <div className="grid grid-cols-2">
                {morning.length?
                <div>
                    <span>Morning</span>
                    <ul>                        
                        {morning.map((m) => (
                            <li key={m}>{m}</li>
                            ))}                     
                    </ul>
                    
                </div>
                     :   <p>Sem Horario</p>        }

                {afternoon.length?
                <div>
                    <span>Afternoon</span>
                    <ul>                        
                        {afternoon.map((t) => (
                            <li key={t}>{t}</li>
                        ))}                        
                    </ul>
                </div>
                        : null }
            </div>
            
        
         
            
        </div>
    )
}

export default Booking
