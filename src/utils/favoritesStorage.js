const KEY = 'favoritos_paises_v1';

export function salvarFavoritos(favoritos) {
  try {
    localStorage.setItem(KEY, JSON.stringify(favoritos));
  } catch (e) {
    console.error('Não foi possível salvar favoritos:', e);
  }
}

export function carregarFavoritos() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Não foi possível carregar favoritos:', e);
    return [];
  }
}
