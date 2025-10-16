// src/routes/dashboard.routes.ts

import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middlewares/authMiddleware';

export const dashboardRouter = Router();

dashboardRouter.get('/', async (req: AuthRequest, res) => {
  try {
    const [topArtists, predominantDecade, topRatedAlbums] = await Promise.all([
      getTopArtists(),
      getPredominantDecade(),
      getTopRatedAlbums(),
    ]);

    return res.status(200).json({
      topArtists,
      predominantDecade,
      topRatedAlbums,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao calcular estatísticas.' });
  }
});

// --- Funções

// Função para buscar os 3 artistas com mais álbuns
async function getTopArtists() {
  const artistCounts = await prisma.album.groupBy({
    by: ['artistId'],
    _count: { artistId: true },
    orderBy: { _count: { artistId: 'desc' } },
    take: 3,
  });
  const artistIds = artistCounts.map(item => item.artistId);
  const artists = await prisma.artist.findMany({
    where: { id: { in: artistIds } },
    select: { id: true, name: true },
  });
  return artistCounts.map(countItem => {
    const artist = artists.find(a => a.id === countItem.artistId);
    return {
      artistName: artist?.name || 'Artista Desconhecido',
      albumCount: countItem._count.artistId,
    };
  });
}

async function getPredominantDecade() {
  const albums = await prisma.album.findMany({ select: { releaseYear: true } });
  if (albums.length === 0) return null;
  const decadeCounts = new Map<number, number>();
  albums.forEach(album => {
    const decade = Math.floor(album.releaseYear / 10) * 10;
    decadeCounts.set(decade, (decadeCounts.get(decade) || 0) + 1);
  });
  let predominantDecade = 0;
  let maxCount = 0;
  for (const [decade, count] of decadeCounts.entries()) {
    if (count > maxCount) {
      maxCount = count;
      predominantDecade = decade;
    }
  }
  return predominantDecade;
}

// Função para buscar os 3 álbuns com maior média de nota
async function getTopRatedAlbums() {
  const averageRatings = await prisma.review.groupBy({
    by: ['albumId'],
    _avg: {
      overallRating: true,
    },
    orderBy: {
      _avg: {
        overallRating: 'desc',
      },
    },
    take: 3,
  });

  if (averageRatings.length === 0) {
    return [];
  }

  
  const topAlbumIds = averageRatings.map(agg => agg.albumId);

  
  const topAlbums = await prisma.album.findMany({
    where: {
      id: {
        in: topAlbumIds,
      },
    },
    include: {
      artist: {
        select: { name: true },
      },
    },
  });

  // combinar dados do álbum com as médias calculadas
  const result = averageRatings.map(agg => {
    const albumDetails = topAlbums.find(album => album.id === agg.albumId);
    return {
      ...albumDetails,
      averageRating: agg._avg.overallRating,
    };
  });

  return result;
}