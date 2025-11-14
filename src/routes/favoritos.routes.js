import express from "express";
import {
  adicionarFavorito,
  removerFavorito,
  listarFavoritos
} from "../controllers/favoritos.controller.js";

const router = express.Router();

router.get("/", listarFavoritos);
router.post("/", adicionarFavorito);
router.delete("/:id", removerFavorito);

export default router;
