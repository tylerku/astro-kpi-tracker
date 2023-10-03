import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { ChildProcess } from 'child_process'
import { useRouter } from 'next/router'
import Image from 'next/image'
 

const Navbar: React.FC<any> = () => {

  const router = useRouter()

  return(
    <nav className='w-[12%] bg-[#212046] h-screen'>
      <Logo />
      <ul className='flex flex-col'>
        <NavbarItem route={router.pathname} href='/home'>Home</NavbarItem>
        <NavbarItem route={router.pathname} href='/about'>About</NavbarItem>
        {/* <NavbarItem route={router.pathname} href='/about'>Account</NavbarItem> */}
      </ul>
    </nav>
  )
}

const Logo: React.FC<any> = () => {
  return (
    <div className='p-10 flex flex-row items-center justify-center'>
      <div className='w-8 aspect-square relative mx-4'>
        <Image src='/logo.svg' alt='logo' fill/>
      </div>
      <div className='font-bold text-xl'>
        Astro
      </div>
    </div>
  )
}

interface NavBarItemProps {
  href: string
  route: string
  children: React.ReactNode
}
const NavbarItem: React.FC<NavBarItemProps> = (props) => {
  return(
    <Link className={`${props.route === props.href ? 'bg-[#6E6E8199]' : ''} hover:bg-[#6E6E8199] transition-all duration-300 hover:ease-in ease-out p-1 my-1 mx-8 text-center rounded text-base font-bold`} href={props.href}>{props.children}</Link>

  )
}
 
export default Navbar