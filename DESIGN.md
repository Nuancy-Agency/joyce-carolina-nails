# DESIGN.md — Joyce Carolina Nails

Este documento é um rascunho leve, escrito durante a geração automatizada do
site (site-forge), para dar contexto às ferramentas de auditoria (Impeccable)
e a quem for rodar `/impeccable audit`, `critique`, `polish` e `document`
depois, em sessão interativa. Ele **não substitui** essa etapa interativa —
só evita que decisões já tomadas com base em dados reais do cliente sejam
reinterpretadas como "genéricas" por um heurístico automático.

## Paleta de cores — por que cream/gold

- `--color-brand-cream` (`#F5F0E6`) e `--color-brand-gold` (`#C9A227`) **não
  são a paleta neutra "segura" default de UI gerada por IA** — são cores
  estimadas a partir de prints reais do Instagram da cliente (fita de LED
  dourada no espelho do estúdio, fundo claro do ambiente, francesinha/branco
  recorrente nos trabalhos). Ver
  `Clientes/@joycecarolina.nails/Identidade Visual/Análise Visual.md` e
  `site-forge/research/identity.json`.
- O Impeccable (`detect`) sinaliza `cream-palette` como um antipadrão de
  "AI slop" por reflexo — decisão consciente do site-forge: **manter**, pois
  aqui a origem é pesquisa real do cliente, não um placeholder. Registrado
  como pendência revisada e aceita no relatório de auditoria
  (`site-forge/auditorias/`), não como bug corrigido.
- Cores completas em `src/styles/global.css` (`@theme`), todas rastreáveis a
  `site-forge/research/identity.json:paleta_completa_analise_visual`.

## Tipografia

- Título: Cormorant Garamond (serifada editorial). Corpo: Karla (sans
  grotesca). Escolhida pelo usuário entre 3 pares propostos pelo agente — o
  Instagram do cliente não revela tipografia de marca (ver
  `identity.json:fontes.origem_da_decisao`).

## Estrutura de seções

Hero → Sobre → Serviços (tabs por categoria) → Galeria → Depoimentos →
Localização → CTA final → Footer. Rastreabilidade seção a seção em
`site-forge/brief/site-brief.json`.

## Atualização de criativos por área (2026-09-15, pós-build)

O usuário forneceu uma pasta curada por área — `Identidade Visual/Midia,
Referencias e CTAs/Site/{Hero,Sobre Joyce,Galeria,Comentario e
Depoimentos}/` — para substituir os criativos originalmente escolhidos pelo
site-forge:

- **Hero**: nova foto (manicure verde musgo + anel de rubi).
- **Sobre**: retrato de estúdio da própria Joyce. Este arquivo tem "ChatGPT
  Image" no nome — o site-forge havia excluído imagens desse padrão por
  falta de confirmação de autenticidade (ver `site-brief.json:
  assets.excluidos_intencionalmente`). O usuário confirmou explicitamente
  que é **foto real, apenas com upscaling de IA** (não é retrato gerado do
  zero) — decisão revisada e liberada para uso nesta atualização.
- **Galeria**: grid expandido de 12 para 14 fotos + 2 vídeos reais (autoplay
  mudo/loop, com checagem de `prefers-reduced-motion` via Alpine).
- **Depoimentos**: prints reais de 2 avaliações (Gabriela Guedes, Carolina
  Valente) como prova visual ao lado do texto verbatim, + 2 vídeos de
  depoimento reais (com controles nativos, sem autoplay).

Vídeos servidos como assets estáticos em `public/videos/` (fora do pipeline
`astro:assets`, que só processa imagem). Em automação de navegador
(Claude in Chrome) o carregamento dos vídeos ficou lento/instável nesta
sessão apesar do servidor responder corretamente (`curl`/`fetch` OK) —
provável throttling de mídia da aba automatizada, não bug confirmado do
site. Recomenda-se checagem visual manual da reprodução dos vídeos antes do
deploy.
