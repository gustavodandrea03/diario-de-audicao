// src/routes/artist.routes.ts

import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middlewares/authMiddleware';

export const artistRouter = Router();

// CREATE: Criar um novo artista
artistRouter.post('/', async (req: AuthRequest, res) => {
  const { name, imageUrl } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O nome do artista é obrigatório.' });
  }

  try {
    const newArtist = await prisma.artist.create({
      data: {
        name,
        imageUrl,
      },
    });
    return res.status(201).json(newArtist);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar artista.' });
  }
});

// READ: Listar todos os artistas
artistRouter.get('/', async (req: AuthRequest, res) => {
  try {
    const artists = await prisma.artist.findMany({
      orderBy: { name: 'asc' }
    });
    return res.status(200).json(artists);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar artistas.' });
  }
});

// READ: Obter um artista específico pelo ID
artistRouter.get('/:id', async (req: AuthRequest, res) => {
  const { id } = req.params;

  try {
    const artist = await prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) {
      return res.status(404).json({ message: 'Artista não encontrado.' });
    }
    return res.status(200).json(artist);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao obter artista.' });
  }
});

// UPDATE: Atualizar um artista
artistRouter.put('/:id', async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { name, imageUrl } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O nome do artista é obrigatório.' });
  }

  try {
    const updatedArtist = await prisma.artist.update({
      where: { id },
      data: {
        name,
        imageUrl,
      },
    });
    return res.status(200).json(updatedArtist);
  } catch (error) {
    // Verifica se o erro é porque o artista não foi encontrado
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Artista não encontrado.' });
    }
    return res.status(500).json({ message: 'Erro ao atualizar artista.' });
  }
});

// DELETE: excluir um artista
artistRouter.delete('/:id', async (req: AuthRequest, res) => {
  const { id } = req.params;

  try {
    await prisma.artist.delete({
      where: { id },
    });
    // 204 No Content, pois não há conteúdo para retornar
    return res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Artista não encontrado.' });
    }
    return res.status(500).json({ message: 'Erro ao deletar artista.' });
  }
});