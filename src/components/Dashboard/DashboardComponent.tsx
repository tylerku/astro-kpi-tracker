import React from 'react'

interface DashboardComponentProps {
  className?: string
  children: React.ReactNode
}

const DashboardComponent: React.FC<DashboardComponentProps> = (props) => {
  return (
    <div className={`rounded-lg bg-gradient-to-b from-spaceGray to-transparent w-full h-full ${props.className ?? ''}`}>
      {props.children}
    </div>
  )
}

export default DashboardComponent