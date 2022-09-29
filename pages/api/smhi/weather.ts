export default async function handler(req: any, res: any) {
  const temperatureLocations: any = [
    {
      name: "Oslo",
      data: await fetchWeatherByCoords("59.913869", "10.752245"),
    },
    {
      name: "Helsingborg",
      data: await fetchWeatherByCoords("56.049", "12.6942"),
    },
    {
      name: "Trolltunga",
      data: await fetchWeatherByCoords("60.124", "6.740"),
    }
  ];

  res.status(200).json(temperatureLocations);
}

async function fetchWeatherByCoords(lat: string, lon: string) {
  let SMHI_API_URL =
    "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/{lon}/lat/{lat}/data.json";

  SMHI_API_URL = SMHI_API_URL.replace("{lat}", lat).replace("{lon}", lon);

  return fetch(SMHI_API_URL)
    .then((res) => res.json())
    .then((smhiData) => {
      let weatherData = smhiData.timeSeries[0];
      const temp =
        weatherData &&
        weatherData.parameters.filter(
          (x: { name: string }) => x.name === "t"
        )[0].values[0];

      const windSpeed = weatherData?.parameters.filter(
        (y: { name: string }) => y.name === "ws"
      )[0].values[0];

      return { temp, windSpeed };
    });
}
