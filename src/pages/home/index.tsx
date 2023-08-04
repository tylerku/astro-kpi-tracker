import { useRouter } from "next/router";
import { CSSProperties, useState } from "react";
import { AuthContext } from "../../context";
import React, { useContext, useEffect } from "react";
import axios, { AxiosResponse } from 'axios'
import { redirect } from "next/dist/server/api-utils";
import {google, GoogleApis} from 'googleapis'
import incrementCell from "../api/googleSheets/incrementCell";
import { StringLiteral } from "typescript";
import { GaxiosPromise } from "googleapis/build/src/apis/abusiveexperiencereport";
import { init } from "next/dist/compiled/@vercel/og/satori";
import { MoonLoader } from "react-spinners";

interface HomePageProps {
  accessToken: string | null
}
const HomePage: React.FC<HomePageProps> = (props) => {

  const {state, dispatch} = useContext(AuthContext)
  const router = useRouter()
  const [kpi1, setKPI1] = useState(0)
  const [kpi2, setKPI2] = useState(0)
  const [kpi3, setKPI3] = useState(0)
  const [kpi4, setKPI4] = useState(0)
  const [kpi5, setKPI5] = useState(0)
  const [kpi6, setKPI6] = useState(0)

  const getMonthAndYearString = () => {
    const date = new Date()
    const month = date.toLocaleString('default', { month: 'long' })
    const year = date.getFullYear()
    return `${month} ${year}`
  }

  const getMappedCellIDForKPI = (kpiNumber: number) => {
    const monthAndYearString = getMonthAndYearString()
    const row = new Date().getDate() + 12
    const kpiToCellMap:  {[key: number]: string} = {
      1: `${monthAndYearString}!D${row}`,
      2: `${monthAndYearString}!E${row}`,
      3: `${monthAndYearString}!J${row}`,
      4: `${monthAndYearString}!K${row}`,
      5: `${monthAndYearString}!N${row}`,
      6: `${monthAndYearString}!O${row}`     
    }
    return kpiToCellMap[kpiNumber]
  }

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
      <div className='self-center font-mono text-4xl m-8'>Astro KPI Trackerr</div>
      <div className='mx-auto h-full flex flex-row self-center'>
        <KPIColumn cellId={getMappedCellIDForKPI(1)} title='Listings Called / Texted'/>
        <KPIColumn cellId={getMappedCellIDForKPI(2)} title='Listing Agent Conversations'/>
        <KPIColumn cellId={getMappedCellIDForKPI(3)} title='Verbal Offers On Market'/>
        <KPIColumn cellId={getMappedCellIDForKPI(4)} title='Verbal Offer Off Market'/>
        <KPIColumn cellId={getMappedCellIDForKPI(5)} title='Buyers Called / Texted'/>
        <KPIColumn cellId={getMappedCellIDForKPI(6)} title='New Buyer Added' />
      </div>
    </div>
  )
}

interface KPIColumnProps {
  title: string
  // kpiNumber: string
  cellId: string
}

const KPIColumn: React.FC<KPIColumnProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [kpiNumber, setKPINumber] = useState(0)

  useEffect(() => {
    initKpiNumber(props.cellId)
  }, [])

  const initKpiNumber = async (cell: string) => {
    setIsLoading(true)
    try {
      const response: Response = await fetch(`/api/googleSheets/getCellValue?cell=${cell}`, {
        method: 'GET'
      })
      const json = await response.json()
      setKPINumber(json.data)
    } catch(error) {
      console.log('Error initializing cell value: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const incrementCell = async (cell: string) => {
    console.log('incrementing cell: ', cell)
    const response: Response = await fetch(`/api/googleSheets/incrementCell?cell=${cell}`, {
      method: 'GET'
    })
    const json = await response.json()
    return json
  }

  const handleIncrementClicked = async () => {
    setIsLoading(true)
    try {
      const updatedCellValue = await incrementCell(props.cellId)
      setKPINumber(updatedCellValue)
    } catch (error) {
      console.log('Error incrementing cell: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div className='flex flex-col mx-4 justify-start items-center'>
      <h1 className='text-center m-4 font-bold'>{props.title}</h1>
      <div className='flex justify-center items-center h-20'>
        { 
          isLoading ? 
          <MoonLoader
            color={'#ffffff'}
            loading={isLoading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> : 
          <span className='text-center m-4 font-mono text-6xl'>{kpiNumber}</span>
        }
      </div>
      
      <div className="flex flex-row justify-between m-4">
        <button disabled={isLoading} className='font-bold bg-green-700 rounded p-2 px-4 mx-2 hover:scale-95 hover:bg-green-500 active:bg-blue-500 transition-all duration-150 disabled:bg-blue-500 disabled:opacity-50' onClick={handleIncrementClicked}>+1</button>
        {/* <button className='bg-red-700 rounded p-2 px-4 mx-2 hover:scale-95 hover:bg-red-500 active:bg-blue-500 transition-all duration-150' onClick={props.onClick ?? (() => console.log('clicked'))}>-1</button> */}
      </div>
      
    </div>
  )
} 

export default HomePage