import "./styles/main.css";

import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';

import logoImg from "./assets/Logo-nlw-esports.svg";
import GameBanner from "./components/GameBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from 'axios';


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:1337/games')
    .then(response => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.</h1>
    
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-16 ">

        {games.map(game => {
          return (
            <GameBanner key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          );
        })
        }
        
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
        
      </Dialog.Root>
    </div>
  )
}

export default App
