import React from 'react'

interface DashboardComponentProps {
  className?: string
  children: React.ReactNode
}

const DashboardComponent: React.FC<DashboardComponentProps> = (props) => {
  return (
    <div className={`rounded-lg bg-[#212046] w-full h-full ${props.className ?? ''}`}>
      {props.children}
    </div>
  )
}

export default DashboardComponent