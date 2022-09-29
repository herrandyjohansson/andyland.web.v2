import React from "react";
interface Data {
  temp: number;
  windSpeed: number;
}

interface Weather {
  name: string;
  data: Data;
}

interface Props {
  location?: Weather;
}

const Card: React.FC<Props> = ({ location }) => {
  const randomColorClass = () => {
    if(location && location.name === "Sørenga badplats") return "bg-warning";

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
            <div className="display-4">{location && location.data.temp} °C</div>
            <div className="align-self-center">
              {location && location.data.windSpeed !== 0 && location.data.windSpeed + "m/s"} 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
