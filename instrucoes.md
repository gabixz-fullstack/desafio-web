# UX / Fluxo esperado (referência)

A ideia geral é: o usuário entra no sistema e já consegue **ver países**, **refinar o que quer** e **abrir detalhes** sem sair de contexto.

## Fluxo principal

- Ao abrir o sistema, os países são carregados automaticamente.
- O usuário digita o nome (ou parte do nome) de um país e a lista vai ficando mais relevante (menos itens na tela).
- Se o usuário quiser, ele também aplica filtros (ex.: continente) e ordenação (ex.: população), para reduzir/organizar ainda mais.
- A tela mostra números gerais (quantos países existem no total, quantos estão sendo exibidos agora, quantos favoritos, etc.) para o usuário entender “onde ele está” dentro do conjunto.
- O usuário escolhe um país na lista e abre os detalhes (normalmente em modal), lendo as informações completas.
- O usuário pode favoritar/desfavoritar países, e isso fica salvo (localStorage).
- Se o usuário ativar “somente favoritos”, a lista passa a mostrar apenas os países que ele marcou.

## Comportamentos esperados

- Favoritar não pode duplicar o mesmo país.
- Abrir detalhes não deve exigir novo fetch (os dados já carregados devem ser reutilizados).

![Captura de tela (referência)](Captura%20de%20tela_14-5-2026_1562_.jpeg)

_Gerado por Claude Design_