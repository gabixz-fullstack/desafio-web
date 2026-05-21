import CartaoPais from "./CartaoPais";

export default function Buscar({ pesquisa, paises, onSelecionar }) {
  const filtrados = paises.filter((pais) =>
    pais.name.common.toLowerCase().includes(pesquisa.toLowerCase()),
  );

  if (!filtrados.length) {
    return <p className="results-state">Nenhum país encontrado.</p>;
  }

  return (
    <section className="countries-section">
      <div className="countries-grid">
        {filtrados.map((pais) => (
          <CartaoPais
            key={pais.name.common}
            pais={pais}
            onSelecionar={() => onSelecionar(pais)}
          />
        ))}
      </div>
    </section>
  );
}
