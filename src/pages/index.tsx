import Image from 'next/image'
import Link from 'next/link'
import { AuthContext } from '../context'
import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Home() {
  
  const {state, dispatch} = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    console.log('The useEffect hook ran with accessToken: ', state.accessToken)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-[#04122D]">
      <div className="text-center z-10 w-full max-w-5xl items-center justify-between font-mono text-4xl">
        Astro KPI Tracker
      </div>
      <button onClick={() => router.push('/api/auth/google')} className='bg-white hover:bg-blue-500 hover:translate-x-1 p-4 rounded min-w-30 text-black mt-20'>Sign In With Google</button>
    </main>
  )
}
