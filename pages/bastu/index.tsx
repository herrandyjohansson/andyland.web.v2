import React, { useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import AlarmIcon from "@mui/icons-material/Alarm";
import DateRangeIcon from "@mui/icons-material/DateRange";
interface Sauna {
  date: string;
  availableTimes: string[];
}

interface Date {
  data: Sauna;
  date: string;
}

export const PREFILLED_SAUNA_URL = (date: string, startTime: string) => {
  return `https://oslobadstuforening.no/dropin-ledig-tid/?planyo_lang=NO&mode=reserve&prefill=true&one_date=27.09.2022&start_date=${date}&start_time=${startTime}`;
};

export const BASE_API_URL = "https://andyland-api.azurewebsites.net";

export const ErrorMsg = () => {
  return (
    <div>
      <span className="text-danger">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-x-octagon me-2"
          viewBox="0 0 16 16"
        >
          <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
        no data
      </span>
    </div>
  );
};

const SaunaTimesByDate: React.FC<Date> = ({ data }) => {
  return (
    <div className="col text-center">
      {data && (
        <span className="h3 fw-lighter">
          <span className="pe-2">
            <DateRangeIcon />
          </span>
          {data.date}
        </span>
      )}
      {!data && (
        <div>
          <span className="text-white spinner-border text-warning loading-style p-4 m-4 h-100"></span>
        </div>
      )}
      {data && (
        <ul className="list-group list-group-flush sauna-link">
          {data.availableTimes.map((item: any) => (
            <a href={PREFILLED_SAUNA_URL("26.09.2022", "11.5")}>
              <li
                key={item}
                className="badge list-group-item m-1 rounded"
                onMouseOver={() => console.log("trigger")}
              >
                <span className="pe-2">
                  <AlarmIcon />
                </span>
                <span className="sauna-text">
                  {dayjs(item).format("HH:mm")}
                </span>
              </li>
            </a>
          ))}
        </ul>
      )}
    </div>
  );
};

const MUI: React.FC = () => {
  const [datepickerDate, setQueryDate] = React.useState<any>(null);
  const [value, setValue] = React.useState<any>(null);
  const [data, setData] = React.useState<any>(null);
  const [isLoading, setLoading] = React.useState(false);
  const [saunaTomorrow, setSaunaTomorrow] = React.useState<any>(null);
  const [saunaDayAfter, setSaunaDayAfter] = React.useState<any>(null);
  const [saunaLastDay, setSaunaLastDay] = React.useState<any>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (datepickerDate) {
      const fetchData = async () => {
        setLoading(true);
        setError("");
        const response = await fetch(
          `https://andyland-api.azurewebsites.net/api/Scrape/sukkerbiten?startDate=${datepickerDate}`
        );
        if (response.status === 204) {
          setError("no data");
          setLoading(false);
          console.log("no data found");
          return;
        }
        const data = await response.json();
        if (data) setData(data);
        setLoading(false);
      };
      fetchData();
    }
  }, [datepickerDate]);

  React.useEffect(() => {
    const fetchData = async (key: string, date: string) => {
      const resp = await fetch(
        `https://andyland-api.azurewebsites.net/api/Scrape/sukkerbiten?startDate=${date}`
      );
      const data = await resp.json();
      if (data) {
        if (key === "tomorrow") {
          setSaunaTomorrow({
            date: dayjs().add(1, "day").format("DD.MM.YYYY"),
            availableTimes: data,
          });
        }
        if (key === "dayafter") {
          setSaunaDayAfter({
            date: dayjs().add(2, "day").format("DD.MM.YYYY"),
            availableTimes: data,
          });
        }
        if (key === "lastday") {
          setSaunaLastDay({
            date: dayjs().add(3, "day").format("DD.MM.YYYY"),
            availableTimes: data,
          });
        }
      }
    };
    if (saunaTomorrow == null)
      fetchData("tomorrow", dayjs().add(1, "day").format("DD.MM.YYYY"));
    if (saunaDayAfter == null)
      fetchData("dayafter", dayjs().add(2, "day").format("DD.MM.YYYY"));
    if (saunaLastDay == null)
      fetchData("lastday", dayjs().add(3, "day").format("DD.MM.YYYY"));
  }, []);

  return (
    <div className="sauna-wrapper p-4 text-white">
      <div className="row">
        <div className="bg-info rounded p-4">
          <div className="text-center">
            <h2>Sukkerbiten</h2>
            <div className="mt-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  value={value}
                  inputFormat={"DD.MM.YYYY"}
                  onChange={async (newValue: any) => {
                    let dateFormatted = dayjs(newValue.$d).format("DD.MM.YYYY");
                    setQueryDate(dateFormatted);
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="text-white pt-4">
              {error && <ErrorMsg />}
              {isLoading && (
                <span className="spinner-border text-warning"></span>
              )}
              {data?.map((item: string) => {
                return <p>{dayjs(item).format("HH:mm")}</p>;
              })}
              {data && !isLoading && (
                <a
                  className="btn btn-primary"
                  href={
                    "https://oslobadstuforening.no/dropin-ledig-tid/?mode=search&submitted=1&calendar=57139&range_search=day&prop_res_sted=Sukkerbiten&prop_res_dropin=yes&extra_search_fields=sted%2Cdropin%2C&ppp_hidden_fields=prop_res_dropin&sort_fields=name&sort=name&start_date=" +
                    datepickerDate
                  }
                  target={"_blank"}
                >
                  Go bastu
                </a>
              )}
            </div>
          </div>
          <hr />
          <section className="mt-4">
            <div className="row">
              <SaunaTimesByDate
                date={dayjs().add(1, "day").format("DD.MM.YYYY")}
                data={saunaTomorrow}
              />
              <SaunaTimesByDate
                date={dayjs().add(2, "day").format("DD.MM.YYYY")}
                data={saunaDayAfter}
              />
              <SaunaTimesByDate
                date={dayjs().add(3, "day").format("DD.MM.YYYY")}
                data={saunaLastDay}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MUI;
