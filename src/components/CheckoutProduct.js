import { StarIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'
import Currency from 'react-currency-formatter'
import { useDispatch } from 'react-redux'
import { addToBasket, removeFromBasket } from '../slices/basketSlice'

export default function CheckoutProduct({
  id,
  title,
  description,
  price,
  category,
  image,
  rating,
  hasPrime,
}) {
  const dispatch = useDispatch()

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      description,
      price,
      category,
      image,
      rating,
      hasPrime,
    }

    dispatch(addToBasket(product))
  }
  const removeItemFromBasket = () => {
    
    dispatch(removeFromBasket({id}))
  }

  return (
    <div className='grid grid-cols-5'>
      <Image src={image} width={200} height={200} objectFit='contain' />
      {/* middle */}
      <div className='col-span-3 mx-5'>
        <p>{title}</p>
        <div className='flex'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className='h-5 text-yellow-500' />
            ))}
        </div>
        <p className='text-xs my-2 line-clamp-3'>{description}</p>
        <Currency quantity={price} currency='GBP' />
        {hasPrime && (
          <div className='flex items-center space-x-2'>
            <img
              loading='lazy'
              className='w-12'
              src='https://links.papareact.com/fdw'
              alt=''
            />
            <p className='text-xs text-gray-500'>FREE NEXT-day delivery u</p>
          </div>
        )}
      </div>
      <div className='flex flex-col space-y-2 my-auto justify-self-end'>
        <button onClick={addItemToBasket} className='button mt-auto'>
          Add To Basket
        </button>
        <button onClick={removeItemFromBasket} className='button mt-auto'>
          Remove from Basket
        </button>
      </div>
    </div>
  )
}
