import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { ChildProcess } from 'child_process'
import { useRouter } from 'next/router'
import Image from 'next/image'
 

const Navbar: React.FC<any> = () => {
  const router = useRouter()
  return(
    <nav className='w-[5%] bg-spaceGray my-5 ml-5 rounded-lg'>
      <Logo />
      <ul className='flex flex-col space-y-8 items-center justify-center'>
        <NavbarItem route={router.pathname} href='/home' icon='home'>Home</NavbarItem>
        <NavbarItem route={router.pathname} href='/messages' icon='message'>Home</NavbarItem>
        <NavbarItem route={router.pathname} href='/keys' icon='key'>Home</NavbarItem>
      </ul>
    </nav>
  )
}

const Logo: React.FC<any> = () => {
  return (
    <div className='px-2 py-10 flex flex-col items-center justify-center'>
      <div className='w-8 aspect-square relative mx-4'>
        <Image src='/logo.svg' alt='logo' fill/>
      </div>
      <div className='font-bold text-lg 2xl:text-xl'>
        Astro
      </div>
    </div>
  )
}

interface NavBarItemProps {
  href: string
  route: string
  icon: 'home' | 'message' | 'key'
  children: React.ReactNode
}
const NavbarItem: React.FC<NavBarItemProps> = (props) => {
  const getImageSrc = (): string => {
    switch(props.icon) {
      case 'home':
        return '/home-icon.svg'
      case 'message':
        return '/message-icon.svg'
      case 'key':
        return '/key-icon.svg'
      default:
        return '/home-icon.svg'
    }
  }
  return(
    <Link href={props.href} className='w-full flex justify-center items-center'>
      <div className='transition aspect-square w-6 relative hover:scale-[95%] cursor-pointer'>
        <Image src={getImageSrc()} fill alt={'home'} />
      </div>
    </Link>
  )
}
 
export default Navbar