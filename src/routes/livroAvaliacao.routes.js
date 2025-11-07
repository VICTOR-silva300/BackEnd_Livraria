import express from 'express';
import { listarAvaliacoesLivros } from '../controllers/avaliacoesLivro.controller.js';

const router = express.Router();

router.get('/livros/avaliacoes', listarAvaliacoesLivros);

export default router;
