import prisma from "../prismaClient";

interface Props {
  adsId: string;
}

export async function getDiscordByAdService({ adsId }: Props){
  const ad = await prisma.ad.findUniqueOrThrow({
    where: {
      id: adsId
    },
    select: {
      discord: true,
    }
  });

  return {
    discord: ad.discord,
  };
}