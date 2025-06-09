# Sistema de Gestão de Armazém

Projeto feito com express + graphql(apollo client), Drizzle , postgres(no docker por enquanto)
No front sera Next + tailwind 4 + shadcn

## ✅ Rotas Implementadas

### 👤 User Module
- [x] **Query:** `user(id: ID!)` - Buscar usuário por ID
- [x] **Mutation:** `createUser(name: String!, email: String!, passwordHash: String!)` - Criar usuário

### 📦 Product Module  
- [x] **Query:** `product(id: ID!)` - Buscar produto por ID
- [x] **Query:** `products` - Listar todos os produtos
- [x] **Mutation:** `createProduct(name: String!, sku: String, description: String, unit: String!)` - Criar produto
- [x] **Mutation:** `updateProduct(id: ID!, name: String, sku: String, description: String, unit: String)` - Atualizar produto
- [x] **Mutation:** `deleteProduct(id: ID!)` - Deletar produto

### 📍 Location Module
- [x] **Query:** `location(id: ID!)` - Buscar local por ID
- [x] **Query:** `locations` - Listar todos os locais
- [x] **Mutation:** `createLocation(name: String!, description: String)` - Criar local
- [x] **Mutation:** `updateLocation(id: ID!, name: String, description: String)` - Atualizar local
- [x] **Mutation:** `deleteLocation(id: ID!)` - Deletar local

### 📊 Inventory Module
- [x] **Query:** `inventory(productId: ID!, locationId: ID!)` - Buscar estoque específico
- [x] **Query:** `inventoryByProduct(productId: ID!)` - Buscar estoque por produto
- [x] **Query:** `inventoryByLocation(locationId: ID!)` - Buscar estoque por local
- [x] **Query:** `allInventory` - Listar todo o estoque
- [x] **Mutation:** `updateInventory(productId: ID!, locationId: ID!, quantity: Float!)` - Atualizar estoque
- [x] **Mutation:** `deleteInventory(productId: ID!, locationId: ID!)` - Deletar registro de estoque

### 🔄 Movement Module
- [x] **Query:** `movement(id: ID!)` - Buscar movimentação por ID
- [x] **Query:** `movements` - Listar todas as movimentações
- [x] **Query:** `movementsByProduct(productId: ID!)` - Buscar movimentações por produto
- [x] **Query:** `movementsByLocation(locationId: ID!)` - Buscar movimentações por local
- [x] **Mutation:** `createMovement(productId: ID!, locationId: ID!, userId: ID!, type: String!, quantity: Float!, notes: String)` - Criar movimentação
- [x] **Mutation:** `deleteMovement(id: ID!)` - Deletar movimentação

## 🌐 Implementação no Front

### 👤 User Module
- [ ] Página de login/autenticação
- [ ] Cadastro de usuários
- [ ] Listagem de usuários
- [ ] Perfil do usuário

### 📦 Product Module
- [ ] Dashboard de produtos
- [ ] Formulário de cadastro de produtos
- [ ] Listagem de produtos com filtros
- [ ] Edição de produtos
- [ ] Exclusão de produtos
- [ ] Busca por SKU/nome

### 📍 Location Module
- [ ] Cadastro de locais de armazenamento
- [ ] Listagem de locais
- [ ] Edição de locais
- [ ] Exclusão de locais
- [ ] Visualização de capacidade por local

### 📊 Inventory Module
- [ ] Dashboard de estoque geral
- [ ] Visualização de estoque por produto
- [ ] Visualização de estoque por local
- [ ] Alertas de estoque baixo
- [ ] Relatórios de estoque
- [ ] Atualização manual de estoque

### 🔄 Movement Module
- [ ] Registro de entrada de produtos
- [ ] Registro de saída de produtos
- [ ] Histórico de movimentações
- [ ] Filtros por produto/local/usuário
- [ ] Relatórios de movimentação
- [ ] Dashboard de atividades recentes

### 📱 Features Gerais
- [ ] Layout responsivo
- [ ] Sistema de notificações
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Busca global
- [ ] Tema dark/light
- [ ] PWA (Progressive Web App)

## 📋 To DO:

