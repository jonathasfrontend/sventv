import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { register } from 'swiper/element/bundle';
register()
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from 'react';
import axios from "axios";
import Loader from './Loader';

interface BBBCamItems {
  _id: number;
  title: string;
  link: string;
  image: string;
}

function Bbb(){
  const [bbbCam, setBbb] = useState<BBBCamItems[]>([]);

  useEffect(() => {
    axios('https://apisventv.vercel.app/content/v1/bbb')
      .then(response => {
        setBbb(response.data.bbb);
      })
      .catch(error => {
        console.error("Error fetching movies:", error);
      });
    }, []);

  const [slidePerView, setSlidePerView] = useState(5);

  useEffect(() => {
    function handleResize(){
      if (window.innerWidth < 1110) {
        setSlidePerView(2);
      }else{
        setSlidePerView(4);
      }
      if (window.innerWidth < 600){
        setSlidePerView(1);
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return() =>{
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  if(!bbbCam){
    return(
      <Loader />
    )
  }

  return(
    <>
      <Swiper
        slidesPerView={slidePerView}
        pagination={{ clickable: true }}
        navigation
        loop={true}
        className="z-50 py-8 mt-[-70px]"
      >
      
      {bbbCam.map((bbb) => (
      <SwiperSlide key={bbb._id} className="mr-1">
        <a 
          href={`/bbb/${bbb._id}`}
          className="w-full relative flex flex-col items-center justify-center overflow-hidden bg-[#2a2a2f] h-[160px] p-5 rounded-md text-white"
        >
          <img className="w-full h-full object-cover absolute z-10" src={bbb.image} alt={bbb.title} />
          <h1 className="bottom-1 font-semibold text-lg absolute z-20 drop-shadow-2xl" >{bbb.title}</h1>
        </a>
      </SwiperSlide>
    ))}
      </Swiper>
    </>
    
  )
}

export default Bbb