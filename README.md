# Diário de Audição



**Diário de Audição** é uma aplicação web full-stack desenvolvida como projeto acadêmico. O sistema consiste em uma SPA (Single Page Application) que permite a entusiastas de música catalogar e gerenciar um diário pessoal e detalhado dos álbuns que já ouviram. A aplicação se comunica com uma API RESTful para persistir os dados em um banco de dados relacional.

** ESTRUTURA
* **`api/`**: O backend, construído com Node.js, Express e Prisma.
* **`client/`**: O frontend, construído com Angular e Angular Material.

## 🛠️ Tecnologias Utilizadas

| Backend (API)                                | Frontend (Client)                        |
| -------------------------------------------- | ---------------------------------------- |
| Node.js                                      | Angular                                  |
| Express.js                                   | TypeScript                               |
| TypeScript                                   | SCSS                                     |
| Prisma (ORM)                                 | Angular Material                         |
| MySQL                                        | RxJS (para programação reativa)          |
| Docker & Docker Compose                      |                                          |
| JWT (JSON Web Token)                         |                                          |

##  Pré-requisitos

Antes de começar, garanta que você tem as seguintes ferramentas instaladas e **em execução**:
- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## 🚀 Como Executar o Projeto

Este projeto requer **dois terminais** abertos para executar a aplicação completa (um para o backend e um para o frontend).

### **Configuração Inicial (Feita Apenas Uma Vez)**

1.  **Clone o Repositório**
  

2.  **Instale as Dependências do Backend**
    * Navegue até a pasta da API e instale suas dependências.
    ```bash
    cd api
    npm install
    ```

3.  **Instale as Dependências do Frontend**
    * A partir da pasta `api`, volte para a raiz e entre na pasta do client.
    ```bash
    cd ../client
    npm install
    ```

### **Executando a Aplicação**

**Terminal 1 - Iniciando o Backend**
1.  Navegue até a pasta `api`.
2.  **Configure as Variáveis de Ambiente:**
    * Crie um arquivo `.env` dentro da pasta `api`.
  Coloque o conteudo enviado pelo Blackboard.
3.  **Inicie o Banco de Dados:**
    ```bash
    docker-compose up -d
    ```
4.  **Crie as Tabelas no Banco:**
    ```bash
    npx prisma migrate dev
    ```
5.  **Inicie o Servidor da API:**
    ```bash
    npm run dev
    ```
    *A API estará rodando em `http://localhost:3333`.*

**Terminal 2 - Iniciando o Frontend**
1.  Abra um **novo terminal**.
2.  Navegue até a pasta `client`.
3.  Inicie a aplicação Angular:
    ```bash
    ng serve
    ```
    *A aplicação estará acessível em `http://localhost:4200`.*

---
