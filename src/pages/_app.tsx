import React, {useEffect, useState} from "react";
import App from "next/app";
import './globals.css';
import {AuthContextProvider} from '../context';
import {Navbar} from "../components";
import { useRouter } from "next/router";

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
    <AuthContextProvider>
      <div className='flex'>
        { !isLoginRoute && <Navbar /> }
        <div className={`${isLoginRoute ? 'w-full' : 'w-[88%]'}`}>
          <Component {...pageProps} />
        </div>
      </div>
    </AuthContextProvider>
  );
};

export default MyApp;
