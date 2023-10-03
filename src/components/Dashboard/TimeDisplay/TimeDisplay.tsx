import React from 'react'
import DashboardComponent from '../DashboardComponent'

interface TimeDisplayProps {
  time: string
  title: string
}

const TimeDisplay: React.FC<TimeDisplayProps> = (props) => {
  return (
    <DashboardComponent className='flex flex-col justify-center items-center'>
      <div className='text-white text-3xl font-bold'>
        {props.time}
      </div>
    </DashboardComponent>
  )
}

export default TimeDisplay