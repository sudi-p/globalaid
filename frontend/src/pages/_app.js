import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import NextNProgress from 'nextjs-progressbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from '@context/AuthProvider';
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
      <Suspense>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ThemeProvider theme={theme}>
                {getLayout(
                  <>
                  <NextNProgress
                  color={'#41b3A3'}
                  options={{ showSpinner: false }}
                  showOnShallow
                  height={5}
                />
                  <Component {...pageProps} />
                  </>
                )}
              </ThemeProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </AuthProvider>
          </QueryClientProvider>
        </Provider>
      </Suspense>
    </React.StrictMode>
  )
};

