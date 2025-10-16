import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { authRouter } from './routes/auth.routes';
import { authMiddleware } from './middlewares/authMiddleware'; 
import { artistRouter } from './routes/artist.routes';   
import { albumRouter } from './routes/album.routes'; 
import { dashboardRouter } from './routes/dashboard.routes'; 
import { reviewRouter } from './routes/review.routes'; 



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'API Diário de Audição está funcionando!' });
});

app.use('/auth', authRouter);
app.use('/auth', authRouter);

// --- ROTAS DE ARTISTAS (PROTEGIDAS)
app.use('/artists', authMiddleware, artistRouter); 
// --- ROTAS DE ÁLBUNS (PROTEGIDAS) 
app.use('/albums', authMiddleware, albumRouter); 
// --- ROTA DO DASHBOARD (PROTEGIDA) 
app.use('/dashboard', authMiddleware, dashboardRouter); 
// --- ROTAS DE AVALIAÇÕES (PROTEGIDAS)
app.use('/', authMiddleware, reviewRouter); 



const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});

