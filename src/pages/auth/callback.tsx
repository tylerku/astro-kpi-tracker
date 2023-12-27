// pages/auth/callback.tsx (Client-side)

import { CSSProperties, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RingLoader from "react-spinners/RingLoader";
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/redux/Auth.slice'

// import { googleConfig } from '../../../googleConfig';

const CallbackPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    const { code } = router.query;
    saveAccessTokenFromAuthCode(code as string);
  }, [router.query])

  const saveAccessTokenFromAuthCode = async (authCode: string) => {
    if (authCode) {
      try {
        const resp = await fetch('/api/auth/callback', {
          method: 'POST',
          body: JSON.stringify({ code: authCode }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await resp.json()
        const user = data.user
        dispatch(setCurrentUser(user))
        router.push('/home')
      } catch (error) {
        console.error('Error during OAuth2 callback:', error);
      }
      setIsLoading(false);
      return null
    } else {
      console.log('There is no code found in the url')
    }
  }

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div className='pt-20 w-full min-h-screen flex flex-col bg-darkGray'>
      <h1 className='my-20 text-xl text-center justify-center'>Loading your Astro KPI dashboard...</h1>
      <RingLoader
        color={'#ffffff'}
        loading={isLoading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default CallbackPage
