import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel'

export default function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full bg-gradient-to-t from-gray-500 to-transparent bottom-0 z-20"/>
      <Carousel 
      autoPlay
      infiniteLoop
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      interval={5000}
      >
        <div>
          <img loading="lazy" src="/v3.jpg" alt="" className="object-cover object-center h-96" />
        </div>
        <div>
          <img loading="lazy" src="/v5.jpg" alt="" className="object-cover object-center h-96" />
        </div>
        <div>
          <img loading="lazy" src="/v7.jpg" alt="" className="object-cover object-center h-96" />
        </div>
      </Carousel>
    </div>
  )
}
