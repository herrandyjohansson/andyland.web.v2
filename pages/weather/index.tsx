import React from "react";

const WeatherMap = () => {
  return (
    <div>
      <>
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
        ></iframe>
      </>
    </div>
  );
};

export default WeatherMap;
