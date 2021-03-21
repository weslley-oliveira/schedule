import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../contexts/Context';
import moment from 'moment';
import Calendar from "./calendar/index";
import TextField from '@material-ui/core/TextField';



function AddDates() {
    const { data } = useContext(Context);
    
    const [selectedDate, setSelectedDate] = useState(moment());

    const [starHour, setStartHour] = useState()
    const [endHour, setEndHour] = useState(' ')

    const [morning , setMorning ] = useState([])    
    const [afternoon , setAfternoon ] = useState([]) 
   
    const [show , setShow] = useState(false) 

    
    useEffect(() => {

        let selected = selectedDate.format('L')        
        let item = data.find(item => item.date == selected)
        try {            
            setMorning(item.morning)
            setAfternoon(item.afternoon)
            setShow(true)            
          }
          catch(err) {
            setShow(false)  
            setMorning([])
            setAfternoon([])        
          }
          
    }, [selectedDate])


     const addMorning = async (join) => {

        let copy = [...morning]   
        copy = [
        ...copy,
        join
        ];
        
        setMorning(copy)
        try {
            const res = await fetch('/api/hours', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  date:selectedDate.format('L'),
                  morning:copy,
                  afternoon:afternoon               
                }
              ) 
            })
            
            if (res.status === 200) {
              console.log("Insert done")
             
            } else {
              console.log("erro no item insert") 
            }
          } catch(err) {
            // alert(err)
          }
        
    }

    const addAfternoon = async (join) => {
        let copy = [...afternoon]   
        copy = [
        ...copy,
        join
        ];
        
        setAfternoon(copy)

        try {
            const res = await fetch('/api/hours', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  date:selectedDate.format('L'),
                  morning:morning,
                  afternoon:copy              
                }
              ) 
            })
            
            if (res.status === 200) {
              console.log("Insert done")
             
            } else {
              console.log("erro no item insert") 
            }
          } catch(err) {
            // alert(err)
          }
        
    }


    const handleChangeStart = (e) => {
        setStartHour(e.target.value)
    }

    const handleChangeEnd = (e) => {

        if(e.target.value){
            setEndHour(' - '+ e.target.value)
        }else{
            setEndHour(' ')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
              
        const letters  = String(starHour).padStart(2, '0').split('')             
        
        const n = letters[0]+letters[1]

        const join = starHour + endHour

         
         if(starHour){
            setShow(true) 
            
            if(Number(n) <= 11){
                addMorning(join)
                
                } else{
                addAfternoon(join) 
                   
            }} else{
                alert('adiciona uma hora de start')
        }
    }

    const deleteHourMo = async (e) => {


        //FUNCTION DELETE ITEM FRONT
      for(var i=0; i<morning.length; i++){
        if(morning[i] == e.target.id){            
            morning.splice(i, 1); }        
      }
      
      let excluido = morning
      let cop = [...excluido];    
      
      setMorning(cop)
       //FUNCTION DELETE ITEM FRONT
       
       try {
        const res = await fetch('/api/hours', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              date:selectedDate.format('L'),
              morning:cop,
              afternoon:afternoon            
            }
          ) 
        })
        
        if (res.status === 200) {
          console.log("deleted")
         
        } else {
          console.log("erro no item insert") 
        }
      } catch(err) {
        // alert(err)
      }
                  
    }
    const deleteHourAf = async (e) => {


        //FUNCTION DELETE ITEM FRONT
      for(var i=0; i<afternoon.length; i++){
        if(afternoon[i] == e.target.id){            
            afternoon.splice(i, 1); }        
      }
      
      let excluido = afternoon
      let cop = [...excluido];    
      
      setAfternoon(cop)
       //FUNCTION DELETE ITEM FRONT
       
       try {
        const res = await fetch('/api/hours', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              date:selectedDate.format('L'),
              morning:morning,
              afternoon:cop              
            }
          ) 
        })
        
        if (res.status === 200) {
          console.log("deleted")
         
        } else {
          console.log("erro no item insert") 
        }
      } catch(err) {
        // alert(err)
      }
                  
    }
    
    return (
        <div className="text-gray-600">            
            <div>                
                <Calendar value={selectedDate} data={data} onChange={setSelectedDate} />
            </div>
            
            {show?
            <div className="py-4 grid grid-cols-2 text-center">
                <div>
                    <span className="font-semibold p-4">Morning</span>
                    <ul className="flex flex-col gap-2 py-4">                        
                    {morning != null  && morning.map((m) => (
                            <li className={`flex justify-between mx-2 p-2 cursor-pointer border border-gray-500 rounded-lg hover:bg-gray-200 `}
                           
                            >
                             <a></a> <p>{m}</p> 
                              <a
                              id={m} 
                              onClick={deleteHourMo}
                              className="cursor-pointer text-right">X</a>
                            </li>  ))}               
                    </ul>
                    
                </div>
              
                <div>
                    <span className="font-semibold p-4">Afternoon</span>
                    <ul className="flex flex-col gap-2 py-4">                        
                    {afternoon != null && afternoon.map((m) => (
                            <li className={`flex justify-between mx-2 p-2 cursor-pointer border border-gray-500 rounded-lg hover:bg-gray-200 `}
                           
                            >
                              <a></a> <p>{m}</p> 
                              <a
                              id={m} 
                              onClick={deleteHourAf}
                              className="cursor-pointer text-right">X</a>
                            </li>  ))}                 
                    </ul>
                </div>
            </div>
            : <div className="py-4 text-center">No Sloots avaiable</div>}
            <div className="bg-white fixed bottom-0 items-center w-full shadow-lg transform rotate-180  p-4">
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2 items-center transform -rotate-180" noValidate>
                    <TextField
                        className="w-36"
                        id="timestart"
                        type="time"
                        label="Start"
                        
                        onChange={handleChangeStart}                                            
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                    />
                    <TextField
                        className="w-36"
                        id="timeend"
                        type="time"
                        label="End"
                        
                        onChange={handleChangeEnd}                                            
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                    />
                    
                    <button  className="col-span-2 p-2 text-gray-700 font-bold border border-blue-600 rounded-xl cursor-pointer">Adicionar</button>
                </form>
                                   
                
            </div>


        </div>
    )
}

export default AddDates

