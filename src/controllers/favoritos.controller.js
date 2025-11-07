import db  from '../config/db.js';


export const listarFavoritos = async (req, res) => {
  try {
    const [favoritos] = await db.query(`
      SELECT 
        f.id,
        u.nome AS usuario_nome,
        l.titulo AS livro_titulo,
        f.data_favoritado
      FROM favoritos f
      INNER JOIN usuarios u ON f.usuario_id = u.id
      INNER JOIN livros l ON f.livro_id = l.id
      ORDER BY f.data_favoritado DESC
    `);

    res.json(favoritos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao listar favoritos.' });
  }
};


export const criarFavorito = async (req, res) => {
  try {
    const { usuario_id, livro_id } = req.body;

    if (!usuario_id || !livro_id) {
      return res.status(400).json({ erro: 'Usuário e livro são obrigatórios.' });
    }

    const [livro] = await db.query('SELECT ativo FROM livros WHERE id = ?', [livro_id]);
    if (livro.length === 0 || livro[0].ativo === 0) {
      return res.status(400).json({ erro: 'Livro inativo ou não encontrado.' });
    }

    const [existe] = await db.query(
      'SELECT id FROM favoritos WHERE usuario_id = ? AND livro_id = ?',
      [usuario_id, livro_id]
    );
    if (existe.length > 0) {
      return res.status(400).json({ erro: 'Este livro já está nos favoritos.' });
    }

    await db.query('INSERT INTO favoritos (usuario_id, livro_id) VALUES (?, ?)', [
      usuario_id,
      livro_id,
    ]);

    res.status(201).json({ mensagem: 'Livro adicionado aos favoritos!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao adicionar favorito.' });
  }
};


export const excluirFavorito = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query('DELETE FROM favoritos WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Favorito não encontrado.' });
    }

    res.json({ mensagem: 'Favorito removido com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao excluir favorito.' });
  }
};
