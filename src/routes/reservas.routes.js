import express from "express";
import { listarReservas, listarReservasAtivas, criarReserva, atualizarReserva, deletarReserva }
from "../controllers/reservas.controller.js";

const router = express.Router();

router.get("/", listarReservas);
router.get("/ativas", listarReservasAtivas);
router.post("/", criarReserva);
router.put("/:id", atualizarReserva);
router.delete("/:id", deletarReserva);

export default router;