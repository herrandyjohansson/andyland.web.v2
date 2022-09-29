import React from "react";
import { useState, useEffect } from "react";

interface Props {
  temp: number;
  weatherdata: Data[];
}

interface Data {
  data: Weather;
  name: string;
}
export interface Weather {
  temp: number;
  windSpeed: number;
}

const UpdateIntervalInMinuts = (minutes: any) => {
  var now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  now = new Date(now);
  return now;
};

const DashboardDev: React.FC<Props> = ({}) => {
  const [dateTime, setDateTime] = useState(new Date());
  const [update, setUpdate] = useState(UpdateIntervalInMinuts(15));

  if (dateTime.getTime() > update.getTime())
    setUpdate(UpdateIntervalInMinuts(15));

  useEffect(() => {
    // tick every 1 sec
    const id = setInterval(() => setDateTime(new Date()), 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <>
      <div className="temperature">
        <Card location={0} key={update.toString() + "-helsingborg"} />
      </div>
    </>
  );
};

const Card: React.FC<any> = ({ location }) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/smhi/" + location)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
        });
    };
    fetchData();
  }, []);

  const randomColorClass = () => {
    const colors = [
      "bg-light",
      "bg-primary",
      "bg-secondary",
      "bg-success",
      "bg-danger",
    ];
    const randomNumber = Math.floor(Math.random() * Math.floor(colors.length));
    return colors[randomNumber];
  };

  return (
    <div className="col-4">
      <div
        className={`card text-dark ${randomColorClass()}`}
        style={{ minHeight: "200px" }}
      >
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          <span>{location && location.name}</span>
          <div className="d-flex flex-column">
            <div className="display-4">{location && location.temp} °C</div>
            <div className="align-self-center">
              {location &&
                location.windSpeed !== 0 &&
                location.windSpeed + "m/s"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDev;
