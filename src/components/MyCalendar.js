import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { API_URL } from "../constants";

// localize the calendar and format dates and times according to the locale
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchCustomerData = async (link) => {
      const response = await fetch(link);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    };

    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/trainings");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const formattedTrainings = await Promise.all(
          data.content.map(async (training) => {
            try {
              const customerData = await fetchCustomerData(
                training.links.find((link) => link.rel === "customer").href
              );
              const { firstname, lastname } = customerData;
              return {
                title: `${training.activity} / ${firstname} ${lastname}`,
                start: moment(training.date).toDate(),
                end: moment(training.date)
                  .add(training.duration, "m")
                  .toDate(),
                customerName: `${firstname} ${lastname}`,
              };
            } catch (error) {
              console.error(error);
              return null;
            }
          })
        );
        setTrainings(formattedTrainings.filter((training) => training !== null));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []); 

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={trainings}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </div>
  );
};

export default MyCalendar;
