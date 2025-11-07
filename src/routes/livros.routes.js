import express from 'express';
import { listarLivros, buscarLivro, criarLivro, atualizarLivro, excluirLivro, livrosComAvaliacoes } from '../controllers/livros.controller.js';

const router = express.Router();

router.get('/avaliacoes', livrosComAvaliacoes); 
router.get('/avaliacoes/:id', livrosComAvaliacoes); 
router.post('/', criarLivro);
router.put('/:id', atualizarLivro);
router.delete('/:id', excluirLivro);

export default router;
