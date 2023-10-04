import React from 'react'
import DashboardComponent from '../DashboardComponent'

interface TimeDisplayProps {
  time: string
  title: string
  className?: string
}

const TimeDisplay: React.FC<TimeDisplayProps> = (props) => {
  return (
    <DashboardComponent className={`flex flex-col justify-center items-center relative ${props.className}`}>
      <div className='text-white p-4 h-full w-full flex flex-col justify-center items-center'>
        <div className='pt-6 h-full text-xl font-bold flex justify-center items-center'>
          {props.time}
        </div>
        <div className='text-slate-400 h-6 font-bold flex justify-center items-center w-full whitespace-nowrap'>
          {props.title}
        </div> 
      </div>

    </DashboardComponent>
  )
}

export default TimeDisplay