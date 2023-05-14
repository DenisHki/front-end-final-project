import React, { useState, useEffect } from "react";
import _ from "lodash";
import dayjs from "dayjs";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const fetchData = async () => {
  const response = await fetch(
    "http://traineeapp.azurewebsites.net/api/trainings"
  );
  const data = await response.json();

  return Promise.all(
    data.content.map(async (training) => {
      const customerRes = await fetch(
        training.links.find((link) => link.rel === "customer").href
      );
      const customerData = await customerRes.json();

      return {
        activity: training.activity,
        duration: training.duration,
        date: dayjs(training.date).format("DD-MM-YYYY HH.mm a"),
        time: dayjs(training.date).format("HH.mm"),
        customerName: `${customerData.firstname} ${customerData.lastname}`,
        link: training.links[0].href,
      };
    })
  );
};

// Group the data by activity type:
const groupTrainings = (trainings) => {
  const groupedTrainings = _.groupBy(trainings, "activity");
  const duration = _.mapValues(groupedTrainings, (group) =>
    _.sumBy(group, "duration")
  );
  return duration;
};

const Chart = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchData()
      .then((formattedTrainings) => {
        setTrainings(formattedTrainings);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const chartData = Object.entries(groupTrainings(trainings)).map(
    ([activity, duration]) => ({ activity, duration })
  );

  return (
    <div
      style={{
        marginTop: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BarChart width={1000} height={500} data={chartData}>
        <XAxis dataKey="activity" />
        <YAxis
          label={{
            value: "Duration (min)",
            angle: -90,
            position: "insideLeft",
            fontSize: 25,
          }}
        />
        <Tooltip />
        <Bar dataKey="duration" fill="rgb(123,104,238)" />
      </BarChart>
    </div>
  );
};

export default Chart;
