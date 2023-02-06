import React from 'react'
import Image from 'next/image'
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars4Icon,
} from '@heroicons/react/24/outline'
import { useSession, signIn, signOut } from "next-auth/react"
import {Router, useRouter} from "next/router"
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'


export default function Header() {
 
  const {data:session} = useSession()
  const router = useRouter()
  const items = useSelector(selectItems)

  return (
    <header>
      <div className='flex items-center bg-amazon_blue flex-grow p-1'>
        {/* top nav */}
        <div onClick={() =>router.push("/")} className='flex items-center bg-amazon_blue flex-grow sm:flex-grow-0'>
          <Image
           onClick={() =>router.push("/")}
            src='/rokave_wr.png'
            width={150}
            height={40}
            objectFit='contain'
            className='cursor-pointer text-white items-center'
          />
        </div>
        {/* search */}
        <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 '>
          <input
            className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none'
            type='text'
          />
          <MagnifyingGlassIcon className='mx-6 h-12 w-4 text-blue-500' />
        </div>
        {/* right */}
        <div className='text-xs text-white flex items-center space-x-6 mx-6 whitespace-nowrap'>
          <div onClick={!session? signIn:signOut} className='link'>
            <p>
              { session ?  `Hellow ${session.user.name}`:'Sign In'}
            </p>
            <p className='font-extrabold md:text-sm'>Account & Lists</p>
           
          </div>

          <div className='link'  onClick={() =>router.push("/")}>
            <p onClick={() =>router.push("/")}>Return</p>
            <p onClick={() =>router.push("/")} className='font-extrabold md:text-sm'>& Orders</p>
          </div>
          <div onClick={()=>router.push('/checkout')} className='relative link flex items-center'>
            <span className='absolute top-0 right-0 md:right-10 w-4 h-4 bg-yellow-400 rounded-full text-center text-black font-bold'>
              {items.length}
            </span>
            <ShoppingCartIcon className='h-10' />
            <p className='hidden md:inline font-extrabold md:text-sm md:mt-2'>
              Basket
            </p>
          </div>
        </div>
        </div>
        <div className='flex items-center bg-amazon_blue-light text-white text-sm space-x-3 p-2 pl-6'>
        {/* botton nav */}
        <Bars4Icon className='h-6 mr-1' />
        <p className='link'>All</p>
        <p className='link'>Prime Video</p>
        <p className='link'>New Video</p>
        <p className='link'>Bet Video</p>
        <p className='link hidden lg:inline-flex'>Electronic</p>
        <p className='link hidden lg:inline-flex'>Electronic</p>
        <p className='link hidden lg:inline-flex'>Electronic</p>
        <p className='link hidden lg:inline-flex'>Electronic</p>
      </div>
    </header>
  )
}
