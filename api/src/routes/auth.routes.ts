// src/routes/auth.routes.ts

import { Router, Response } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authMiddleware, AuthRequest } from '../middlewares/authMiddleware';

export const authRouter = Router();

// --- Rota de Registro de Usuário ---
authRouter.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(409).json({ message: 'Este e-mail já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

// --- Rota de Login de Usuário ---
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    return res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

// --- Rota para obter informações do usuário autenticado ---
authRouter.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, createdAt: true }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});