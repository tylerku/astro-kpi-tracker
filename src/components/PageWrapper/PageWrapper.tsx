import React, {useContext, useEffect} from 'react'
import { Navbar } from '../'
import { AuthContext } from '../../context'

interface PageWrapperProps {
  children: React.ReactNode
}

const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  const {state, dispatch} = useContext(AuthContext)
  // get refreshToken from local storage

  useEffect(() => {
    console.log('stat.accessToken is: ', state.accessToken)
  }, [state.accessToken])

  return (
    <div className='flex h-screen w-full flex-col'>
      {props.children}
    </div>
  )
}

export default PageWrapper