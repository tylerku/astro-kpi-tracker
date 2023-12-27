// pages/auth/callback.tsx (Client-side)

import { CSSProperties, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext, AuthContextValue } from '../../context';
import RingLoader from "react-spinners/RingLoader";
import {parse} from 'cookie'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

interface RefreshPageProps {
  refreshToken: string
  successRedirect?: string
}
const RefreshPage: React.FC<RefreshPageProps> = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    refreshAccessToken();
  }, [])

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(`/api/auth/refresh`, {
        headers: {
          'Authorization': `Bearer ${props.refreshToken}`
        }
      })
      if(response.ok) {
        console.log('The refresh request was successful')
        const data = await response.json()
        const redirectLocation = props.successRedirect ?? '/home'
        console.log('data from the refresh request', data)
        console.log('redirecting to', redirectLocation)
        router. replace(redirectLocation) // WARNING: This request is not using the current cookies, but the old ones
      } else {
        console.log('There was an error refreshing the access token')
        router.push('/auth/logout')
      } 
    } catch(error) {
      console.log('Error with /api/auth/refresh endpoint: ', error)
    }
  }

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div className='pt-20 w-full h-full flex flex-col bg-darkGray'>
      <h1 className='my-20 text-xl text-center justify-center'>Refreshing your Astro KPI access...</h1>
      <RingLoader
        onClick={() => router.push('/home')}
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

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const successRedirect = context.query.redirectPath as string ?? undefined
  const cookies = parse(context.req.headers.cookie ?? '')

  const refreshToken = cookies['refreshToken']
  const props: RefreshPageProps = {
    refreshToken
  }
  if (refreshToken) {
    props.refreshToken = refreshToken
  } else {
    return {
      redirect: {
        destination: '/auth/logout',
        permanent: false
      }
    }
  }
  if (successRedirect) {
    props.successRedirect = successRedirect
  }
  return {
    props
  };
};

export default RefreshPage