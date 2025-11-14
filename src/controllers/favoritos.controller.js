import  db  from "../config/db.js";

export async function listarFavoritos(req, res) {
  try {
    const [favoritos] = await db.query("SELECT * FROM favoritos");
    res.status(200).json(favoritos);
  } catch (erro) {
    res.status(500).json({ msg: "Erro ao listar favoritos" });
  }
}

export async function adicionarFavorito(req, res) {
  try {
    const { usuario_id, livro_id } = req.body;
    await db.query(
      "INSERT INTO favoritos (usuario_id, livro_id) VALUES (?, ?)",
      [usuario_id, livro_id]
    );
    res.status(201).json({ msg: "Favorito adicionado com sucesso" });
  } catch (erro) {
    res.status(500).json({ msg: "Erro ao adicionar favorito" });
  }
}

export async function removerFavorito(req, res) {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM favoritos WHERE id = ?", [id]);
    res.status(200).json({ msg: "Favorito removido com sucesso" });
  } catch (erro) {
    res.status(500).json({ msg: "Erro ao remover favorito" });
  }
}


export async function listarFavoritosPorUsuario(req, res) {
  try {
    const { id } = req.params;
    console.log("ID do usuário:", id); 

  
    const [favoritos] = await db.query(
      "SELECT * FROM favoritos WHERE usuario_id = ?",
      [id]
    );

    console.log("Favoritos encontrados:", favoritos);
    res.status(200).json(favoritos);
  } catch (erro) {
    console.error("ERRO REAL:", erro);
    res.status(500).json({ msg: "Erro ao listar favoritos do usuário", erro: erro.message });
  }
}
