import { useRouter } from "next/router";
import { AuthContext } from "../../context";
import React, { useContext, useEffect } from "react";
import axios from 'axios'
import { redirect } from "next/dist/server/api-utils";

interface HomePageProps {
  accessToken: string | null
}
const HomePage: React.FC<HomePageProps> = (props) => {

  const {state, dispatch} = useContext(AuthContext)
  const router = useRouter()

  const checkAuth = () => {
    // if (props.accessToken) { // access token was passed from the server
    //   dispatch({type: 'setAccessToken', value: props.accessToken})
    // } 
  }

  useEffect(() => {
    // checkAuth()
  }, [])

  useEffect(() => {
    // const logoutIfNoAccessToken = () => { !state.accessToken && router.push('/') }
    // logoutIfNoAccessToken()
  }, [state.accessToken])

  const logout = async () => {
    try {
      router.push('/auth/logout') 
    } catch (error) {
      console.log('Error logging out: ', error)
    }
  }

  return (
    <div className='flex h-screen w-screen flex-col'>
      <button className='w-20 bg-red-500 rounded m-4 self-end' onClick={() => logout()}>Logout</button>
      <div className='text-xl self-center'>Astro KPI Tracker</div>
      <div className='mx-auto h-full flex flex-row self-center'>
        <KPIColumn title='Agent Outreach'/>
        <KPIColumn title='MLS Outreach'/>
        <KPIColumn title='Offers'/>
        <KPIColumn title='Escrow'/>
      </div>
     
    </div>
  )
}

interface KPIColumnProps {
  title: string
}

const KPIColumn: React.FC<KPIColumnProps> = (props) => {
  return (
    <div className='flex flex-col mx-4 justify-start items-center'>
      <h1 className='text-center m-4'>{props.title}</h1>
      <button className='bg-blue-500 rounded p-2 px-4' onClick={() => console.log('Button was clicked')}>Increment</button>
    </div>
  )
} 

export default HomePage