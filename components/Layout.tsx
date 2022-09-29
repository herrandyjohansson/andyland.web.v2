import React from "react";
import { Todos } from "../types/Content";
import ApiUtils from "../utils/ApiUtils";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import DashboardNavbar from "./DashboardNavbar";

interface Props {
  children: any; // NextJS magic
}

/* Detta istället för GetStaticProps, skillnaden? Osäker. 
    Men det använder useSWR hooken (vilket de rekommenderar starkt tydligen.) 
*/
// const useTodos = () => {
//     const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/todos`, ApiUtils.FetcherSWR())

//     return {
//       todos: data,
//       isLoading: !error && !data,
//       isError: error
//     }
// }

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  let showDashboardNavbar = router.route !== "/weather/wow";

  if (router.pathname === "/dashboard") {
    return (
      <div id="theme-dashboard">
        {showDashboardNavbar ? <DashboardNavbar /> : null}
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div>
      {showDashboardNavbar ? <Navbar /> : null}
      <main>{children}</main>
      {/* FOOTER */}
    </div>
  );
};

export default Layout;
