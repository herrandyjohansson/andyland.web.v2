import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const MUI: React.FC<any> = () => {
  const [data, setData] = React.useState<Date[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [queryDate, setQueryDate] = React.useState<any>(null);
  const [value, setValue] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const res = await fetch(
        `https://andyland-api.azurewebsites.net/api/Scrape/sukkerbiten?startDate=${queryDate}`
      );
      const sukkerbiten = await res.json();
      if (sukkerbiten) setData(sukkerbiten);
      setLoading(false);
    };

    if (queryDate !== null) fetchData();
  }, [queryDate]);

  return (
    <div className="p-4 text-white">
      <div className="row">
        <div className="bg-info rounded p-4">
          <div className="text-center">
            <h2>Sukkerbiten</h2>
            <div className="mt-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  value={value}
                  inputFormat={"DD.MM.YYYY"}
                  onChange={(newValue: any) => {
                    let dateFormatted = dayjs(newValue.$d).format("DD.MM.YYYY");
                    console.log(dateFormatted);
                    setQueryDate(dateFormatted);
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="text-white pt-4">
              {queryDate == null && "when in doubt - go bastu"}
              {queryDate != null && loading && (
                <span className="spinner-border text-warning"></span>
              )}
              {data &&
                !loading &&
                data.map((item: Date) => {
                  let dateFormat = dayjs(item).format("HH:mm");
                  return <p>{dateFormat}</p>;
                })}
              {data && !loading && (
                <a
                  className="btn btn-primary"
                  href={
                    "https://oslobadstuforening.no/dropin-ledig-tid/?mode=search&submitted=1&calendar=57139&range_search=day&prop_res_sted=Sukkerbiten&prop_res_dropin=yes&extra_search_fields=sted%2Cdropin%2C&ppp_hidden_fields=prop_res_dropin&sort_fields=name&sort=name&start_date=" +
                    queryDate
                  }
                  target={"_blank"}
                >
                  Go bastu
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MUI;
