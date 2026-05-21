function CartaoPais({ pais, onSelecionar }) {
  const clicavel = typeof onSelecionar === "function";

  return (
    <article
      className="country-card"
      role={clicavel ? "button" : undefined}
      tabIndex={clicavel ? 0 : undefined}
      onClick={clicavel ? onSelecionar : undefined}
      onKeyDown={
        clicavel
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelecionar();
              }
            }
          : undefined
      }
    >
      <img
        className="country-flag"
        src={pais.flags?.svg || pais.flags?.png}
        alt={`Bandeira de ${pais.name.common}`}
      />

      <div className="country-content">
        <h2>{pais.name.common}</h2>

        <div className="country-details">
          <p>
            <span>Capital:</span> {pais.capital?.[0] || "-"}
          </p>
          <p>
            <span>Região:</span> {pais.region || "-"}
          </p>
          <p>
            <span>População:</span>{" "}
            {pais.population?.toLocaleString("pt-BR") || "-"}
          </p>
        </div>
      </div>
    </article>
  );
}

export default CartaoPais;
