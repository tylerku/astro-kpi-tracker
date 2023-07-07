// pages/auth/callback.tsx (Client-side)

import { CSSProperties, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext, AuthContextValue } from '../../context';
import RingLoader from "react-spinners/RingLoader";
import Cookies from 'js-cookie';

// import { googleConfig } from '../../../googleConfig';

const CallbackPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext<AuthContextValue>(AuthContext)
  const [accessToken, setAccessToken] = useState('empty')

  useEffect(() => {
    const { code } = router.query;
    saveAccessTokenFromAuthCode(code as string);
  }, [router.query])

  const saveAccessTokenFromAuthCode = (authCode: string) => {
    if (authCode) {
      // Call your server-side API endpoint to exchange the authorization code for an access token
      console.log('Auth code found on callback page. About to exchange it for an access token....')
      fetch('/api/auth/callback', {
        method: 'POST',
        body: JSON.stringify({ code: authCode }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server-side callback
        dispatch({type: 'setAccessToken', value: data.accessToken})
        Cookies.set('accessToken', data.accessToken, {expires: 30, sameSite: 'strict', httpOnly: true, path: '/'})
        router.push('/home')
      })
      .catch((error) => {
        console.error('Error during OAuth2 callback:', error);
      }).finally(() => {
        console.log('Made it to the finally clause of the callback')
        setIsLoading(false);
        return null
      });
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
    <div className='mt-20 w-full flex flex-col'>
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
