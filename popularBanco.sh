#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo "==========================================="
echo "LinkMaster - Populador de Banco de Dados"
echo "==========================================="
echo ""

if ! curl -s -f http://localhost:3000/links > /dev/null 2>&1; then
    echo -e "${RED}Erro: Servidor nao esta rodando em http://localhost:3000${NC}"
    echo -e "${YELLOW}Inicie o servidor com: npm run dev${NC}"
    exit 1
fi
echo -e "${GREEN}Servidor conectado${NC}"
echo ""

echo -e "${YELLOW}Quantos links deseja criar?${NC}"
read -p "Digite um numero: " NUM_LINKS

if ! [[ "$NUM_LINKS" =~ ^[0-9]+$ ]]; then
    echo -e "${RED}Erro: Digite apenas numeros${NC}"
    exit 1
fi

if [ "$NUM_LINKS" -lt 1 ]; then
    echo -e "${RED}Erro: Numero deve ser maior que 0${NC}"
    exit 1
fi

if [ "$NUM_LINKS" -gt 5000 ]; then
    echo -e "${RED}Erro: Maximo permitido e 5000 links${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}Criando ${NUM_LINKS} links...${NC}"
echo ""

URLS=(
  "https://github.com"
  "https://stackoverflow.com"
  "https://medium.com"
  "https://dev.to"
  "https://freecodecamp.org"
  "https://w3schools.com"
  "https://mozilla.org"
  "https://nodejs.org"
  "https://reactjs.org"
  "https://vuejs.org"
  "https://angular.io"
  "https://tailwindcss.com"
  "https://getbootstrap.com"
  "https://figma.com"
  "https://netlify.com"
  "https://vercel.com"
  "https://heroku.com"
  "https://digitalocean.com"
  "https://aws.amazon.com"
  "https://cloud.google.com"
  "https://mongodb.com"
  "https://postgresql.org"
  "https://mysql.com"
  "https://redis.io"
  "https://docker.com"
  "https://kubernetes.io"
  "https://jenkins.io"
  "https://git-scm.com"
  "https://bitbucket.org"
  "https://atlassian.com"
  "https://netflix.com"
  "https://spotify.com"
  "https://youtube.com"
  "https://twitter.com"
  "https://linkedin.com"
  "https://facebook.com"
  "https://instagram.com"
  "https://tiktok.com"
  "https://discord.com"
  "https://slack.com"
  "https://zoom.us"
  "https://microsoft.com"
  "https://apple.com"
  "https://google.com"
  "https://amazon.com"
)

SUCESSO=0
ERRO=0
TEMPO_INICIO=$(date +%s)

gerar_url_aleatoria() {
  local base_url=${URLS[$((RANDOM % ${#URLS[@]}))]}
  local random_path="/page$((RANDOM % 1000))"
  local random_param="?ref=$((RANDOM % 10000))&utm=seed$((RANDOM % 100))"
  echo "${base_url}${random_path}${random_param}"
}

mostrar_progresso() {
  local current=$1
  local total=$2
  local percent=$((current * 100 / total))
  local filled=$((percent / 2))
  local empty=$((50 - filled))
  
  printf "\r["
  printf "%${filled}s" | tr ' ' '='
  printf "%${empty}s" | tr ' ' ' '
  printf "] %3d%% (%d/%d)" "$percent" "$current" "$total"
}

for i in $(seq 1 $NUM_LINKS); do
  URL=$(gerar_url_aleatoria)
  
  RESPONSE=$(curl -s -X POST http://localhost:3000/ \
    -H "Content-Type: application/json" \
    -d "{\"url\":\"$URL\"}")
  
  if echo "$RESPONSE" | grep -q "code"; then
    SUCESSO=$((SUCESSO + 1))
    mostrar_progresso $i $NUM_LINKS
  else
    ERRO=$((ERRO + 1))
    mostrar_progresso $i $NUM_LINKS
  fi
  
  sleep 0.02
done

echo -e "\n"

TEMPO_FIM=$(date +%s)
TEMPO_TOTAL=$((TEMPO_FIM - TEMPO_INICIO))
MINUTOS=$((TEMPO_TOTAL / 60))
SEGUNDOS=$((TEMPO_TOTAL % 60))

echo ""
echo "==========================================="
echo "RESULTADO FINAL:"
echo "==========================================="
echo -e "${GREEN}Sucessos:${NC} $SUCESSO"
echo -e "${RED}Erros:${NC} $ERRO"
echo -e "${YELLOW}Tempo total:${NC} ${MINUTOS}m ${SEGUNDOS}s"
echo -e "${YELLOW}Taxa de sucesso:${NC} $((SUCESSO * 100 / NUM_LINKS))%"
echo "==========================================="
echo ""

if [ $SUCESSO -gt 0 ]; then
    echo "Ultimos 5 codigos gerados:"
    curl -s http://localhost:3000/links | grep -o '"code":"[^"]*"' | tail -5 | cut -d'"' -f4 | while read code; do
        echo "  http://localhost:3000/$code"
    done
    echo ""
fi

echo -e "${GREEN}Banco populado com sucesso${NC}"
echo -e "${YELLOW}Acesse http://localhost:3000 para visualizar${NC}"
echo ""