import { useEffect, useState } from "react";
import CartaoPais from "./CartaoPais";

export default function Buscar({ pesquisa }) {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population",
    )
      .then((res) => res.json())
      .then((res) => {
        setDados(res);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados:", err);
        setCarregando(false);
      });
  }, []);

  const dadosFiltrados = dados.filter((pais) =>
    pais.name.common.toLowerCase().includes(pesquisa.toLowerCase()),
  );

  if (carregando) {
    return <p className="results-state">Carregando países...</p>;
  }

  if (!dadosFiltrados.length) {
    return <p className="results-state">Nenhum país encontrado.</p>;
  }

  return (
    <section className="countries-section">
      <div className="countries-grid">
        {dadosFiltrados.map((pais) => (
          <CartaoPais key={pais.name.common} pais={pais} />
        ))}
      </div>
    </section>
  );
}
