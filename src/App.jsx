import { useEffect, useState } from "react";
import Buscar from "./equipe1/Buscar";
import { ModalDetalhes } from "./components/ModalDetalhes.jsx";
import "./App.css";

const FIELDS =
  "name,flags,capital,region,population,area,languages,currencies,timezones,maps";

export function App() {
  const [pesquisa, setPesquisa] = useState("");
  const [paises, setPaises] = useState([]);
  const [paisSelecionado, setPaisSelecionado] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all?fields=${FIELDS}`)
      .then((res) => res.json())
      .then(setPaises);
  }, []);

  function selecionarPais(pais) {
    setPaisSelecionado({
      nome: pais.name.common,
      nomeOficial: pais.name.official,
      capital: pais.capital,
      continente: pais.region,
      populacao: pais.population,
      areaTerritorial: pais.area,
      idiomas: pais.languages && Object.values(pais.languages),
      moeda: pais.currencies && Object.values(pais.currencies).map((c) => c.name),
      fusoHorario: pais.timezones,
      bandeiraUrl: pais.flags.svg,
      linkMaps: pais.maps.googleMaps,
    });
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>Pesquisa por país</h1>
      </header>

      <section className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar por país..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          className="search-input"
        />
      </section>

      <Buscar
        pesquisa={pesquisa}
        paises={paises}
        onSelecionar={selecionarPais}
      />

      <ModalDetalhes
        isOpen={Boolean(paisSelecionado)}
        onClose={() => setPaisSelecionado(null)}
        pais={paisSelecionado}
      />
    </main>
  );
}

export default App;
