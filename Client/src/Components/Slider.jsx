import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import "../assets/css/swiperStyles.css"
import "swiper/css/bundle"
import SliderCard from './SliderCard';

const Slider = () => {

    const products = useSelector((state) => state.products)
    const [fruits, setfruits] = useState(null)

    useEffect(() => {
      setfruits(products?.filter((data) => data.product_category === "fruits"))
      console.log(products)
    }, [products])
    

  return (
    <div className='w-full pt-24'>
        <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        modules={[ Autoplay]}
        autoplay={{
          delay: 1000,
        }}
        className="mySwiper"
      >
        {fruits && fruits.map((data, i) =><SwiperSlide key={i}>
            <SliderCard key={i} data={data} index={i} />
        </SwiperSlide>
)}
      </Swiper>
    </div>
  )
}

export default Slider