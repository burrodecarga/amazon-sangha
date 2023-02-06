import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import Currency from 'react-currency-formatter'
import { useSelector } from 'react-redux'
import CheckoutProduct from '../components/CheckoutProduct'
import Header from '../components/Header'
import { selectItems, selectTotal } from '../slices/basketSlice'
import {loadStripe} from '@stripe/stripe-js'
import axios, { Axios } from 'axios'

const stripePromise = loadStripe(process.env.stripe_public_key)

export default function Checkout() {
  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)
  const { data: session, status } = useSession()

  const createCheckoutSession = async ()=>{
    const stripe = await stripePromise
    // creación de backend session
    //console.log('session desde checkout:'+session.user.email)

    const checkoutSession = await axios.post('api/create-checkout-session',{
      items:items,
      email:session.user.email,
    })

    // redirección de usuario a stripe checkout

    const result = await stripe.redirectToCheckout({
      sessionId:checkoutSession.data.id,
    })
    
    if(result.error)alert(result.error.message)

    

  }
  
  return (
    <div className='bg-gray-100'>
      <Header />
      <main className='2xl:flex max-w-screen-2xl mx-auto'>
        {/* left */}
        <div className='flex-grow m-5 shadow-sm'>
          <Image
            src='https://links.papareact.com/ikj'
            width={1020}
            height={250}
            objectFit='contain'
          />

          <div className='2xl:flex flex-col p-5 space-y-10 bg-white'>
            <h1 className='text-3xl border-b pb-4'>
              {items.length === 0
                ? 'Your Amazon Basket is empty'
                : 'Your Shopping Basket'}
            </h1>

            {items.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                rating={item.rating}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>
          <div className='flex flex-col bg-white p-10 shadow-md'>
          {items.length > 0 && (
            <>
              <h2 className='whitespace-nowrap'>
                subtotal ({items.length}  Items) : {" "}
                <span className='font-bold'>
                  <Currency quantity={total} currency='EUR' />
                </span>
              </h2>
              <button 
              role="link"
              onClick={createCheckoutSession}
              disabled={!session}
              className={`button mt-2 ${
                !session && 
                "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}>
              {!session ? 'sign In to Checkout':'Checkout'}
              </button>
            </>
          )}
          </div>
      </main>
    </div>
  )
}
