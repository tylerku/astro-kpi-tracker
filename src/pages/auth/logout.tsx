// pages/auth/callback.tsx (Client-side)

import { CSSProperties, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext, AuthContextValue } from '../../context';
import RingLoader from "react-spinners/RingLoader";
import Cookies from 'js-cookie';
import axios from 'axios';

const CallbackPage: React.FC = () => {
  const router = useRouter();
  const { dispatch } = useContext<AuthContextValue>(AuthContext)

  useEffect(() => {
    logout()
  }, [])

  const logout = async () => {
    try {
      await axios.get('/api/auth/logout')
      dispatch({type: 'setAccessToken', value: null})
      router.push('/')
    } catch (error) {
      console.error('Error removing auth cookies during logout:', error);
    }
    
  }

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div className='mt-20 w-full flex flex-col bg-[#04122D]'>
      <h1 className='my-20 text-xl text-center justify-center'>Logging out of Astro KPI Tracker...</h1>
      <button onClick={() => router.push('/')}>Logout</button>
      <RingLoader
        color={'#ffffff'}
        loading={true}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default CallbackPage
