import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useState } from "react";
import React, { useEffect } from "react";
import {PageWrapper, GoalsTable} from '../../components'
import { SingleBarGraph, BarGraph, TimeDisplay, SingleBarGraphOption, BarGraphOption } from "../../components/Dashboard";
import notionAPIService, { notionKPI } from "../../services/NotionAPIService";
import moment from 'moment-timezone'
import { useDispatch, useSelector } from "react-redux";
import { User, DailyKPI } from '@/models'
import axios from "axios";
import { initializeKPIs } from '../../redux/UserKPIs.slics'

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = (props) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [barGraphOptions, setBarGraphOptions] = useState<BarGraphOption[]>()
  const [singleBarGraphOptions, setSingleBarGraphOptions] = useState<SingleBarGraphOption[]>()
  const currentUser: User = useSelector((state: any) => state.auth.currentUser)
  const userWeeklyKPIs: Record<string, DailyKPI[]> = useSelector((state: any) => state.kpis.kpis)

  useEffect(() => {
    if (!currentUser) return
    initData(currentUser)
  }, [currentUser])

  useEffect(() => {
    console.log(userWeeklyKPIs)
    if (!userWeeklyKPIs) return
    const barGraphOptions = getBarGraphOptionsFromWeeklyKPIMetrics(userWeeklyKPIs)
    setBarGraphOptions(barGraphOptions)
    const todayKey = moment().format('YYYY-MM-DD')
    if (todayKey in userWeeklyKPIs) {
      const singleBarGraphOptions = getSingleBarGraphOptionsFromKPIMetrics(userWeeklyKPIs[todayKey]) 
      setSingleBarGraphOptions(singleBarGraphOptions)
    }
  }, [userWeeklyKPIs])

  const initUserKPIs = async (user: User) => {
    const resp = await axios.get(`/api/kpi/getWeeklyKPIs?userId=${user.id}`)
    const axiosData = resp.data
    const weeklyKPIs: Record<string, DailyKPI[]> = axiosData.data
    dispatch(initializeKPIs(weeklyKPIs))
  }
  
  const initData = async (user: User) => {
    initUserKPIs(user)
  }

  const logout = async () => {
    try {
      router.push('/auth/logout') 
    } catch (error) {
      console.log('Error logging out: ', error)
    }
  }

  const getSingleBarGraphOptionsFromKPIMetrics = (kpiMetrics: DailyKPI[]): SingleBarGraphOption[] => {
    const singleBarGraphOptions: SingleBarGraphOption[] = []
    kpiMetrics.forEach((kpi) => {
      singleBarGraphOptions.push({
        title: kpi.name,
        value: kpi.current,
        maxY: kpi.goal,
        yInterval: kpi.goal > 5 ? kpi.goal / 5 : 1,
        showZero: true,
      })
    })
    return singleBarGraphOptions
  }

  const getBarGraphOptionsFromWeeklyKPIMetrics = (weeklyKPIMetrics: Record<string, DailyKPI[]>): BarGraphOption[] => {
    type Weekday = {
      dayName: string
      date: string
    }
    const monday = moment().startOf('week').add(1, 'days').format('YYYY-MM-DD')
    const tuesday = moment().startOf('week').add(2, 'days').format('YYYY-MM-DD')
    const wednesday = moment().startOf('week').add(3, 'days').format('YYYY-MM-DD')
    const thursday = moment().startOf('week').add(4, 'days').format('YYYY-MM-DD')
    const friday = moment().startOf('week').add(5, 'days').format('YYYY-MM-DD')
    const saturday = moment().endOf('week').format('YYYY-MM-DD')
    const weekdays: Weekday[] = [{dayName: 'Mon', date: monday}, {dayName: 'Tue', date: tuesday}, {dayName: 'Wed', date: wednesday}, {dayName: 'Thur', date: thursday}, {dayName: 'Fri', date: friday}, {dayName: 'Sat', date: saturday}]
    const barGraphOptions: BarGraphOption[] = []

    weekdays.forEach((weekday) => {
      weeklyKPIMetrics[weekday.date]?.forEach(kpi => {
        if (barGraphOptions.find(val => val.title === kpi.name) === undefined) {
          barGraphOptions.push({
            title: kpi.name,
            maxY: kpi.goal,
            yInterval: kpi.goal > 5 ? kpi.goal / 5 : 1,
            showZero: true,
            data: [
              {
                title: weekday.dayName,
                value: kpi.current
              }
            ]
          })
        } else {
          const index = barGraphOptions.findIndex(val => val.title === kpi.name)
          barGraphOptions[index].data.push({
            title: weekday.dayName,
            value: kpi.current
          })
        }
      })
    })
    return barGraphOptions
  }

  return (
    <PageWrapper>
      <div className='h-full w-full bg-[#04122D] flex flex-row'>
        <div className='h-full w-full p-10 flex-grow flex flex-col space-y-8'>
          <PageHeader title={'Good Morning, Ty'}/>
          <div className='w-full grow flex flex-row justify-center items-center space-x-6'>
            <TodaySection
              className='shrink lg:grow'
              singleBarGraphOptions={singleBarGraphOptions ?? []}
            />
            <GraphsSection className='grow-2 lg:grow-3' options={barGraphOptions ?? []} />
          </div>
          <div className='w-full max-h-[50%] relative flex'>
            <GoalsTable />
          </div>
        </div>
        <div className='hidden xl:flex h-full w-[25%] bg-[#212046] max-w-[400px]'>
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
      <div className='flex flex-row grow w-full lg:space-x-6'>
        <div className='flex h-full transition-all'>
          <SingleBarGraph options={props.singleBarGraphOptions} />
        </div>
        <div className='flex grow flex-col h-full space-y-4'>
          <div className='grow w-full'>
            <TimeDisplay className='hidden lg:flex' time={'45:00'} title='Current Task'/>
          </div>
          <div className='grow w-full'>
            <TimeDisplay className='hidden lg:flex' time={'2:34'} title={'Time Working'}/>
          </div>
        </div>
      </div>
    </div>
  )
}

interface GraphsSectionProps {
  className: string
  options: BarGraphOption[]
}

const GraphsSection: React.FC<GraphsSectionProps> = (props) => {
  return (
    <div className={`h-full ${props.className ?? ''}`}>
      <BarGraph options={props.options}/>
    </div>
  )
}


export default HomePage