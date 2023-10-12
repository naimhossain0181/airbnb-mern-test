import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalenderTest = () => {
    const [value,setValue]=useState(new Date())
    console.log(value)
    
    const formattedDate = value.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
    return (
        <div>
            <Calendar  value={value} onChange={(date)=>setValue(date)} />
        </div>
    );
};

export default CalenderTest;