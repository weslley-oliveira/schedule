import React, { useContext, useState } from 'react'
import { Context } from '../contexts/Context';
import moment from 'moment';


function Booking() {
    const { data } = useContext(Context);   
    
    const [morning , setMorning ] = useState([])
    const [afternoon , setAfternoon ] = useState([])

    function handleClick(e){
        let selected = e.currentTarget.id
        let item = data.find(item => item.id == selected)

        console.log("teste", item)

        setMorning(item.morning)
        setAfternoon(item.afternoon)
        
    }
    console.log()
    return (
        <div>
            <div>{moment().format("MMMM YYYY")}</div>
            <div>                
                <ul  className="flex gap-2">
                    {data.map((day) => (
                        <li key={day.id} className="flex flex-col">                       
                            <span >{moment(day.date).format("ddd")}</span>
                            <span id={day.id} onClick={handleClick}>{moment(day.date).format("D")}</span>
                        </li>  
                    ))}              
                   
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
                        : <p>Sem Horario</p> }
            </div>
            
        
         
            
        </div>
    )
}

export default Booking
