# Projeto Cadastro de Agricultores - Backend

Este projeto implementa a API backend para o cadastro de agricultores, usando NestJS e MongoDB (Mongoose).

---

## Funcionalidades Implementadas

- Criação de agricultor com validação dos campos obrigatórios, incluindo validação e formatação do CPF.
- Validação para garantir que o CPF seja único no banco de dados, evitando duplicidade.
- Validação completa do CPF pelo algoritmo oficial para assegurar CPF válido.
- Listagem de todos os agricultores em formato tabular, exibindo informações como nome completo, CPF, data de nascimento, telefone e status (ativo/inativo).
- Busca de agricultor por ID para visualizar detalhes específicos (Backend).
- Atualização dos dados do agricultor, com restrição para que o CPF não possa ser alterado após o cadastro.
- Desativação do agricultor, alterando o campo `active` para `false` sem excluí-lo.
- Exclusão do agricultor permitida somente se estiver desativado (`active` = false), com confirmação e tratamento de erros apropriado.
- Interface frontend com botões para editar e excluir (exclusão restrita a agricultores inativos) diretamente na tabela.
- Tratamento e validação de dados tanto no backend (NestJS + Mongoose) quanto no frontend (React), garantindo consistência e usabilidade.
- Máscaras e validações no frontend para campos CPF e telefone, garantindo usabilidade e consistência de dados.
- Alerta exibido quando tenta editar CPF, impedindo alteração indevida.
- Confirmações para exclusão, respeitando a regra de só excluir agricultores inativos.

---

## Regras de Negócio Atendidas

- **RN1 – Criação de Agricultor:**  
  ✓ Implementado o cadastro de agricultor com os campos obrigatórios e opcionais, incluindo o campo `active` com valor padrão `true`.

- **RN2 – CPF Único:**  
  ✓ Garantida a unicidade do CPF no banco de dados, com validação para impedir cadastros duplicados.

- **RN3 – Validação de CPF:**  
  ✓ Implementado algoritmo oficial para validar CPFs válidos no frontend e backend, evitando CPFs inválidos.

- **RN4 – Edição de Agricultor:**  
  ✓ Backend: já implementado para permitir edição dos dados do agricultor, exceto o CPF, que é imutável após o cadastro.  
  ✓ Frontend: formulário de edição completo com carregamento dos dados ao clicar em editar, máscara no CPF e telefone, alerta para impedir alteração do CPF, atualização dos dados funcionando corretamente, com feedback de sucesso.

- **RN5 – Exclusão de Agricultor:**  
  ✓ Exclusão só permitida para agricultores com o campo `active` definido como `false`. Alerta exibido caso tente excluir ativo.

- **RN6 – Listagem de Agricultores:**  
  ✓ Agricultores exibidos em formato tabular com informações claras.  
  ✓ Botões de edição e exclusão implementados com confirmações e alertas apropriados para regras de negócio.
---

## Tecnologias

- Node.js
- NestJS
- MongoDB Atlas (via Mongoose)
- class-validator (validação dos DTOs)
- Insomnia (para testar a API)

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

| Método | Rota                      | Descrição                                 |
|--------|---------------------------|-------------------------------------------|
| POST   | `/farmers`                | Criar um novo agricultor                  |
| GET    | `/farmers`                | Listar todos os agricultores              |
| GET    | `/farmers/:id`            | Buscar um agricultor pelo ID              |
| PATCH  | `/farmers/:id`            | Atualizar dados do agricultor (exceto CPF) |
| PATCH  | `/farmers/:id/deactivate` | Desativar um agricultor (define active = false) |
| DELETE | `/farmers/:id`            | Remover agricultor (só se active = false) |
---

### Observações importantes

- O campo `cpf` não pode ser alterado após o cadastro.
- Um agricultor só pode ser excluído se estiver desativado (`active === false`).
- A rota de desativação permite "inativar" o agricultor sem excluir os dados.
- Mensagens claras informam quando ações não permitidas são tentadas (ex: excluir agricultor ativo).
- Máscaras e validações no frontend melhoram a experiência do usuário e a consistência dos dados.
