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
    const { code, state: userId } = router.query;
    saveAccessTokenFromAuthCode(code as string, userId as string);
  }, [router.query])

  const saveAccessTokenFromAuthCode = async (code: string, userId: string) => {
    try {
      await fetch('/api/auth/crm/updateTokens', {
        method: 'POST',
        body: JSON.stringify({
          code,
          userId
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      router.push('/home')
    } catch (error) {
      console.error('Error during OAuth2 crm callback:', error);
      // TODO return an error message to the home page
    }
    setIsLoading(false);
    return null
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
