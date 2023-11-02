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

interface Esporte {
  _id: number;
  title: string;
  link: string;
  image: string;
}

function Esporte(){
  const [esporte, setEsporte] = useState<Esporte[]>([]);

  useEffect(() => {
    axios('https://apisventv.vercel.app/content/v1/esportes')
      .then(response => {
        setEsporte(response.data.esportes);
      })
      .catch(error => {
        console.error("Error fetching movies:", error);
      });
    }, []);

  const [slidePerView, setSlidePerView] = useState(4);

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

  if (!esporte) {
    return (
        <Loader />
      )
  }

  return(
    <>
      <Swiper
        slidesPerView={slidePerView}
        pagination={{ clickable: true }}
        navigation
        className="z-50 py-8"
      >
      
          {esporte.map((filme) => (
            <SwiperSlide key={filme._id}>
                <a
                href={`/esporte/${filme._id}`}
                // href={filme.link}
                className="w-full flex items-center justify-center bg-[#2a2a2f] h-[160px] p-5 rounded-md border-r-4 border-[#121214] text-white"
                >
                  <img className="w-44 h-auto" src={filme.image} alt={filme.title} />
                </a>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
    
  )
}

export default Esporte