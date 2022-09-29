import React from "react";
import Card from "../../components/Card";
import Countdown from "react-countdown";

export interface Data {
  temp: number;
  windSpeed: number;
}

export interface Weather {
  name: string;
  data: Data;
}

const Dashboard: React.FC = () => {
  const UPDATE_INTERVAL = 1000 * 60 * 60;
  const [quote, setQuote] = React.useState<any>(null);
  const [weather, setWeather] = React.useState<Weather[]>();
  const [isLoading, setLoading]: any = React.useState(false);
  const [waterTemperature, setWaterTemperature]: any = React.useState(null);
  const [countdownInMilliseconds, setCountdownInterval]: any =
    React.useState(UPDATE_INTERVAL);

  const oslo = weather?.find(
    (location: any) => location.name.toLowerCase() === "oslo"
  );
  const tromso = weather?.find(
    (location: any) => location.name.toLowerCase() === "tromso"
  );
  let helsingborg = weather?.find(
    (location: any) => location.name.toLowerCase() === "helsingborg"
  );

  const trolltunga = weather?.find(
    (location: any) => location.name.toLowerCase() === "trolltunga"
  );

  const water: Weather = {
    name: "Sørenga badplats",
    data: { temp: waterTemperature, windSpeed: 0 },
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetch("/api/smhi/weather")
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
        });

      setLoading(false);
    };
    if (weather == null) {
      fetchData();
    }
  }, [weather]);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetch("/api/quote")
        .then((data) => data.json())
        .then((res) => setQuote(res));

      setLoading(false);
    };
    if (quote == null) {
      fetchData();
    }
  }, [quote]);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetch("/api/watertemperature")
        .then((data) => data.json())
        .then((res) => setWaterTemperature(res));

      setLoading(false);
    };
    if (waterTemperature == null) {
      fetchData();
    }
  }, [waterTemperature]);

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-end update-counter">
          <Countdown
            key={Date.now() + countdownInMilliseconds}
            date={Date.now() + countdownInMilliseconds}
            renderer={renderer}
            onComplete={() => {
              // setWeather(undefined)
              // setQuote(null)
              // setWaterTemperature(null)
              // setCountdownInterval(UPDATE_INTERVAL)
              // console.log("Countdown complete")
            }}
          />
        </div>

        <div className="row mt-4">
          <Card location={oslo} />
          <div className="col-8">
            <div
              className="card text-white bg-info"
              style={{ minHeight: "200px" }}
            >
              <div className="card-body">
                {quote && (
                  <blockquote className="blockquote text-right card-text-quote">
                    <div className="mb-2">
                      {quote.quote}
                      <footer className="blockquote-footer d-flex justify-content-end">
                        {quote.author}
                      </footer>
                    </div>
                  </blockquote>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          {helsingborg && <Card location={helsingborg} />}
          {trolltunga && <Card location={trolltunga} />}
          {water && <Card location={water} />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
