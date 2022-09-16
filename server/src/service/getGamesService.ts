import prisma from "../prismaClient";

export async function getGameService(){
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  });

  return games;
}