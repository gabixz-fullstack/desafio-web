import React from 'react';

export default function Estatisticas({ todosPaises = [], paisesNaTela = [], favoritos = [] }) {
  const continentes = new Set(
    todosPaises.map(p => p.region || 'Unknown')
  );

  return (
    <div style={{
      backgroundColor: '#0b3d91',
      color: '#fff',
      padding: '18px',
      borderRadius: '8px',
      maxWidth: '420px'
    }}>
      <h3 style={{ marginTop: 0 }}>📊 Painel de Estatísticas</h3>

      <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
        <li><strong>Total de países carregados:</strong> {todosPaises.length}</li>
        <li><strong>Países exibidos na tela:</strong> {paisesNaTela.length}</li>
        <li><strong>Favoritos:</strong> {favoritos.length}</li>
        <li><strong>Continentes disponíveis:</strong> {continentes.size}</li>
      </ul>
    </div>
  );
}
