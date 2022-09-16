import "./styles/main.css";
import 'swiper/css';
import 'swiper/css/navigation';
import "./styles/slider.css";

import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useRef, useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';

import logoImg from "./assets/Logo-nlw-esports.svg";
import GameBanner from "./components/GameBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';

import { A11y, Navigation } from "swiper";

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
    <>
    <div className="sm:w-[95%] max-w-[1344px] mx-auto flex items-center flex-col my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20 text-center">Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.</h1>
      {games.length < 7 ?
          (<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-16 ">

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
        ) :
        (<Swiper
          modules={[Navigation, A11y]}
          slidesPerView={1.5}
          spaceBetween={12}
          loop
          navigation
          breakpoints={{
            400: {
              slidesPerView: 2
            },
            640: {
              slidesPerView: 2.5
            },
            768: {
              slidesPerView: 3.4
            },
            900: {
              slidesPerView: 4
            },
            1024: {
              slidesPerView: 4.4
            },
            1280: {
              slidesPerView: 5.5
            }
          }}
        >
          {games.map(game => {
            return (
              <SwiperSlide key={game.id} >
                <GameBanner
                  title={game.title}
                  bannerUrl={game.bannerUrl}
                  adsCount={game._count.ads}
                />
              </SwiperSlide>
            );
          })
          }
      
        </Swiper>) 
      }

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
        
      </Dialog.Root>
    </div>
    </>
  )
}

export default App
