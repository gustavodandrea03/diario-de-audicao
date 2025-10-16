// src/routes/review.routes.ts

import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middlewares/authMiddleware';

export const reviewRouter = Router();

// CREATE: Adicionar uma nova avaliação para um álbum
reviewRouter.post('/albums/:albumId/reviews', async (req: AuthRequest, res) => {
  const { albumId } = req.params;
  const userId = req.userId!; 
  const { overallRating, reviewText } = req.body;

  if (!overallRating || overallRating < 1 || overallRating > 10) {
    return res.status(400).json({ message: 'A nota (overallRating) é obrigatória e deve ser entre 1 e 10.' });
  }

  try {
    const newOrUpdatedReview = await prisma.review.upsert({
      where: {
        userId_albumId: { // garante que um usuário só pode avaliar um álbum uma vez
          userId,
          albumId,
        },
      },
      update: { // Se já existe, atualiza
        overallRating: Number(overallRating),
        reviewText,
      },
      create: { // Se não existe, cria
        overallRating: Number(overallRating),
        reviewText,
        albumId,
        userId,
      },
    });

    return res.status(201).json(newOrUpdatedReview);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao salvar avaliação.' });
  }
});