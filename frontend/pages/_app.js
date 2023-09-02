import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import reportWebVitals from '../src/reportWebVitals';
import '../styles/globals.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#41b3A3",
      contrastText: "#fff"
    },
    secondary: {
      main: '#41b3A3',
      contrastText: "#fff"
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
  },
});

const queryClient = new QueryClient()
export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
          {getLayout(
            <Component {...pageProps}/>
          )}
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>
  )
};

reportWebVitals();
