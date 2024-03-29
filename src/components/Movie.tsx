import { useEffect, useState } from 'react'
import axios from "axios";
import Loader from './Loader';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
}

function Movie() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    axios('https://api.themoviedb.org/3/movie/popular?api_key=506fadb0256c13349acc05dabebf9604&language=pt-BR&page=1')
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.error("Error fetching movies:", error);
      });
    }, [])

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

  return(
    <div className="w-full h-[90vh] relative">

        <div className="w-full h-full absolute top-0 left-0 z-10">
        {!imageLoaded && <Loader />}
        {movies.length > 0 && (
          <img
            className={`w-full h-full object-cover ${imageLoaded ? 'visible' : 'hidden'}`}
            src={`https://image.tmdb.org/t/p/original/${movies[0].backdrop_path}`}
            alt=""
            onLoad={handleImageLoad}
          />
        )}
        </div>

        <div className="w-full h-full flex items-center justify-between absolute z-20 px-12 gradient-color">
        
        {movies.length > 0 && (
            <div key={movies[0].id} className="w-[50%] h-full flex justify-center flex-col">
              <h1 className="text-6xl font-bold text-white">{movies[0].title}</h1>
              <span className="text-sm font-normal text-white my-5">
                Data de lançamento: {new Date(movies[0].release_date).toLocaleDateString('pt-BR')}
              </span>
              <p className="text-base font-medium text-white">{movies[0].overview}</p>
            </div>
          )}
            <div className="w-[330px] h-[470px] flex justify-center items-center">
            {movies.length > 0 && (
              <img
              className="w-full h-full border-4"
              src={"https://image.tmdb.org/t/p/original/"+movies[0].poster_path}
              alt=""
              />
            )}
            </div>

        </div>

      </div>
  )
}

export default Movie