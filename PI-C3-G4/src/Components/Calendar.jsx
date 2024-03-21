import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Components/styles/selected-date.css'

const localizer = momentLocalizer(moment);

const Calendar = ({ onSelectDates }) => { 
  const [selectedDates, setSelectedDates] = useState([]); 

  const handleDateSelect = (slotInfo) => {
    const newDate = slotInfo.start;
    const updatedDates = [...selectedDates]; 

    if (selectedDates.some((date) => moment(date).isSame(newDate, 'day'))) {
      
      updatedDates.splice(updatedDates.indexOf(newDate), 1);
    } else {
      
      updatedDates.push(newDate);
    }

    setSelectedDates(updatedDates);
    onSelectDates(updatedDates); 
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {
      backgroundColor: isSelected ? 'lightblue' : 'transparent',
      borderRadius: '0px',
      border: 'none',
    };
    return style;
  };

  const myFormats = {
    dayFormat: (date, culture, localizer) =>
      localizer.format(date, 'dd', culture),
  };

  const dayPropGetter = (date) => {
    return {
      className: selectedDates.some((selectedDate) =>
        moment(selectedDate).isSame(date, 'day')
      )
        ? 'selected-date'
        : '',
      onClick: () => handleDateSelect(date),
    };
  };

  return (
    <BigCalendar
      localizer={localizer}
      events={[]}
      formats={myFormats}
      startAccessor="start"
      endAccessor="end"
      selectable
      onSelectSlot={handleDateSelect}
      views={{
        month: true,
      }}
      style={{ height: 500, width: 500 }}
      eventPropGetter={eventStyleGetter}
      dayPropGetter={dayPropGetter}
    />
  );
};

export default Calendar;