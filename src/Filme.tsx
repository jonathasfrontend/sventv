import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './components/Loader';

interface Filme {
  _id: number;
  title: string;
  link: string;
  image: string;
}

function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState<Filme | null>(null);

  useEffect(() => {
    axios.get(`https://apisventv.vercel.app/content/v1/filmes/${id}`)
      .then(response => {
        setFilme(response.data.filme);
      })
      .catch(error => {
        console.error("Error fetching filme details:", error);
      });
  }, [id]);

  if (!filme) {
    return (
      <div>
        <Loader />
      </div>
      )
  }

  return (
    <div className="w-full h-[600px] flex flex-col justify-center items-center">
        <h2 className="text-xl text-white font-bold my-5">{filme.title}</h2>
        <iframe 
        src={filme.link} 
        className="w-full h-full bg-black borde-none mb-10 rounded-md overflow-hidden"
        scrolling='no' 
        allow="encrypted-media"
        allowFullScreen
        >
          
        </iframe>
    </div>
  );
}

export default Filme;
