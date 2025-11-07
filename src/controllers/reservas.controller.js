import db from '../config/db.js';


export const listarReservas = async (req, res) => {
  try {
    const [reservas] = await db.query(`
      SELECT 
        r.id,
        u.nome AS usuario_nome,
        l.titulo AS livro_titulo,
        r.data_retirada,
        r.data_devolucao,
        r.confirmado_email,
        r.criado_em
      FROM reservas r
      INNER JOIN usuarios u ON r.usuario_id = u.id
      INNER JOIN livros l ON r.livro_id = l.id
      ORDER BY r.criado_em DESC
    `);

    res.json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao listar reservas' });
  }
};


export const criarReserva = async (req, res) => {
  try {
    const { usuario_id, livro_id, data_retirada, data_devolucao } = req.body;

    if (!usuario_id || !livro_id || !data_retirada || !data_devolucao) {
      return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios.' });
    }

    if (new Date(data_devolucao) <= new Date(data_retirada)) {
      return res.status(400).json({ erro: 'A data de devolução deve ser após a de retirada.' });
    }

    const [livro] = await db.query('SELECT ativo FROM livros WHERE id = ?', [livro_id]);
    if (livro.length === 0 || livro[0].ativo === 0) {
      return res.status(400).json({ erro: 'Livro inativo ou não encontrado.' });
    }

    await db.query(
      `INSERT INTO reservas (usuario_id, livro_id, data_retirada, data_devolucao)
       VALUES (?, ?, ?, ?)`,
      [usuario_id, livro_id, data_retirada, data_devolucao]
    );

    res.status(201).json({ mensagem: 'Reserva criada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar reserva.' });
  }
};


export const excluirReserva = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query('DELETE FROM reservas WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Reserva não encontrada.' });
    }

    res.json({ mensagem: 'Reserva excluída com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao excluir reserva.' });
  }
};
