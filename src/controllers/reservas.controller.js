import  db  from "../config/db.js";

export async function listarReservas(req, res) {
  try {
    const [reservas] = await db.query(`
      SELECT r.id, 
             u.nome AS usuario, 
             l.titulo AS livro, 
             r.data_retirada, 
             r.data_devolucao, 
             r.confirmado_email, 
             r.criado_em
      FROM reservas r
      JOIN usuarios u ON r.usuario_id = u.id
      JOIN livros l ON r.livro_id = l.id
    `);
    res.status(200).json(reservas);
  } catch (erro) {
    res.status(500).json({ msg: "Erro ao listar reservas" });
  }
}

export async function criarReserva(req, res) {
  try {
    const { usuario_id, livro_id, data_retirada, data_devolucao } = req.body;
    await db.query(
      `INSERT INTO reservas (usuario_id, livro_id, data_retirada, data_devolucao) 
       VALUES (?, ?, ?, ?)`,
      [usuario_id, livro_id, data_retirada, data_devolucao]
    );
    res.status(201).json({ msg: "Reserva criada com sucesso" });
  } catch (erro) {
    res.status(500).json({ msg: "Erro ao criar reserva" });
  }
}

export async function atualizarReserva(req, res) {
  try {
    const { id } = req.params;
    const { data_retirada, data_devolucao } = req.body;
    await db.query(
      `UPDATE reservas 
       SET data_retirada = ?, data_devolucao = ? 
       WHERE id = ?`,
      [data_retirada, data_devolucao, id]
    );
    res.status(200).json({ msg: "Reserva atualizada com sucesso" });
  } catch (erro) {
    res.status(500).json({ msg: "Erro ao atualizar reserva" });
  }
}

export async function deletarReserva(req, res) {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM reservas WHERE id = ?", [id]);
    res.status(200).json({ msg: "Reserva deletada com sucesso" });
  } catch (erro) {
    res.status(500).json({ msg: "Erro ao deletar reserva" });
  }
}
