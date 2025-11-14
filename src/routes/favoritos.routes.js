import express from "express";
import {
  adicionarFavorito,
  removerFavorito,
  listarFavoritos,
  listarFavoritosPorUsuario
  
} from "../controllers/favoritos.controller.js";

const router = express.Router();

router.get("/", listarFavoritos);
router.get("/usuario/:id", listarFavoritosPorUsuario);
router.post("/", adicionarFavorito);
router.delete("/:id", removerFavorito);

export default router;
