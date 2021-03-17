import React, { useState } from "react";

export default function CalendarHeader({ value, onChange }) {
  const [ next, setNext ] = useState('')
  function currMonthName() {
    return value.format("MMMM")     
  } 

  function currYear() {
    return value.format("YYYY");
  }

  function prevWeek() {
    const valor = Number(next) - 1 
    setNext(valor) 

    return value.clone().subtract(1, "week");
  }

  function nextWeek() {    
      
    const valor = Number(next) + 1 
    setNext(valor)   
    
    return value.clone().add(1, "week");
  }

  function thisMonth() {
    return value.isSame(new Date(), "week");
  }

  return (
    <div className="flex justify-between font-bold py-4">
      <div
        className="cursor-pointer"
        onClick={() => !thisMonth() && onChange(prevWeek())}
      >
        {!thisMonth() ? String.fromCharCode(171) : null}
      </div>
      <div className="text-center ">
        <h1>{currMonthName()}{' '}  
            {currYear()}
            {next == 1 && ', next week'}
            {next>=2 &&`, in ${next} weeks`}</h1>
      </div>
      <div className="cursor-pointer" onClick={() => onChange(nextWeek())}>
        {String.fromCharCode(187)}
      </div>
    </div>
  );
}
