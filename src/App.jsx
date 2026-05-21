import { useState } from 'react'
import Buscar from './equipe1/Buscar'
import './App.css'


export function App() {
  const [pesquisa, setPesquisa] = useState("")

  
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

      <Buscar pesquisa={pesquisa} />
    </main>
  )
}

export default App;
