export default async function handler(req: any, res: any) {
  const {
    query: { id },
  } = req;

  const locations: any = [
    {
      id: 0,
      name: "Oslo",
      lat: 59.913869,
      lon: 10.752245,
    },
    {
      id: 1,
      name: "Helsingborg",
      lat: 56.049,
      lon: 12.6942,
    },
    {
      id: 2,
      name: "Trolltunga",
      lat: 60.124,
      lon: 6.74,
    },
  ];

  let foundLocation = locations[id] !== undefined;

  if (!foundLocation) {
    res.status(404).json({
      error: "failed to fetch data",
    });
  }

  const weatherData: any = await fetchWeatherDataByCoords(
    locations[id].lat,
    locations[id].lon
  );

  res.status(200).json({
    ...locations[id],
    ...weatherData,
  });
}

async function fetchWeatherDataByCoords(lat: string, lon: string) {
  let apiUrl =
    "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/{lon}/lat/{lat}/data.json"
      .replace("{lat}", lat)
      .replace("{lon}", lon);

  return fetch(apiUrl)
    .then((res) => res.json())
    .then((smhiData) => {
      let weatherObject = smhiData.timeSeries[0];

      const temperatur =
        weatherObject &&
        weatherObject.parameters.filter(
          (x: { name: string }) => x.name === "t"
        )[0].values[0];

      const windSpeed = weatherObject?.parameters.filter(
        (y: { name: string }) => y.name === "ws"
      )[0].values[0];

      return { temp: temperatur, windSpeed };
    });
}
