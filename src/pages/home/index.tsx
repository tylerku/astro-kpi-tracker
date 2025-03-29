import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useState } from "react";
import React, { useEffect } from "react";
import {PageWrapper, DropdownMenu, SettingsButton, BasicButton} from '../../components'
import { SingleBarGraph, BarGraph, TimeDisplay, SingleBarGraphOption, BarGraphOption, KPICard, GoalsBoard, GoalsCardOption, GoalProgressItem } from "../../components/Dashboard";
import notionAPIService, { notionKPI } from "../../services/NotionAPIService";
import moment from 'moment-timezone'
import { useDispatch, useSelector } from "react-redux";
import { User, DailyKPI } from '@/models'
import axios from "axios";
import { initializeKPIs, incrementKPI, decrementKPI } from '../../redux/UserKPIs.slics'

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
    console.log('weeklyKPIs: ', weeklyKPIs)      
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

  const handleTestAIClicked = async () => {
    try {
      const resp = await axios.post('/api/crm/conversations/zOJ1F8VhO7U5FBMt5IC1/generateResponse')
      console.log('AI response: ', resp.data)
    } catch (error) {
      console.error('Error testing AI: ', error)
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

  const getGoalsBoardOptions = (): GoalsCardOption[] => {
    const goalCardOptions: GoalsCardOption[] = []
    const namesToSums: Record<string, GoalProgressItem> = {}
    for (const [date, kpis] of Object.entries(userWeeklyKPIs)) {
      kpis.forEach(kpi => {
        if (namesToSums[kpi.name]) {
          namesToSums[kpi.name].value += kpi.current
        } else {
          namesToSums[kpi.name] = {
            value: kpi.current,
            title: kpi.name,
            goal: kpi.goal
          } as GoalProgressItem
        }
      })
    }
    goalCardOptions.push({
      daysUntilGoalEnds: 0,
      dateRange: {
        begin: new Date(),
        end: new Date()
      },
      buttonTitle: 'Weekly',
      goalProgressItems: Object.values(namesToSums)
    } as GoalsCardOption)

    console.log('test: ', Object.values(namesToSums))
    console.log(goalCardOptions)

    return goalCardOptions

  }

  return (
    <PageWrapper>
      <div className='h-full w-full bg-darkGray flex flex-row'>
        <div className='h-full w-full p-10 flex-grow flex flex-col space-y-8'>
          <PageHeader title={'Good Morning, Ty'}/>
          <div className='w-full h-[50%] space-x-6 flex flex-row'>
            {/* <TodaySection
              className='shrink lg:grow'
              singleBarGraphOptions={singleBarGraphOptions ?? []}
            /> */}
            <KPISection className="shrink w-[50%]"/>
            <GraphsSection className={'w-[50%]'/*'grow-2 lg:grow-3'*/} options={barGraphOptions ?? []} />
          </div>
          <div className='w-full h-[50%] grow space-x-6 max-h-[50%] relative flex flex-row'>
            <GoalsBoard className='w-[50%] max-w-[50%] h-full' options={getGoalsBoardOptions()}/> 
            <BasicButton onClick={() => {
              router.push(`/api/auth/crm/start`)    
            }} text={'Connect Go High Level'}/>           
            <BasicButton onClick={() => handleTestAIClicked()} text={'Test AI'}/>
          </div>
        </div>
        <div className='hidden xl:flex h-full w-[25%] bg-spaceGray max-w-[400px]'>
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
interface KPISection {
  className?: string
}

const KPISection: React.FC<KPISection> = (props) => {
  
  const today = moment().format('YYYY-MM-DD');
  const kpis: Record<string, DailyKPI[]> = useSelector((state: any) => state.kpis.kpis)
  const dispatch = useDispatch()

  const handleIncrementClicked = async (kpi: DailyKPI) => {
    try{
      dispatch(incrementKPI({
        date: today as `${number}-${number}-${number}`,
        kpi
      }))
      const resp = await axios.post('/api/kpi/increment', {kpi})
      if (resp.status !== 200) {
        dispatch(decrementKPI({
          date: today as `${number}-${number}-${number}`,
          kpi 
        }))
      }
    } catch (error) {
      console.error(`There was an error incrementing the kpi ${kpi.name}. Error: ${error}`)
    }
    
  }

  return (
    <div className={`flex bg-transparent grow flex-col h-full space-y-3 ${props.className ?? ''}`}>
      <div className='flex flex-row space-x-3'>
        <div className='font-bold text-[lightGray] text-3xl mr-auto'>KPIs</div>
        <DropdownMenu 
          onOptionSelected={() => null} 
          buttonBgClass="bg-spaceGray"
          options={['Today', 'Yesterday']}          
        />
        <SettingsButton className={'bg-spaceGray'}/>
      </div>
      <div className='grid grid-cols-2 gap-3 overflow-auto no-scollbar'>
        {
          kpis[today]?.map((kpi: DailyKPI) => (
            <KPICard 
              className="col-span-1"
              onIncrement={() => handleIncrementClicked(kpi)}
              onDecrement={() => null} 
              title={kpi.name} 
              value={kpi.current} 
              goal={kpi.goal}      
            />
          ))
        }
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