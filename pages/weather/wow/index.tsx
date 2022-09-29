import React from "react";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Droplet, Thermometer, Wind, Loader, Database } from "react-feather";

export interface LocationObject {
  location: string;
  approvedTime: Date;
  temperature: number;
  longitud: number;
  latitude: number;
  windSpeed: number;
  windspeedDirection: number;
}

const UPDATE_INTERVAL = 1000 * 60 * 60;

const renderer = ({ hours, minutes, seconds }: any) => {
  return (
    <span className="rounded text-dark p-2 display-4">
      {minutes}:{seconds}
    </span>
  );
};

const weatherColor = (temperature: number) => {
  if (temperature && temperature <= -10) return "colder";
  if (temperature && temperature <= -5) return "cold";
  if ((temperature && temperature <= 0) || temperature == 0) return "medium";
  if (temperature && temperature <= 3) return "mediumMedium";
  if (temperature && temperature <= 4.5) return "medium";
  if (temperature && temperature <= 10) return "warm";
  if (temperature && temperature >= 10) return "warmer";
};

const WorldOfWarcraftWeatherMap: React.FC = () => {
  const [data, setData] = useState<LocationObject[]>();
  const [waterTemperature, setWaterTemperature] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showWindspeed, setShowWindspeed] = useState<boolean>(false);

  const [countdownInMilliseconds, setCountdownInterval] =
    React.useState<any>(UPDATE_INTERVAL);
  const [currentCountdownIndex, setCurrentCountdownIndex] = useState<number>(0);

  const fetchLocationIdReferenceToCSS = (location: LocationObject) => {
    switch (location.location) {
      case "Malmö":
        return "malmo";
        break;
      case "Oslo":
        return "oslo";
        break;
      case "Galdhopiggen":
        return "galdhopiggen";
        break;
      case "Kiruna":
        return "kiruna";
        break;
      case "Stockholm":
        return "stockholm";
        break;
      case "Linköping":
        return "linkoping";
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    fetch("/api/watertemperature")
      .then((response) => response.json())
      .then((data) => {
        setWaterTemperature(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoading]);

  React.useEffect(() => {
    fetch(
      "https://andyland-api.azurewebsites.net/api/Weather/weatherLocationsList"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoading]);

  return (
    <div className="wow-weather-map">
      <Countdown
        key={currentCountdownIndex}
        date={Date.now() + countdownInMilliseconds}
        renderer={renderer}
        onComplete={() => {
          setCountdownInterval(UPDATE_INTERVAL);
          setIsLoading(true);
          setCurrentCountdownIndex(currentCountdownIndex + 1);
        }}
      />
      <div
        className="wind-options text-dark"
        onClick={() => setShowWindspeed(!showWindspeed)}
      >
        <span className="p-3">
          <Wind />
        </span>
      </div>

      {isLoading && <Loader className="loader" height={500} width={300} />}

      {data &&
        data.map((location, index) => {
          return (
            <div
              key={location.location + "-" + index}
              id={fetchLocationIdReferenceToCSS(location)}
            >
              <span
                className={`p-1 rounded text-dark shadow ${weatherColor(
                  location.temperature
                )}`}
              >
                <span className="">
                  <Thermometer />
                </span>
                <span>{location.temperature}</span>
                <span className="celsius">°C </span>
              </span>

              {showWindspeed && (
                <div
                  className={`${fetchLocationIdReferenceToCSS(
                    location
                  )}-windspeed windspeed-animation`}
                >
                  <div className="bg-danger rounded">
                    <span className="p-2">{location.windSpeed}</span>
                    <span>m/s</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

      {waterTemperature && (
        <div className="oslo-water-temperature">
          <span className="bg-primary rounded p-1">
            <Droplet height={15} />
            {waterTemperature}
            <span className="celsius">°C</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default WorldOfWarcraftWeatherMap;
