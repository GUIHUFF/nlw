import prisma from "../prismaClient";
import { convertMinutesToHoursString } from "../utils/convert-minutes-to-hours-string";

interface Props {
  gameId: string;
}

export async function getAdsByGameService({gameId}: Props){
  const ads =  await prisma.ad.findMany({
    where: {
      gameId
    },
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    orderBy: {
      createAt: 'desc'
    }
  });

  return ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHoursString(ad.hourStart),
      hourEnd: convertMinutesToHoursString(ad.hourEnd),
    }
  });

}