import React, {useEffect, useState} from "react";
import App from "next/app";
import './globals.css';
import {Navbar} from "../components";
import { useRouter } from "next/router";
import { Provider } from 'react-redux';
import { store, persistor } from '../store';
import { PersistGate } from 'redux-persist/integration/react'


const MyApp = ({ Component, pageProps }: any) => {
  const router = useRouter()
  const [isLoginRoute, setIsLoginRoute] = useState(false)

  useEffect(() => {
    if(router.pathname === '/') {
      setIsLoginRoute(true)
    } else {
      setIsLoginRoute(false)
    }
  }, [router.pathname])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className='flex bg-darkGray h-full'>
          { !isLoginRoute && <Navbar /> }
          <div className={`${isLoginRoute ? 'w-full' : 'grow'}`}>
            <Component {...pageProps} />
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
