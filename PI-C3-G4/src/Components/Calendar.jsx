import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../Components/styles/Calendar.css";
import es from "date-fns/locale/es";
import requestToAPI from "../services/requestToAPI";

function Calendar({ selectedDates, onSelectDates, productId }) {
  const [reservations, setReservations] = useState([]);
  const [fechasOcupadas, setFechasOcupadas] = useState([]);
  const [monthsToShow, setMonthsToShow] = useState(window.innerWidth <= 768 ? 1 : 2);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await requestToAPI(`rentals/find/product/${productId}`, "GET");
        setReservations(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReservations();
  }, [productId]);

  useEffect(() => {
    const disabledDates = [];
    reservations.forEach((reservation) => {
      const { date_start, date_end } = reservation;
      const startDate = new Date(`${date_start}T00:00:00`);
      const endDate = new Date(`${date_end}T00:00:00`);
      let currentDate = startDate;
      while (currentDate <= endDate) {
        disabledDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    setFechasOcupadas(disabledDates);
  }, [reservations]);

  const handleSelect = (ranges) => {
    onSelectDates(ranges); // Llama a la función onSelectDates con los rangos seleccionados
  };

  useEffect(() => {
    const handleResize = () => {
      setMonthsToShow(window.innerWidth <= 768 ? 1 : 2);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="calendario-container">
      <div className="calendario-card">
        <DateRange
          ranges={[
            {
              startDate: selectedDates.startDate || new Date(),
              endDate: selectedDates.endDate || new Date(),
              key: "selection",
            },
          ]}
          onChange={handleSelect}
          rangeColors={["#122e4f"]}
          disabledDates={fechasOcupadas}
          showDateDisplay={true}
          months={monthsToShow}
          direction="horizontal"
          locale={es}
          minDate={new Date()}
        />
      </div>
    </div>
  );
}

export default Calendar;