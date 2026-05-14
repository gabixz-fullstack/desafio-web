export async function buscarPaises() {
  const resposta = await fetch('https://restcountries.com/v3.1/all');

  if (!resposta.ok) {
    throw new Error('Erro ao buscar países');
  }

  const data = await resposta.json();

  // Normaliza os dados para um formato simples usado pela app
  return data.map(item => ({
    name: item?.name?.common || item?.name || 'Unknown',
    alpha3Code: item?.cca3 || item?.ccn3 || item?.alpha3Code || item?.cca2,
    region: item?.region || (item?.continents && item.continents[0]) || 'Unknown',
  }));
}
