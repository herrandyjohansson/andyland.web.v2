import React from "react";
// import GoogleMapReact from "google-map-react";
import { MapPin } from "react-feather";
import ApiUtils from "../../utils/ApiUtils";
import useSWR from "swr";

export interface Resturants {
  id: number;
  name: string;
  description: string;
  rating: number;
  latitude: number;
  longitude: number;
}

const Marker: React.FC<any> = ({ text, description, stars, date }) => {
  return (
    <>
      <div className="position-relative text-dark">
        <div className="position-absolute bg-warning p-2 rounded d-flex align-items-center">
          <span>
            <MapPin />
          </span>
          <span className="ms-1"> {text}</span>
        </div>
      </div>
    </>
  );
};

const Oslo = () => {
  const { data, error } = useSWR(
    "https://andyland-api.azurewebsites.net/api/Resturantes",
    ApiUtils.FetcherSWR()
  );

  const resturants = data as Resturants[];

  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        {/* <GoogleMapReact
          key={"123"}
          bootstrapURLKeys={{ key: "AIzaSyAwLC3TXmW_E2eh-egNtzOF55H18Z-ETDI" }}
          defaultCenter={{ lat: 59.91, lng: 10.74 }}
          defaultZoom={15}
          options={{
            panControl: true,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
        >
          {resturants &&
            resturants.map((resturant) => (
              <Marker
                key={resturant.id}
                lat={resturant.latitude}
                lng={resturant.longitude}
                text={resturant.name}
                description={resturant.description}
                stars={resturant.rating}
                date={new Date("2022-02-01")}
              />
            ))}
        </GoogleMapReact> */}
      </div>
    </>
  );
};

export default Oslo;
