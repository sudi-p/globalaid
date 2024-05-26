import React, { Suspense } from "react";
import { Provider } from "react-redux";
import store from "../store/store";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../styles/globals.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#41b3A3",
      contrastText: "#fff",
    },
    secondary: {
      main: "#41b3A3",
      contrastText: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
  },
});

const queryClient = new QueryClient();
export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <React.StrictMode>
      <Suspense>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              {getLayout(
                <>
                  <NextNProgress
                    color={"#41b3A3"}
                    options={{ showSpinner: false }}
                    showOnShallow
                    height={5}
                  />
                  <Component {...pageProps} />
                </>
              )}
              <ToastContainer
                position="bottom-center"
                autoClose={1000}
                hideProgressBar={true}
              />
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Provider>
      </Suspense>
    </React.StrictMode>
  );
}
