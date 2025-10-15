# diario-de-audicao

Tecnologias Utilizadas

#### **Backend (API)**
- Node.js
- Express.js
- TypeScript
- Prisma (ORM)
- MySQL
- Docker & Docker Compose
- JWT (JSON Web Token) para autenticação

#### **Frontend (Client)**
- Angular
- TypeScript
- SCSS
- Angular Material
- RxJS


1- **Inicie o Banco de Dados(docker desktop):**
    
    ```
    docker-compose up -d
    ```
Docker Desktop (precisa estar executando)

2- **Crie as Tabelas no BD:**
    ```
    npx prisma migrate dev
    ```
      - qualquer nome

3- ### Configuração Frontend (Client)

1.  **Abra o terminal e instale as dependências:**
    ```
    npm run install:all
    ```

###  Run
npm run dev.
Após iniciar acesse `http://localhost:4200` no seu navegador para usar a aplicação.
