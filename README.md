Como Executar o Projeto

Instale as Dependências

Abra um terminal na pasta raiz do projeto e execute o comando abaixo para instalar todas as dependências necessárias.


npm run install:all

Configure e Prepare o Backend

Navegue até a pasta da API.
cd api

Crie um arquivo chamado .env nesta pasta e configure as variáveis DATABASE_URL e JWT_SECRET.

Inicie o banco de dados com Docker (garanta que o Docker Desktop esteja rodando):
docker-compose up -d

Crie as tabelas no banco de dados:
npx prisma migrate dev
(Dê qualquer nome quando solicitado, ex: "init")

Inicie a Aplicação 

Volte para a pasta raiz do projeto:
cd ..

Execute o comando para iniciar a API (backend) e a Aplicação (frontend) ao mesmo tempo:
npm run dev

Acesse a Aplicação
Após os dois servidores iniciarem, acesse http://localhost:4200 no seu navegador.

