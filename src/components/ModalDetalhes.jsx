import { useEffect, useState } from "react";

const CAMPOS_EXTRAS = ["subregion"]; // campos que não cabem nos 10 do fetch da lista — buscados sob demanda ao abrir o modal

export function ModalDetalhes({ isOpen, onClose, pais }) {
  const [extras, setExtras] = useState(null);
  const [carregandoExtras, setCarregandoExtras] = useState(false);

  const detalhes = !pais
    ? null
    : {
        nome: pais.nome || "", //usando operador OU, só pro caso de algum país não ter o nome, aí usamos uma string vazia pra evitar erros
        nomeOficial: pais.nomeOficial || "",
        capital: Array.isArray(pais.capital)
          ? pais.capital.join(", ")
          : pais.capital || "",
        continente: Array.isArray(pais.continente)
          ? pais.continente.join(", ")
          : pais.continente || "",
        subRegiao: pais.subRegiao || extras?.subregion || "",
        populacao: pais.populacao || 0,
        areaTerritorial: pais.areaTerritorial || 0,
        idiomas: pais.idiomas || [],
        moeda: Array.isArray(pais.moeda)
          ? pais.moeda.join(", ")
          : pais.moeda || "",
        fusoHorario: Array.isArray(pais.fusoHorario)
          ? pais.fusoHorario.join(", ")
          : pais.fusoHorario || "",
        dominioInternet: Array.isArray(pais.dominioInternet)
          ? pais.dominioInternet.join(", ")
          : pais.dominioInternet || "",
        bandeiraUrl: pais.bandeiraUrl || "",
        bandeiraEmoji: pais.bandeiraEmoji || pais.flag || "",
        linkMaps: pais.linkMaps || "",
      };

  useEffect(() => {
    if (!isOpen || !pais?.nome) {
      setExtras(null);
      return;
    }

    const controller = new AbortController();
    setCarregandoExtras(true);

    fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(pais.nome)}?fullText=true&fields=${CAMPOS_EXTRAS.join(",")}`,
      { signal: controller.signal },
    )
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body = await res.json();
        if (!Array.isArray(body) || !body[0]) throw new Error("sem dados");
        setExtras(body[0]);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Erro ao buscar detalhes do país:", err);
        }
      })
      .finally(() => setCarregandoExtras(false));

    return () => controller.abort();
  }, [isOpen, pais?.nome]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose(); // permite fechar o modal apertando Esc no teclado
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-label="Detalhes do país"
      >
        <div className="modal-header">
          <h2 className="modal-title">Detalhes do país</h2>
          <button type="button" className="modal-close" onClick={onClose}>
            Fechar
          </button>
        </div>

        {!detalhes ? (
          <p className="modal-empty">Nenhum país selecionado.</p>
        ) : (
          <div className="modal-body">
            <div className="modal-flag">
              {detalhes.bandeiraUrl ? (
                <img
                  src={detalhes.bandeiraUrl}
                  alt={`Bandeira de ${detalhes.nomeOficial || detalhes.nome || "país"}`}
                  loading="lazy"
                />
              ) : detalhes.bandeiraEmoji ? (
                <span
                  aria-label={`Bandeira de ${detalhes.nomeOficial || detalhes.nome || "país"}`}
                >
                  {detalhes.bandeiraEmoji}
                </span>
              ) : null}
            </div>

            <div className="modal-list">
              <div className="modal-item">
                <span className="modal-label">Nome oficial</span>
                <span className="modal-value">
                  {detalhes.nomeOficial || "—"}
                </span>
              </div>
              <div className="modal-item">
                <span className="modal-label">Capital</span>
                <span className="modal-value">{detalhes.capital || "—"}</span>
              </div>
              <div className="modal-item">
                <span className="modal-label">Continente</span>
                <span className="modal-value">
                  {detalhes.continente || "—"}
                </span>
              </div>
              <div className="modal-item">
                <span className="modal-label">Sub-região</span>
                <span className="modal-value">
                  {detalhes.subRegiao || (carregandoExtras ? "Carregando..." : "—")}
                </span>
              </div>
              <div className="modal-item">
                <span className="modal-label">Área territorial</span>
                <span className="modal-value">
                  {detalhes.areaTerritorial
                    ? detalhes.areaTerritorial.toLocaleString("pt-BR")
                    : "—"}
                </span>
              </div>
              <div className="modal-item">
                <span className="modal-label">População</span>
                <span className="modal-value">
                  {detalhes.populacao
                    ? detalhes.populacao.toLocaleString("pt-BR")
                    : "—"}
                </span>
              </div>
              <div className="modal-item">
                <span className="modal-label">Idiomas</span>
                <span className="modal-value">
                  {detalhes.idiomas.length ? detalhes.idiomas.join(", ") : "—"}
                </span>
              </div>
              <div className="modal-item">
                <span className="modal-label">Moeda</span>
                <span className="modal-value">{detalhes.moeda || "—"}</span>
              </div>
              <div className="modal-item">
                <span className="modal-label">Fuso horário</span>
                <span className="modal-value">
                  {detalhes.fusoHorario || "—"}
                </span>
              </div>
              <div className="modal-item">
                <span className="modal-label">Link do maps</span>
                <span className="modal-value">
                  <a
                    href={detalhes.linkMaps || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver no Google Maps
                  </a>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalDetalhes;
