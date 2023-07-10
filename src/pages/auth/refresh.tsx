// pages/auth/callback.tsx (Client-side)

import { CSSProperties, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext, AuthContextValue } from '../../context';
import RingLoader from "react-spinners/RingLoader";
import {parse} from 'cookie'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

interface RefreshPageProps {
  refreshToken: string
  successRedirect: string
}
const RefreshPage: React.FC<RefreshPageProps> = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext<AuthContextValue>(AuthContext)

  useEffect(() => {
    refreshAccessToken();
  }, [])

  const refreshAccessToken = async () => {
    const response = await fetch(`/api/auth/refresh`, {
      headers: {
        'Authorization': `Bearer ${props.refreshToken}`
      }
    })
    console.log('finished the refresh request')
    if(response.ok) {
      console.log('The refresh request was successful')
      const data = await response.json()
      console.log('data from the refresh request', data)
      dispatch({type: 'setAccessToken', value: data.accessToken})
      console.log('redirecting to', props.successRedirect)
      router.push(props.successRedirect)
    } else {
      console.log('There was an error refreshing the access token')
    }
  }

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div className='mt-20 w-full flex flex-col'>
      <h1 className='my-20 text-xl text-center justify-center'>Refreshing your Astro KPI access...</h1>
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

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const successRedirect = context.query.redirectPath
  const cookies = parse(context.req.headers.cookie ?? '')
  const refreshToken = cookies['refreshToken']
  return {
    props: {
      refreshToken,
      successRedirect
    },
  };
};

export default RefreshPage