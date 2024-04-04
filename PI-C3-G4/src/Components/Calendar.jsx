import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../Components/Styles/Calendar.css";
import es from "date-fns/locale/es";
import requestToAPI from "../services/requestToAPI";


function Calendar({ selectedDates, onSelectDates, productId }) {
  const [reservations, setReservations] = useState([]);
  const [fechasOcupadas, setFechasOcupadas] = useState([]);
  const [monthsToShow, setMonthsToShow] = useState(
    window.innerWidth <= 768 ? 1 : 2
  );

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await requestToAPI(
          `rentals/find/product/${productId}`,
          "GET"
        );
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
      const { dateStart, dateEnd } = reservation;
      const dateStartLocal = new Date(dateStart);
      const timestampStartLocal = dateStartLocal.getTime();
      const offsetStartLocalToGMT0 = dateStartLocal.getTimezoneOffset() * 60000;
      const timestampStartGMT0 = timestampStartLocal + offsetStartLocalToGMT0;
      const startDateGMT0 = new Date(timestampStartGMT0);

      const dateEndLocal = new Date(dateEnd);
      const timestampEndLocal = dateEndLocal.getTime();
      const offsetEndLocalToGMT0 = dateEndLocal.getTimezoneOffset() * 60000;
      const timestampEndGMT0 = timestampEndLocal + offsetEndLocalToGMT0;
      const endDateGMT0 = new Date(timestampEndGMT0);

      let currentDate = startDateGMT0;
      while (currentDate < endDateGMT0) {
        disabledDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    setFechasOcupadas(disabledDates);
  }, [reservations]);

  const handleSelect = (ranges) => {
    onSelectDates(ranges);
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
          rangeColors={["#289e3b"]}
          disabledDates={fechasOcupadas}
          showDateDisplay={false}
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
