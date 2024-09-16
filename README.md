# Brasil Histórico 📚

**Brasil Histórico** é uma plataforma de artigos focada em eventos, personagens e períodos importantes da história do Brasil. Com uma experiência interativa e visualmente atraente, buscamos proporcionar um ambiente de aprendizado acessível para todos os interessados na história do país.

## 🌐 Acesse o Site
[Visite Brasil Histórico](https://digital-news-app-one.vercel.app/)

## 🎯 Propósito

Nosso objetivo é apresentar a história do Brasil de forma clara, educativa e visual, por meio de artigos  e interações com mapas de museus brasileiros. O **Brasil Histórico** busca ser uma ferramenta valiosa tanto para estudantes quanto para entusiastas da história, oferecendo informações de fácil acesso e continuamente atualizadas.

## 🚀 Funcionalidades

- **Autenticação de Usuário**: Cadastro e login seguro utilizando Prisma e MongoDB.
- **Mapas**: Explore museus através da integração com a Google Maps API.
- **Artigos Históricos**: Exemplos de artigos sobre eventos e personalidades marcantes da história do Brasil.
- **Design Responsivo e Moderno**: Desenvolvido com Material UI, garantindo uma experiência de leitura agradável em dispositivos móveis e desktop.
- **Pesquisa por Tema/Período**: Filtre artigos por temas, períodos históricos ou eventos específicos.
- **Atualizações Constantes**: Novos artigos e conteúdos são adicionados regularmente para enriquecer o site.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [Next.js](https://nextjs.org/) para renderização eficiente do lado do servidor e navegação otimizada.
- **Design e UI**: [Material UI](https://mui.com/) para uma interface de usuário moderna e responsiva.
- **Backend**: [Node.js](https://nodejs.org/) com [Express](https://expressjs.com/) para um servidor ágil e robusto.
- **Banco de Dados**: [MongoDB](https://www.mongodb.com/) para armazenamento de artigos e usuários.
- **ORM**: [Prisma](https://www.prisma.io/) para gerenciar consultas e modelagem do banco de dados.
- **Mapas**: [Google Maps API](https://developers.google.com/maps) para exibir mapas históricos e geográficos interativos.
- **Autenticação**: Implementada com Prisma e MongoDB, garantindo segurança no gerenciamento de sessões.

## 🏗️ Como Executar o Projeto Localmente

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone este repositório:
   ```bash```
   git clone https://github.com/seuusuario/brasil-historico.git
2. Acesse o diretório do projeto:
```cd brasil-historico```
3. Instale as dependências
   ```npm install```
4. Configure as variáveis de ambiente. Crie um arquivo ```.env``` na raiz do projeto com as seguintes variáveis:
  `` MONGO_URL = mongodb+srv://andressacolares133:kmSoSQxQtmn0WnKH@digital-news-data.el38c.mongodb.net/digital-news``
 `` DATABASE_URL = mongodb+srv://andressacolares133:kmSoSQxQtmn0WnKH@digital-news-data.el38c.mongodb.net/digital-news``
5. Crie um arquivo ``.env.local`` para testar os mapas
   ``NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = AIzaSyD9Ld3LrAXSo477v166zHF8lhfdhTci7O4``
6. Configure o Prisma e o banco de dados:
  ``npx prisma migrate dev``
7. Inicie o servidor de desenvolvimento:
   ``npm run dev``
8. Acesse o projeto no navegador:
   ``http://localhost:3000``
## 🎨 Estrutura do Projeto

```bash
📦 brasil-historico
 ┣ 📂prisma          # Configurações do Prisma ORM
 ┣ 📂public          # Arquivos públicos como imagens e assets
 ┣ 📂src             # Código-fonte do projeto
 ┃ ┣ 📂components    # Componentes React usados nas páginas
 ┃ ┣ 📂app           # Páginas do Next.js
 ┣ 📂api             # Rotas de backend usando Express.js
 ┣ .env              # Variáveis de ambiente
 ┣ .env.local        # Para acessar os mapas do Museu
 ┣ package.json      # Dependências do projeto
 ┗ README.md         # Documentação do projeto
```

## 📄Documentação
>> [Modelos e Arquitetura do Sistema](https://github.com/PROJETO-FINAL-ES/Brasil-Historico/blob/master/Documentos/Modelos%20e%20Arquiteturas%20de%20Software.pdf/)
>> [Diagrama de Atividades FazerReserva](https://github.com/PROJETO-FINAL-ES/Brasil-Historico/blob/master/Documentos/DiagramaAtividadeFazerReserva.pdf/)
>> [Levantamento de Requisitos e Histórias de Usuário](https://github.com/PROJETO-FINAL-ES/Brasil-Historico/blob/master/Documentos/Trabalho%20de%20ES%20-%20Pt.1.pdf/)

## 🧪Testes Manuais
>> [Planilha de Testes Manuais](https://github.com/PROJETO-FINAL-ES/Brasil-Historico/blob/master/Documentos/Planilha%20de%20Testes%20-%20Sheet1.pdf/)

## 🖥️ Contribuintes do projeto
>> Andressa Colares
>> Carlos Ryan Santos
>> Davi José Lima

