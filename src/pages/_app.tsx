import React from "react";
import App from "next/app";
import './globals.css';
import {AuthContextProvider} from '../context';

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
};

export default MyApp;
