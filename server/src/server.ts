import express, { Request, Response} from "express";

import cors from 'cors';

import { getGameService } from "./service/getGamesService";
import { getAdsByGameService } from "./service/getAdsByGame";
import { getDiscordByAdService } from "./service/getDiscordByAd";
import { createAdByGameService } from "./service/createAdByGame";

const app = express();

app.use(express.json());
app.use(cors());


app.get('/games', async (request: Request, response: Response) => {
  const games = await getGameService();

  return response.json(games);
});

app.post("/games/:gameId/ads", async (request: Request, response: Response) => {
  
  const gameId = request.params.gameId;

  const { 
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel, 
  } = request.body;

  const ad = await createAdByGameService({
    gameId,
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel
  });

  return response.status(201).json(ad);
});

app.get("/games/:id/ads", async (request: Request, response: Response) => {
  const gameId = request.params.id;

  const ads = await getAdsByGameService({ gameId });

  return response.json(ads);

});

app.get("/ads/:id/discord", async (request: Request, response: Response) => {
  const adsId = request.params.id;

  const ad = await getDiscordByAdService({ adsId });

  return response.json(ad);
});


app.listen(1337, () => {
  console.log(`Rodando... Porta: ${process.env.API_PORT}`);
});