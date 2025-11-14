import express from 'express';
import cors from 'cors';

import livrosRoutes from './routes/livros.routes.js';
import avaliacoesRoutes from './routes/avaliacoes.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import reservasRoutes from './routes/reservas.routes.js';
import favoritosRoutes from './routes/favoritos.routes.js';



const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());


app.use('/livros', livrosRoutes);
app.use('/avaliacoes', avaliacoesRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/reservas', reservasRoutes);
app.use('/favoritos', favoritosRoutes);

app.get('/', (req, res) => {
  res.json({ mensagem: '📚 API da Biblioteca Online está rodando com sucesso!' });
});



app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
