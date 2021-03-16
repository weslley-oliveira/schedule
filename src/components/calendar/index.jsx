import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "./header";

export default function Calendar({ value, onChange, data }) {
  const [calendar, setCalendar] = useState([]);

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

  function dayStyles(day) {
    if (beforeToday(day)) return "text-gray-300";
    if (isSelected(day)) return "rounded border border-blue-800 text-blue-600";
    if (isToday(day)) return "text-red-500";
    return "";
  }

  return (
    <div className="p-2">
      <Header value={value} onChange={onChange} />

      <div className="w-96">        
        {calendar.map((week, wi) => (
          <div key={wi} className="flex justify-between ">
            {week.map((day, di) => (
              <div
                key={di}
                className="day"
                onClick={() => {
                  if (day < moment(new Date()).startOf("day")) return;
                  onChange(day);
                }}
              >
                <div className={`cursor-pointer p-2 flex flex-col ${dayStyles(day)}`}>
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
