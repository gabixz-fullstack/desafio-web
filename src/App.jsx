import { useState, useEffect } from 'react';
import Estatisticas from './componentes/estatisticas';
import { buscarPaises } from './services/countryService';
import { carregarFavoritos, salvarFavoritos } from './utils/favoritesStorage';

export default function App() {
  const [todosPaises, setTodosPaises] = useState([]);
  const [paisesNaTela, setPaisesNaTela] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  // Buscar países quando o app inicia
  useEffect(() => {
      // usar o serviço que normaliza os dados
      buscarPaises()
        .then(data => {
          setTodosPaises(data);
          setPaisesNaTela(data);
        })
        .catch(err => {
          console.error('Erro ao buscar países:', err);
          setTodosPaises([]);
          setPaisesNaTela([]);
        });

      // carregar favoritos do armazenamento
      const favs = carregarFavoritos();
      setFavoritos(favs);
  }, []);

  // (Mantemos apenas os dados; a UI de busca/lista foi removida)

  // salvar favoritos sempre que mudarem
  useEffect(() => {
    salvarFavoritos(favoritos);
  }, [favoritos]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Meu Projeto de Países</h1>

      <Estatisticas
        todosPaises={todosPaises}
        paisesNaTela={paisesNaTela}
        favoritos={favoritos}
      />
      {/* Apenas estatísticas exibidas — lista e busca removidas */}
    </div>
  );
}