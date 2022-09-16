

import prisma from "../prismaClient";
import { convertHoursStringToMinutes } from "../utils/convert-hour-string-to-minutes";

interface Props {
  gameId: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: Array<number>;
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

export async function createAdByGameService({ 
  gameId,
  name,
  yearsPlaying,
  discord,
  hourEnd,
  hourStart,
  useVoiceChannel,
  weekDays
}: Props){
  
  const ad = await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays: weekDays.join(','),
      hourStart: convertHoursStringToMinutes(hourStart),
      hourEnd: convertHoursStringToMinutes(hourEnd),
      useVoiceChannel
    }
  });

  return ad;
}