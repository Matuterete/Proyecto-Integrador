import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../Components/styles/Calendar.css";

moment.locale("es");

const localizer = momentLocalizer(moment);

const Calendar = ({ onSelectDates }) => {
  const today = new Date(); 

  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateSelect = (slotInfo) => {
    const newDate = slotInfo.start;
    const updatedDates = [...selectedDates];

    
    if (moment(newDate).isBefore(today)) {
      return;
    }

    if (selectedDates.some((date) => moment(date).isSame(newDate, "day"))) {
      updatedDates.splice(updatedDates.indexOf(newDate), 1);
    } else {
      updatedDates.push(newDate);
    }

    setSelectedDates(updatedDates);
    onSelectDates(updatedDates);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {
      backgroundColor: isSelected ? "lightblue" : "transparent",
      borderRadius: "0px",
      border: "none",
    };
    return style;
  };

  const myFormats = {
    dayFormat: (date, culture, localizer) =>
      localizer.format(date, "dd", culture),
  };

  const dayPropGetter = (date) => {
    return {
      className: selectedDates.some((selectedDate) =>
        moment(selectedDate).isSame(date, "day")
      )
        ? "selected-date"
        : "",
      style: {
        opacity: moment(date).isBefore(today) ? 0.5 : 1,
        cursor: moment(date).isBefore(today) ? "not-allowed" : "default",
        color: moment(date).isBefore(today) ? "gray" : "inherit",
      },
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
      eventPropGetter={eventStyleGetter}
      dayPropGetter={dayPropGetter}
      minDate={today}
    />
  );
};

export default Calendar;
