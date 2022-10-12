import React from "react";
import Draggable from "react-draggable"; // Both at the same time
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// https://andyland-api.azurewebsites.net/api/Weather/weatherLocationsList
const WeatherMap = () => {
  const { data, isSuccess } = useQuery(
    ["joke"],
    async () => {
      const { data } = await axios(
        "https://andyland-api.azurewebsites.net/api/Weather/weatherLocationsList"
      );
      return data;
    },
    {
      refetchInterval: 1000 * 60 * 60,
    }
  );

  console.log(data);
  console.log("weather update");

  return (
    <div>
      <>
        <div className="position-absolute">
          <Draggable>
            <div className="d-block bg-white text-dark rounded p-2 fw-bolder shadow">
              {data && data[1].temperature} °C
            </div>
          </Draggable>
          <Draggable>
            <div className=" bg-info text-dark rounded p-0 d-flex justify-content-center fw-bolder shadow">
              {data && data[1].windSpeed} m/s
            </div>
          </Draggable>
        </div>
        <section className="d-flex position-absolute flex-column text-dark text-center mt-3 ms-2 d-none">
          <span className="bg-dark text-white text-center p-1">Något!</span>
          <div className="shadow flex-row m-2 rounded justify-content-center">
            <div className="bg-dark text-white text-center p-1">
              <div className="p-1 m-2">Hej</div>
            </div>
          </div>
        </section>
        <div className="weathermap"></div>
        <iframe
          src="https://earth.nullschool.net/#current/wind/surface/level/orthographic=-344.73,62.00,2845/grid=on/"
          height={"1000px"}
          width={"100%"}
        />
      </>
    </div>
  );
};

export default WeatherMap;
