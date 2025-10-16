// src/routes/album.routes.ts

import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middlewares/authMiddleware';

export const albumRouter = Router();

// CREATE: Adicionar um novo álbum
albumRouter.post('/', async (req: AuthRequest, res) => {
  const { title, releaseYear, coverImageUrl, artistId, tracks } = req.body;

  if (!title || !releaseYear || !artistId) {
    return res.status(400).json({ message: 'Título, ano de lançamento e ID do artista são obrigatórios.' });
  }

  try {
    const newAlbum = await prisma.album.create({
      data: {
        title,
        releaseYear: Number(releaseYear),
        coverImageUrl,
        artistId,
        tracks: {
          create: tracks, // 'tracks' 
        },
      },
      include: {
        tracks: true, // 
      },
    });
    return res.status(201).json(newAlbum);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2003') {
      return res.status(400).json({ message: 'O artista com o ID fornecido não existe.' });
    }
    return res.status(500).json({ message: 'Erro ao criar álbum.' });
  }
});

// READ: Listar todos os álbuns 
albumRouter.get('/', async (req: AuthRequest, res) => {
  const { search, artistId, decade } = req.query;
  const where: any = {};
  if (search) {
    where.OR = [
      { title: { contains: String(search), mode: 'insensitive' } },
      { artist: { name: { contains: String(search), mode: 'insensitive' } } },
    ];
  }
  if (artistId) {
    where.artistId = String(artistId);
  }
  if (decade) {
    const decadeStart = Number(decade);
    if (!isNaN(decadeStart) && decadeStart % 10 === 0) {
      const decadeEnd = decadeStart + 10;
      where.releaseYear = { gte: decadeStart, lt: decadeEnd };
    }
  }
  try {
    const albums = await prisma.album.findMany({
      where,
      orderBy: { title: 'asc' },
      include: { artist: { select: { name: true } } },
    });
    return res.status(200).json(albums);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar álbuns.' });
  }
});

// READ: Obter um álbum específico pelo ID, incluindo artista
albumRouter.get('/:id', async (req: AuthRequest, res) => {
  const { id } = req.params;
  try {
    const album = await prisma.album.findUnique({
      where: { id },
      include: {
        artist: { select: { name: true } },
        tracks: { orderBy: { number: 'asc' } }, // Inclui a tracklist ordenada
      },
    });
    if (!album) {
      return res.status(404).json({ message: 'Álbum não encontrado.' });
    }
    return res.status(200).json(album);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao obter álbum.' });
  }
});


// UPDATE: Atualizar um álbum
albumRouter.put('/:id', async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { title, releaseYear, coverImageUrl, artistId } = req.body;
  try {
    const updatedAlbum = await prisma.album.update({
      where: { id },
      data: {
        title,
        releaseYear: releaseYear ? Number(releaseYear) : undefined,
        coverImageUrl,
        artistId,
      },
    });
    return res.status(200).json(updatedAlbum);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Álbum não encontrado.' });
    }
    return res.status(500).json({ message: 'Erro ao atualizar álbum.' });
  }
});

// DELETE: excluir um álbum
albumRouter.delete('/:id', async (req: AuthRequest, res) => {
  const { id } = req.params;
  try {
    await prisma.album.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Álbum não encontrado.' });
    }
    return res.status(500).json({ message: 'Erro ao deletar álbum.' });
  }
});