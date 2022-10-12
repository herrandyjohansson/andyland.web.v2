import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import "../scss/main.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Single Shared Layout with Custom App
// https://nextjs.org/docs/basic-features/layouts

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Layout>
  );
}

export default MyApp;
