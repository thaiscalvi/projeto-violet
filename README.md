# Projeto Cadastro de Agricultores - Backend

Este projeto implementa a API backend para o cadastro de agricultores, usando NestJS e MongoDB (Mongoose).

---

## Funcionalidades implementadas

- Criação de agricultor (`POST /farmers`)
- Listagem de todos agricultores (`GET /farmers`)
- Busca de agricultor por ID (`GET /farmers/:id`)
- Atualização de agricultor (exceto CPF) (`PATCH /farmers/:id`)
- Exclusão de agricultor (somente se `active` for `false`) (`DELETE /farmers/:id`)
- Desativação de agricultor (seta `active` para `false`) (`PATCH /farmers/:id/deactivate`)

---

## Regras de negócio atendidas

- CPF é único e não pode ser alterado após o cadastro
- Só é permitido excluir agricultor com `active === false`
- Validação de existência do agricultor e validação do ID (com `isValidObjectId`)
- Tratamento de erros para operações inválidas

---

## Tecnologias

- Node.js
- NestJS
- MongoDB Atlas (via Mongoose)
- class-validator (validação dos DTOs)

---

## Status do projeto

- Backend: CRUD básico e regras principais implementados e funcionando
- Frontend: em desenvolvimento, falta implementar botões de edição e exclusão na interface

---

## Como rodar localmente

1. Navegue até a pasta backend:
   cd backend

2. Instale as dependências:
   npm install

3. Crie um arquivo .env na pasta backend com a string de conexão MongoDB Atlas:
   MONGO_URI=your_mongodb_connection_string

4. Inicie a API em modo desenvolvimento:
   npm run start:dev

5. Depois acesse a API no navegador ou ferramenta de requisição:
   http://localhost:3000

---

## 🔍 Endpoints principais da API

A API oferece os seguintes endpoints para gerenciar os agricultores:

| Método | Rota                | Descrição                                 |
|--------|---------------------|-------------------------------------------|
| POST   | `/farmers`           | Criar um novo agricultor                  |
| GET    | `/farmers`           | Listar todos os agricultores              |
| GET    | `/farmers/:id`       | Buscar um agricultor pelo ID              |
| PATCH  | `/farmers/:id`       | Atualizar dados do agricultor (exceto CPF) |
| PATCH  | `/farmers/:id/deactivate` | Desativar um agricultor (define active = false) |
| DELETE | `/farmers/:id`       | Remover agricultor (só se active = false) |

---

### Observações importantes

- O campo `cpf` não pode ser alterado após o cadastro.
- Um agricultor só pode ser excluído se estiver desativado (`active === false`).
- A rota de desativação permite "inativar" o agricultor sem excluir os dados.
