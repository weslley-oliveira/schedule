import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "./header";

export default function Calendar({ value, onChange, data }) {
  const [calendar, setCalendar] = useState([]);
  const [saber, setSaber] = useState('pica');

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  function buildCalendar(date) {
    const a = [];


    const startDay = date.clone().startOf("week");
    const endDay = date.clone().endOf("week");

    const _date = startDay.clone().subtract(0, "day");

    while (_date.isBefore(endDay, "day")) {
      a.push(
        Array(7)
          .fill(0)
          .map(() => _date.add(1, "day").clone())
      );
    }    
    return a;
  }

  function isSelected(day) {       
    return value.isSame(day, "day");    
  }

  function beforeToday(day) {
    return moment(day).isBefore(new Date(), "day");
  }

  function isToday(day) {
    return moment(new Date()).isSame(day, "day");
  }

  function hasHours(day){ 
    let selected = day.format() 
    let item = data.find(item => item.date == selected)
    if (beforeToday(day)){}else{
    try{
      if(item.morning.length && item.afternoon.length >= 1){      
        return "bg-green-100 text-green-500"
      }
     }
    catch(err) { }
    }
    
  }
  
  

  function dayStyles(day) {   
     
    if (beforeToday(day)) return "text-gray-300";
    if (isSelected(day)) return "bg-green-500 text-white";
    if (isToday(day)) return "bg-green-100 text-green-500";
    return "";
  }

  //console.log( "esssss", data )

  return (
    <div className="">
      <Header value={value} onChange={onChange} />

      <div className="text-gray-300">        
        {calendar.map((week, wi) => (
          <div key={wi} className="flex gap-1 sm:gap-2">
            {week.map((day, di) => (
              <div
                key={di}
                className={`cursor-pointer rounded-lg text-center ${hasHours(day)}`}             
                onClick={() => {
                  if (day < moment(new Date()).startOf("day")) return;
                  onChange(day);                  
                }}
              >
                <div className={`flex flex-col w-12 sm:w-16 font-semibold p-2 rounded-lg ${dayStyles(day)}`}>

                  <h1>{day.format("ddd").toString()}</h1>
                  <p>{day.format("D").toString()}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
