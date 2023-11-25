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

interface Filmes {
  _id: number;
  title: string;
  link: string;
  image: string;
}

function Filme(){
  const [filmes, setFilmes] = useState<Filmes[]>([]);

  useEffect(() => {
    axios('https://apisventv.vercel.app/content/v1/filmes')
      .then(response => {
        setFilmes(response.data.filmes);
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

  if(!filmes){
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
        className="z-50 py-8 mt-[-50px]"
      >
      
      {filmes.map((filme) => (
      <SwiperSlide key={filme._id} className="mr-1">
        <a 
          href={`/filme/${filme._id}`}
          className="w-full flex items-center justify-center bg-[#2a2a2f] h-[160px] p-5 rounded-md text-white"
        >
          <img className="w-44 h-auto" src={filme.image} alt={filme.title} />
        </a>
      </SwiperSlide>
    ))}
      </Swiper>
    </>
    
  )
}

export default Filme