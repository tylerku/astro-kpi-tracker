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
import {PageWrapper, GoalsTable} from '../../components'
import { SingleBarGraph, BarGraph, TimeDisplay, SingleBarGraphOption } from "../../components/Dashboard";
import notionAPIService, { notionKPI } from "../../services/NotionAPIService";

interface HomePageProps {
  accessToken: string | null
  kpiMetrics: notionKPI[]
}
const HomePage: React.FC<HomePageProps> = (props) => {

  const router = useRouter()
  const [showLayover, setShowLayover] = useState(false)
  const [kpiMetrics, setKpiMetrics] = useState<notionKPI[]>(props.kpiMetrics)

  useEffect(() => {
    setKpiMetrics(props.kpiMetrics)
  }, [props.kpiMetrics])

  const logout = async () => {
    try {
      router.push('/auth/logout') 
    } catch (error) {
      console.log('Error logging out: ', error)
    }
  }

  const onGoalsTableKpiUpdated = (kpi: notionKPI) => {
    const updatedKpiMetrics = kpiMetrics.map((item: notionKPI) => {
      if (item.key === kpi.key) {
        return kpi
      }
      return item
    })
    setKpiMetrics(updatedKpiMetrics)
  }

  return (
    <PageWrapper>
      <div className='h-full w-full bg-[#04122D] flex flex-row'>
        <div className='h-full w-full p-10 flex-grow flex flex-col space-y-8'>
          <PageHeader title={'Good Morning, Ty'}/>
          <div className='w-full grow flex flex-row justify-center items-center space-x-6'>
            <TodaySection
              className=''
              singleBarGraphOptions={kpiMetrics.map((item: notionKPI) => ({
                maxY: item.goal,
                value: item.value,
                title: item.key,
                yInterval: item.goal > 5 ? item.goal / 5 : 1,
                showZero: true
              }))}
            />
            <GraphsSection className='grow'/>
          </div>
          <div className='w-full max-h-[50%] relative flex'>
            <GoalsTable kpiMetrics={kpiMetrics} onKpiUpdated={onGoalsTableKpiUpdated}/>
          </div>
        </div>
        <div className='h-full w-[25%] bg-[#212046] max-w-[400px]'>
        </div>
      </div>
    </PageWrapper>
  )
}



interface PageHeaderProps {
  title: string
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {

  const getTodaysDate = () => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October','November', 'December']
    const today = new Date();
    const month = today.getMonth(); // Months are zero-indexed
    const day = today.getDate();
    const year = today.getFullYear();
    return `${monthNames[month]} ${day}, ${year}`;
  }

  return (
    <div className='w-full flex flex-row justify-between'>
      <div className='text-white text-3xl font-bold'>
        {props.title}
      </div>
      <div className='text-[#BCBCBC] text-3xl font-bold'>
        {getTodaysDate()}
      </div>
    </div>
  )
}

interface TodaySectionProps {
  className: string
  singleBarGraphOptions: SingleBarGraphOption[]
}

const TodaySection: React.FC<TodaySectionProps> = (props) => {
  return (
    <div className={`flex flex-col h-full space-y-2 ${props.className ?? ''}`}>
      <div className='text-base font-bold font-white w-full'>
        Today
      </div>
      <div className='flex flex-row flex-grow w-full xl:space-x-6'>
        <div className='flex grow h-full transition-all'>
          <SingleBarGraph options={props.singleBarGraphOptions} />
        </div>
        <div className='flex grow flex-col h-full space-y-4'>
          <div className='flex-grow w-full'>
            <TimeDisplay className='hidden xl:flex' time={'45:00'} title='Current Task'/>
          </div>
          <div className='flex-grow w-full'>
            <TimeDisplay className='hidden xl:flex' time={'2:34'} title={'Time Working'}/>
          </div>
        </div>
      </div>
    </div>
  )
}

interface GraphsSectionProps {
  className: string
}

const GraphsSection: React.FC<GraphsSectionProps> = (props) => {
  return (
    <div className={`h-full ${props.className ?? ''}`}>
      <BarGraph />
    </div>
  )
}

export const getServerSideProps = async () => {
  const kpiNames: string[] = ["Offers Made", "Agent Conversations", "Buyers Found"]
  const kpiGoals: Record<string, number> = { [kpiNames[0]]: 5, [kpiNames[1]]: 50, [kpiNames[2]]: 2 }
  const kpiMetrics = await notionAPIService.getTodaysKPIs(kpiNames, kpiGoals)
  return {
    props: {
      kpiMetrics 
    }
  }
}



export default HomePage