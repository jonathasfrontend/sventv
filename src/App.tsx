import logo from "./assets/logo.svg";
import Movie from "./components/Movie";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Filmepost from './Filme';
import Desenhopost from './Desenho';
import Variedadepost from './Variedade';
import Esportepost from './Esportes';

import Filme from "./components/Filme";
import Desenho from "./components/Desenho";
import Variedade from "./components/Variedades";
import Esporte from "./components/Esporte";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#121214]">
        <header className="w-full absolute top-0 left-0 z-30 px-12 py-3 flex items-center justify-between">
          <a href="/">
            <img className="w-24" src={logo} alt="" />
          </a>
        </header>

        <Movie />

        <div className="w-full px-12">
          <Routes>
          <Route path="/" element={
            <>
              <Filme />
              <Desenho />
              <Variedade />
              <Esporte />
            </>
          } />
          </Routes>
        </div>
        
        <div className="w-full px-12">
          <Routes>
            <Route path="/filme/:id" element={
              <>
                <Filmepost />
                <Filme />
              </>
            } />
            <Route path="/desenho/:id" element={
              <>
                <Desenhopost />
                <Desenho />
              </>
            } />
            <Route path="/variedade/:id" element={
              <>
                <Variedadepost />
                <Variedade />
              </>
            } />
            <Route path="/esporte/:id" element={
              <>
                <Esportepost />
                <Esporte />
              </>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
