# Documentação das Rotas da API

## Sumário

- [Visão geral](#visão-geral)
- [Convenções](#convenções)
- [Autenticação e autorização](#autenticação-e-autorização)
- [Padrões de resposta](#padrões-de-resposta)
- [Formato de respostas de erro](#formato-de-respostas-de-erro)
- [Enums](#enums)
- [Validações externas](#validações-externas)
- [Referência rápida de endpoints](#referência-rápida-de-endpoints)
- [Rotas detalhadas](#rotas-detalhadas)
  - [Autenticação — `/auth`](#autenticação--auth)
  - [Usuários — `/users`](#usuários--users)
  - [Territórios — `/territories`](#territórios--territories)
  - [Plantas — `/plants`](#plantas--plants)
  - [Sementes — `/seeds`](#sementes--seeds)
  - [Plantações/Cultivos — `/crops`](#plantaçãoscultivos--crops)
  - [Financeiro — `/finances`](#financeiro--finances)
  - [Estoques — `/stocks`](#estoques--stocks)
  - [Sensores — `/sensors`](#sensores--sensors)
  - [Dados de Sensores — `/sensor-data`](#dados-de-sensores--sensor-data)
  - [Clima — `/weather`](#clima--weather)
- [Resumo de permissões administrativas](#resumo-de-permissões-administrativas)
- [Observações finais](#observações-finais)

---

## Visão geral

- **Content-Type:** todas as requisições e respostas são `application/json`.
- **Autenticação:** cookie httpOnly `token` (JWT), gravado por `POST /auth/login`.
- **Autorização administrativa:** header `x-admin-token` (apenas `POST /users/admin`) + permissão por papel via `adminMiddleware("recurso")`.
- **Soft delete:** a maioria dos `DELETE` executa *soft delete* via repositório; responde `204` sem corpo.
- **Datas:** strings `YYYY-MM-DD`.
- **Áreas:** armazenadas em `m²` e convertidas para a `unidadeArea` original na resposta.

---

## Convenções

| Middleware | Descrição |
|---|---|
| `authMiddleware` | Exige usuário autenticado (cookie `token`). |
| `adminMiddleware("recurso")` | Exige autenticação e permissão administrativa no recurso informado. |
| `adminTokenMiddleware` | Exige o header `x-admin-token`. |
| `validateXCreate` / `validateXUpdate` | Valida o corpo da requisição via Zod. |
| `:id` | Parâmetro de rota. |

### Códigos de status

| Código | Significado |
|---|---|
| 200 | Sucesso com corpo. |
| 201 | Recurso criado. |
| 204 | Sucesso sem corpo (`logout` e todos os `DELETE`). |
| 400 | `BadRequestError` (validação Zod, CEP inexistente, etc.). |
| 401 | `UnauthorizedError` (não autenticado / credenciais inválidas). |
| 403 | `ForbiddenError` (sem permissão / recurso de outro usuário). |
| 404 | `NotFoundError`. |
| 409 | `ConflictError`. |
| 500 | `InternalServerError` (inclui falha ao consultar ViaCEP). |

---

## Autenticação e autorização

1. **Login:** `POST /auth/login` valida `email` + `senha` via `validateUserLogin`, gera JWT (`id`, `email`, `role`) e grava em cookie `token` (httpOnly, `secure: false`, `sameSite: "lax"`, maxAge 1h). A resposta é apenas `{ "success": true }`.
2. **Requisições autenticadas:** o `authMiddleware` lê `req.cookies.token`, valida e injeta `req.user` (`{ id, email, role }`). Em falha → `401`.
3. **Rotas administrativas (`/all`):** exigem `req.user.role === ADMIN`. Em falha → `403 ForbiddenError(resource, "Acesso permitido apenas para administrador", "Permissão insuficiente")`.
4. **Criação do primeiro admin:** `POST /users/admin` usa `adminTokenMiddleware` (header `x-admin-token`). Só é permitido enquanto **não existir** nenhum usuário com `role === ADMIN`.
5. **Logout:** `POST /auth/logout` limpa o cookie e retorna `204`.

> **Nota (cookie em produção):** o login atualmente grava o cookie com `secure: false` e `sameSite: "lax"` — configuração adequada para ferramentas como Thunder Client. Para front-end em domínio diferente, usar `secure: true` + `sameSite: "none"`.

---

## Padrões de resposta

- Mappers expõem campos em **português** (`nome`, `territorios`, `usuario`, `plantacoes`).
- Campos nulos costumam cair em **fallback textual**: `"indisponível"`, `"não informado"`, `"sem observações"`, `"sem detalhes"`, `"data não informada"`, `"plantação indisponível"`.
- Relacionamentos aparecem em forma **resumida** (`usuario`, `territorio`, `planta`).
- `area` é convertida via `fromSquareMeters(areaM2, unidadeArea)`.

### Resumo dos mappers

| Mapper | `toResponse` | `toSummaryResponse` |
|---|---|---|
| `User` | id, nome, sobrenome, email, telefone, cpf, territorios | id, nome, sobrenome |
| `User (saved)` | id, nome, sobrenome, email, telefone, cpf | — |
| `Territory` | id, cep, cidade, estado, bairro, logradouro, area, unidadeArea, usuario, plantacoes | id, cep, cidade, estado, bairro, logradouro, area, unidadeArea |
| `Plant` | id, nome, nomeCientifico, categoria, cicloMinimoDias, cicloMaximoDias, phMinimo, phMaximo, temperaturaMinima, temperaturaMaxima, precipitacaoMinima, precipitacaoMaxima, necessidadeLuz, necessidadeAgua, texturaSolo, kcMedio, nitrogenio, fosforo, potassio, unidadeNpk | id, nome, nomeCientifico, categoria |
| `Plant (with relation)` | acima + `sementes[]` | — |
| `Seed` | id, planta (full), quantidade, unidadePeso, dataCompra, dataValidade, fornecedor, observacoes, plantacao (crop summary), usuario (user summary) | id, planta (full), quantidade, unidadePeso, dataCompra, dataValidade, fornecedor, observacoes |
| `Crop` | id, nome, cultura (seed summary), variedade, area, unidadeArea, dataPlantio, dataColheitaPrevista, dataColheitaReal, responsavel, status, observacoes, territorio (summary) | id, nome, cultura, variedade, area, unidadeArea, dataPlantio, dataColheitaPrevista, dataColheitaReal, responsavel, status, observacoes |
| `Finance` | id, tipo, valor, observacoes, detalhes, data, usuario (summary) | id, tipo, valor, observacoes, detalhes, data |
| `Stock` | id, nome, quantidade, unidade, categoria, limiteMinimo, dataValidade, usuario (summary) | id, nome, quantidade, unidade, categoria, dataValidade |
| `Sensor` | id, modelo, tipo, unidade, territorio (summary), dados (list summary) | id, modelo, tipo, unidade, territorio (summary) |
| `SensorData` | id, configuracoes, dataLeitura, sensor (summary) | id, configuracoes, dataLeitura |
| `Weather` | id, data, temperaturaMinima, temperaturaMaxima, precipitacao, velocidadeVentoMaxima, evapotranspiracao, territorio (summary) | id, data, temperaturaMinima, temperaturaMaxima, precipitacao, velocidadeVentoMaxima, evapotranspiracao |

---

## Formato de respostas de erro

Todas as exceções que estendem `AppError` são serializadas pelo `errorHandler` via `toJSON()`.

```json
{
  "success": false,
  "message": "…",
  "cause": "…"
}
```

> `cause` só aparece quando definido (normalmente omitido na serialização).

### Catálogo de erros

| Classe | Status | Campos extras | Mensagem base |
|---|---|---|---|
| `BadRequestError` | 400 | `errors` (quando `details` é informado) | `Requisição incorreta` |
| `UnauthorizedError` | 401 | `info` | `Não autorizado: {info}` |
| `ForbiddenError` | 403 | `resource`, `info`, `cause` | `Acesso restrito: sem permissão para alterar e acessar {resource}` |
| `NotFoundError` | 404 | `field`, `info` | `Não encontrado: {field}` |
| `ConflictError` | 409 | `fields`, `info` | `O seguinte campo já está em uso: {campo}` / `Os seguintes campos já estão em uso: {campos}` |
| `InternalServerError` | 500 | — | `Erro interno do servidor` |

Erros não mapeados também retornam **500**:

```json
{ "success": false, "message": "Erro interno do servidor" }
```

### Exemplos

**`400 BadRequestError`** — gerado pelo middleware `validate()` (issues do Zod). Enums inválidos incluem `expected`:

```json
{
  "success": false,
  "message": "Requisição incorreta",
  "errors": [
    { "field": "area", "message": "A área deve ser um número" },
    { "field": "unidadeArea", "message": "Valor inválido", "expected": "m2, ha, km2" }
  ]
}
```

**`400 BadRequestError`** — `fetchAddress` para CEP inexistente:

```json
{
  "success": false,
  "message": "Requisição incorreta",
  "errors": { "message": "CEP não encontrado" }
}
```

**`401 UnauthorizedError`**

```json
{
  "success": false,
  "message": "Não autorizado: não autenticado",
  "info": "não autenticado"
}
```

**`403 ForbiddenError`**

```json
{
  "success": false,
  "message": "Acesso restrito: sem permissão para alterar e acessar usuários",
  "resource": "usuários",
  "info": "Acesso permitido apenas para administrador",
  "cause": "Permissão insuficiente"
}
```

**`404 NotFoundError`**

```json
{
  "success": false,
  "message": "Não encontrado: território",
  "field": "território",
  "info": null
}
```

**`409 ConflictError`** — o construtor aceita `{ fields?, info?, message? }`.

Mensagem automática (sem `message`):
```json
{
  "success": false,
  "message": "Os seguintes campos já estão em uso: email, CPF",
  "fields": ["email", "CPF"],
  "info": null
}
```

Mensagem customizada (`SeedService.delete`):
```json
{
  "success": false,
  "message": "Não é possível excluir uma semente que está reservada para uma plantação",
  "fields": ["semente"],
  "info": "Não é possível excluir uma semente que está reservada para uma plantação"
}
```

Mensagem customizada (`WeatherService.create`):
```json
{
  "success": false,
  "message": "Já possui registro para o dia atual",
  "fields": ["data"],
  "info": "Já possui registro para o dia atual"
}
```

**`500 InternalServerError`**

```json
{ "success": false, "message": "Erro interno do servidor" }
```

**`500 InternalServerError`** — falha ao consultar ViaCEP:

```json
{ "success": false, "message": "Não foi possível validar o CEP" }
```

### Onde o `ConflictError` é lançado

| Origem | `fields` | `message` |
|---|---|---|
| `UserService.create` | `["CPF"]`, `["telefone"]`, `["e-mail"]` (dinâmico) | automática |
| `UserService.createAdmin` | `["e-mail"]` | automática |
| `SeedService.delete` | `["semente"]` | `"Não é possível excluir uma semente que está reservada para uma plantação"` |
| `WeatherService.create` | `["data"]` | `"Já possui registro para o dia atual"` |

---

## Enums

| Enum | Origem | Valores esperados |
|---|---|---|
| `AreaUnit` | `calc/area-converter` | `"m2"`, `"ha"`, `"km2"` |
| `CropStatus` | `models/Crop` | `"planejada"`, `"em_andamento"`, `"cancelada"`, `"concluida"` |
| `FinanceType` | `models/Finance` | `"ganho"`, `"despesa"` |
| `WeightUnit` | `models/Seed` | `"kg"`, `"sacas"`, `"ton"`, `"litros"` |
| `SensorType` | `models/Sensor` | `"umidade do ar"`,`"umidade do solo"`, `"temperatura do ar"`, `"temperatura do solo"`, `"pressão"` |
| `StockCategory` | `models/Stock` | `"fertilizantes"`, `"defensivos"`, `"ferramentas"` |
| `StockUnit` | `models/Stock` | `"g"`, `"kg"`, `"ton"`, `"ml"`, `"l"`, `"sacas"`, `"un"` |

---

## Validações externas

| Campo | Origem | Efeito |
|---|---|---|
| `cpf` | `cpf-cnpj-validator` | Higieniza e valida dígitos verificadores. |
| `telefone` | `libphonenumber-js/max` | Valida e normaliza para E.164 (`+5551988888888`). |
| `cep` (formato) | Zod (`territory.schema`) | Remove não-dígitos e exige 8 dígitos. |
| `cep` (existência) | [ViaCEP](https://viacep.com.br) | Preenche `cidade`, `estado`, `bairro`, `logradouro`. |
| `daily.*` (clima) | [Open-Meteo](https://open-meteo.com) | Payload `daily` deve seguir o formato exato da API Open-Meteo. |

---

## Referência rápida de endpoints

| Método | Rota | Auth | Admin | Validação |
|---|---|---|---|---|
| POST | `/auth/login` | — | — | `validateUserLogin` |
| POST | `/auth/logout` | ✔ | — | — |
| POST | `/auth/checkpass` | ✔ | — | — |
| POST | `/users/admin` | — | `x-admin-token` | `validateAdminCreate` |
| GET | `/users/all` | ✔ | ✔ `usuários` | — |
| GET | `/users/me` | ✔ | — | — |
| POST | `/users` | — | — | `validateUserCreate` |
| PUT | `/users` | ✔ | — | `validateUserUpdate` |
| DELETE | `/users` | ✔ | — | — |
| GET | `/territories/all` | ✔ | ✔ `territórios` | — |
| GET | `/territories/me` | ✔ | — | — |
| GET | `/territories/:id` | ✔ | — | — |
| POST | `/territories` | ✔ | — | `validateTerritoryCreate` |
| PUT | `/territories/:id` | ✔ | — | `validateTerritoryUpdate` |
| DELETE | `/territories/:id` | ✔ | — | — |
| GET | `/plants/all` | — | — | — |
| GET | `/plants/me` | ✔ | — | — |
| GET | `/plants/seed/:id` | ✔ | — | — |
| GET | `/plants/:id` | — | — | — |
| GET | `/seeds/all` | ✔ | ✔ `sementes` | — |
| GET | `/seeds/me` | ✔ | — | — |
| GET | `/seeds/:id` | ✔ | — | — |
| POST | `/seeds` | ✔ | — | `validateSeedCreate` |
| PUT | `/seeds/:id` | ✔ | — | `validateSeedUpdate` |
| DELETE | `/seeds/:id` | ✔ | — | — |
| GET | `/crops/all` | ✔ | ✔ `plantações` | — |
| GET | `/crops/me` | ✔ | — | — |
| GET | `/crops/:id` | ✔ | — | — |
| POST | `/crops/:id` | ✔ | — | `validateCropCreate` |
| PUT | `/crops/:id` | ✔ | — | `validateCropUpdate` |
| DELETE | `/crops/:id` | ✔ | — | — |
| GET | `/finances/all` | ✔ | ✔ `registros financeiros` | — |
| GET | `/finances/me` | ✔ | — | — |
| GET | `/finances/:id` | ✔ | — | — |
| POST | `/finances` | ✔ | — | `validateFinanceCreate` |
| PUT | `/finances/:id` | ✔ | — | `validateFinanceUpdate` |
| DELETE | `/finances/:id` | ✔ | — | — |
| GET | `/stocks/all` | ✔ | ✔ `estoques` | — |
| GET | `/stocks/me` | ✔ | — | — |
| GET | `/stocks/:id` | ✔ | — | — |
| POST | `/stocks` | ✔ | — | `validateStockCreate` |
| PUT | `/stocks/:id` | ✔ | — | `validateStockUpdate` |
| DELETE | `/stocks/:id` | ✔ | — | — |
| GET | `/sensors/all` | ✔ | ✔ `sensores` | — |
| GET | `/sensors/me` | ✔ | — | — |
| GET | `/sensors/:id` | ✔ | — | — |
| POST | `/sensors/territory/:id` | ✔ | — | `validateSensorCreate` |
| PUT | `/sensors/:id` | ✔ | — | `validateSensorUpdate` |
| DELETE | `/sensors/:id` | ✔ | — | — |
| GET | `/sensor-data/sensor/:id` | ✔ | — | — |
| GET | `/sensor-data/sensor/:id/latest` | ✔ | — | — |
| GET | `/sensor-data/:id` | ✔ | — | — |
| POST | `/sensor-data/sensor/:id` | ✔ | — | `validateSensorDataCreate` |
| GET | `/weather/all` | ✔ | ✔ `registros climáticos` | — |
| GET | `/weather/me` | ✔ | — | — |
| GET | `/weather/territory/:id` | ✔ | — | — |
| GET | `/weather/:id` | ✔ | — | — |
| POST | `/weather/territory/:id` | ✔ | — | `validateWeatherCreate` (payload `daily` Open-Meteo) |

### Prefixos registrados

| Módulo | Prefixo |
|---|---|
| Autenticação | `/auth` |
| Usuários | `/users` |
| Territórios | `/territories` |
| Plantas | `/plants` |
| Sementes | `/seeds` |
| Plantações/Cultivos | `/crops` |
| Financeiro | `/finances` |
| Estoques | `/stocks` |
| Sensores | `/sensors` |
| Dados de sensores | `/sensor-data` |
| Clima | `/weather` |

---

## Rotas detalhadas

### Autenticação — `/auth`

| Método | Rota | Middlewares | Validação | Ação |
|---|---|---|---|---|
| POST | `/auth/login` | — | `validateUserLogin` | `AuthController.login` |
| POST | `/auth/logout` | `authMiddleware` | — | `AuthController.logout` |
| POST | `/auth/checkpass` | `authMiddleware` | — | `AuthController.checkUserPassword` |

#### `POST /auth/login`

**Request body**
```json
{ "email": "usuario@exemplo.com", "senha": "Senha123!" }
```

**Response `200 OK`** — grava cookie `token` (`httpOnly: true`, `secure: false`, `sameSite: "lax"`, maxAge 1h)
```json
{ "success": true }
```

**Erros:** `400`, `401` (`credenciais inválidas`), `500`.

---

#### `POST /auth/logout`

**Response `204 No Content`** — limpa o cookie `token`.

**Erros:** `401`.

---

#### `POST /auth/checkpass`

**Request body**
```json
{ "senha": "Senha123!" }
```

**Response `200 OK`**
```json
{ "success": true }
```

**Erros:** `401` (`não autenticado`, `credenciais inválidas`).

---

### Usuários — `/users`

| Método | Rota | Middlewares | Validação | Ação |
|---|---|---|---|---|
| POST | `/users/admin` | `adminTokenMiddleware` | `validateAdminCreate` | `UserController.createAdmin` |
| GET | `/users/all` | `authMiddleware`, `adminMiddleware("usuários")` | — | `UserController.listAllWithRelations` |
| GET | `/users/me` | `authMiddleware` | — | `UserController.getInfoUserLogged` |
| POST | `/users` | — | `validateUserCreate` | `UserController.create` |
| PUT | `/users` | `authMiddleware` | `validateUserUpdate` | `UserController.update` |
| DELETE | `/users` | `authMiddleware` | — | `UserController.delete` |

#### `POST /users/admin`

**Headers:** `x-admin-token: <ADMIN_TOKEN>`

**Request body**
```json
{
  "nome": "Admin",
  "email": "admin@exemplo.com",
  "senha": "Senha123!"
}
```

**Response `201 Created`**
```json
{ "nome": "Admin", "email": "admin@exemplo.com" }
```

**Erros:** `400`, `401` (token inválido / admin já configurado), `409` (e-mail em uso), `500` (token não configurado).

---

#### `GET /users/all`

**Response `200 OK`**
```json
[
  {
    "id": 1,
    "nome": "Admin",
    "sobrenome": "Sistema",
    "email": "admin@exemplo.com",
    "telefone": "+5551999999999",
    "cpf": "12345678901",
    "territorios": [
      {
        "id": 10,
        "cep": "90000000",
        "cidade": "Porto Alegre",
        "estado": "RS",
        "bairro": "Centro",
        "logradouro": "Rua X",
        "area": 100,
        "unidadeArea": "ha"
      }
    ]
  }
]
```

**Erros:** `401`, `403` (`resource: "usuários"`).

---

#### `GET /users/me`

**Response `200 OK`**
```json
{
  "id": 2,
  "nome": "Usuário",
  "sobrenome": "Exemplo",
  "email": "usuario@exemplo.com",
  "telefone": "+5551988888888",
  "cpf": "98765432100",
  "territorios": []
}
```

**Erros:** `401`, `404`.

---

#### `POST /users`

**Request body**
```json
{
  "nome": "Usuário",
  "sobrenome": "Exemplo",
  "email": "usuario@exemplo.com",
  "telefone": "+55 51 98888-8888",
  "cpf": "987.654.321-00",
  "senha": "Senha123!"
}
```

> **Validação externa:**
> - `telefone` → E.164 via `libphonenumber-js/max`.
> - `cpf` → validação + higienização via `cpf-cnpj-validator`.
> - `senha`: ≥ 6 caracteres, 1 maiúscula, 1 minúscula, 1 dígito, 1 caractere especial.

**Response `201 Created`** (`toResponseSavedUser` — sem `role`, sem `territorios`)
```json
{
  "id": 2,
  "nome": "Usuário",
  "sobrenome": "Exemplo",
  "email": "usuario@exemplo.com",
  "telefone": "+5551988888888",
  "cpf": "98765432100"
}
```

**Erros:** `400`, `409` (`fields: ["e-mail"]`, `["CPF"]`, `["telefone"]`), `500`.

---

#### `PUT /users`

**Request body** (parcial)
```json
{ "nome": "NovoNome", "senha": "NovaSenha123!" }
```

**Response `200 OK`**
```json
{
  "id": 2,
  "nome": "NovoNome",
  "sobrenome": "Exemplo",
  "email": "usuario@exemplo.com",
  "telefone": "+5551988888888",
  "cpf": "98765432100"
}
```

**Erros:** `400`, `401`, `404`.

---

#### `DELETE /users`

**Response `204 No Content`**

**Erros:** `401`, `500`.

---

### Territórios — `/territories`

| Método | Rota | Middlewares | Validação | Ação |
|---|---|---|---|---|
| GET | `/territories/all` | `authMiddleware`, `adminMiddleware("territórios")` | — | `TerritoryController.listAll` |
| GET | `/territories/me` | `authMiddleware` | — | `TerritoryController.listMyTerritories` |
| GET | `/territories/:id` | `authMiddleware` | — | `TerritoryController.getById` |
| POST | `/territories` | `authMiddleware` | `validateTerritoryCreate` | `TerritoryController.create` |
| PUT | `/territories/:id` | `authMiddleware` | `validateTerritoryUpdate` | `TerritoryController.update` |
| DELETE | `/territories/:id` | `authMiddleware` | — | `TerritoryController.delete` |

#### `GET /territories/all`

**Response `200 OK`**
```json
[
  {
    "id": 10,
    "cep": "90000000",
    "cidade": "Porto Alegre",
    "estado": "RS",
    "bairro": "Centro",
    "logradouro": "Rua X",
    "area": 100,
    "unidadeArea": "ha",
    "usuario": { "id": 2, "nome": "Usuário", "sobrenome": "Exemplo" },
    "plantacoes": []
  }
]
```

**Erros:** `401`, `403` (`resource: "territórios"`).

---

#### `GET /territories/me`

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `401`.

---

#### `GET /territories/:id`

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `401`, `403`, `404`.

---

#### `POST /territories`

**Request body**
```json
{ "cep": "90000-000", "area": 100, "unidadeArea": "ha" }
```

**Validação externa (CEP):** após validação Zod (8 dígitos), o serviço consulta a [ViaCEP](https://viacep.com.br) via `fetchAddress(cep)` e preenche `cidade`, `estado`, `bairro`, `logradouro`.

- CEP inexistente → `400` (`errors: { message: "CEP não encontrado" }`).
- Falha HTTP na ViaCEP → `500` (`"Não foi possível validar o CEP"`).

**Response `201 Created`**
```json
{
  "id": 10,
  "cep": "90000000",
  "cidade": "Porto Alegre",
  "estado": "RS",
  "bairro": "Centro",
  "logradouro": "Rua X",
  "area": 100,
  "unidadeArea": "ha",
  "usuario": { "id": 2, "nome": "Usuário", "sobrenome": "Exemplo" },
  "plantacoes": []
}
```

**Erros:** `400` (validação Zod ou CEP não encontrado), `401`, `404` (usuário), `500`.

---

#### `PUT /territories/:id`

**Request body** (parcial; `area` e `unidadeArea` juntos)
```json
{ "area": 150, "unidadeArea": "ha" }
```

> Se `cep` for informado, `fetchAddress` é chamado novamente e `cep`, `cidade`, `estado`, `bairro`, `logradouro` são sobrescritos com o retorno.

**Response `200 OK`** (`toSummaryResponse`)
```json
{
  "id": 10,
  "cep": "90000000",
  "cidade": "Porto Alegre",
  "estado": "RS",
  "bairro": "Centro",
  "logradouro": "Rua X",
  "area": 150,
  "unidadeArea": "ha"
}
```

**Erros:** `400`, `401`, `403`, `404`.

---

#### `DELETE /territories/:id`

**Response `204 No Content`**

**Erros:** `401`, `403`, `404`, `500`.

---

### Plantas — `/plants`

| Método | Rota | Middlewares | Ação |
|---|---|---|---|
| GET | `/plants/all` | — | `PlantController.listAll` |
| GET | `/plants/me` | `authMiddleware` | `PlantController.listByUserLogged` |
| GET | `/plants/seed/:id` | `authMiddleware` | `PlantController.listBySeedId` |
| GET | `/plants/:id` | — | `PlantController.getById` |

#### `GET /plants/all`

**Response `200 OK`**
```json
[
  {
    "id": 1,
    "nome": "Arroz",
    "nomeCientifico": "Oryza sativa",
    "categoria": "cereais",
    "cicloMinimoDias": 80,
    "cicloMaximoDias": 180,
    "phMinimo": "5.50",
    "phMaximo": "7.00",
    "temperaturaMinima": "20.00",
    "temperaturaMaxima": "30.00",
    "precipitacaoMinima": "1500.00",
    "precipitacaoMaxima": "2000.00",
    "necessidadeLuz": "muito alta",
    "necessidadeAgua": "muito alta",
    "texturaSolo": "amplo",
    "kcMedio": "1.1125",
    "nitrogenio": "indisponível",
    "fosforo": "indisponível",
    "potassio": "indisponível",
    "unidadeNpk": "indisponível"
  },
  "..."
]
```

**Erros:** `500`.

---

#### `GET /plants/me`

**Response `200 OK`** (`toResponseWithRelationList` — inclui `sementes[]`)
```json
[
  {
    "id": 1,
    "nome": "Arroz",
    "nomeCientifico": "Oryza sativa",
    "categoria": "cereais",
    "cicloMinimoDias": 80,
    "cicloMaximoDias": 180,
    "phMinimo": "5.50",
    "phMaximo": "7.00",
    "temperaturaMinima": "20.00",
    "temperaturaMaxima": "30.00",
    "precipitacaoMinima": "1500.00",
    "precipitacaoMaxima": "2000.00",
    "necessidadeLuz": "muito alta",
    "necessidadeAgua": "muito alta",
    "texturaSolo": "amplo",
    "kcMedio": "1.1125",
    "nitrogenio": "indisponível",
    "fosforo": "indisponível",
    "potassio": "indisponível",
    "unidadeNpk": "indisponível",
    "sementes": [
      {
        "id": 5,
        "planta": { "id": 1, "nome": "Arroz", "nomeCientifico": "Oryza sativa", "categoria": "cereais" },
        "quantidade": 50,
        "unidadePeso": "kg",
        "dataCompra": "2026-08-01",
        "dataValidade": "2027-08-01",
        "fornecedor": "Agro Ltda",
        "observacoes": "Lote A"
      }
    ]
  }
]
```

**Erros:** `401`.

---

#### `GET /plants/seed/:id`

**Retorna um único objeto** `PlantMapper.toResponse`.

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `401`, `403` (semente de outro usuário), `404`.

---

#### `GET /plants/:id`

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `404`.

---

### Sementes — `/seeds`

| Método | Rota | Middlewares | Validação | Ação |
|---|---|---|---|---|
| GET | `/seeds/all` | `authMiddleware`, `adminMiddleware("sementes")` | — | `SeedController.listAll` |
| GET | `/seeds/me` | `authMiddleware` | — | `SeedController.listMySeeds` |
| GET | `/seeds/:id` | `authMiddleware` | — | `SeedController.getById` |
| POST | `/seeds` | `authMiddleware` | `validateSeedCreate` | `SeedController.create` |
| PUT | `/seeds/:id` | `authMiddleware` | `validateSeedUpdate` | `SeedController.update` |
| DELETE | `/seeds/:id` | `authMiddleware` | — | `SeedController.delete` |

#### `GET /seeds/all`

**Response `200 OK`** (`toResponseList` — inclui `planta`, `plantacao`, `usuario`)
```json
[
  {
    "id": 5,
    "planta": {
      "id": 1,
      "nome": "Arroz",
      "nomeCientifico": "Oryza sativa",
      "categoria": "cereais",
      "cicloMinimoDias": 80,
      "cicloMaximoDias": 180,
      "phMinimo": "5.50",
      "phMaximo": "7.00",
      "temperaturaMinima": "20.00",
      "temperaturaMaxima": "30.00",
      "precipitacaoMinima": "1500.00",
      "precipitacaoMaxima": "2000.00",
      "necessidadeLuz": "muito alta",
      "necessidadeAgua": "muito alta",
      "texturaSolo": "amplo",
      "kcMedio": "1.1125",
      "nitrogenio": "indisponível",
      "fosforo": "indisponível",
      "potassio": "indisponível",
      "unidadeNpk": "indisponível"
    },
    "quantidade": 50,
    "unidadePeso": "kg",
    "dataCompra": "2026-08-01",
    "dataValidade": "2027-08-01",
    "fornecedor": "Agro Ltda",
    "observacoes": "Lote A",
    "plantacao": "plantação indisponível",
    "usuario": { "id": 2, "nome": "Usuário", "sobrenome": "Exemplo" }
  }
]
```

**Erros:** `401`, `403` (`resource: "sementes"`).

---

#### `GET /seeds/me`

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `401`.

---

#### `GET /seeds/:id`

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `401`, `403`, `404`.

---

#### `POST /seeds`

**Request body**
```json
{
  "plantaId": 1,
  "dataCompra": "2026-08-01",
  "dataValidade": "2027-08-01",
  "quantidade": 50,
  "unidadePeso": "kg",
  "fornecedor": "Agro Ltda",
  "observacoes": "Lote A"
}
```

**Response `201 Created`** — mesmo formato do `toResponse`.

**Erros:** `400` (`dataValidade` ≤ `dataCompra`), `401`, `404` (`planta`/`usuário` inexistente).

---

#### `PUT /seeds/:id`

**Request body** (parcial)
```json
{ "quantidade": 75 }
```

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `400`, `401`, `403`, `404`.

---

#### `DELETE /seeds/:id`

**Response `204 No Content`**

**Erros:** `401`, `403`, `404`, `409` (`fields: ["semente"]`, `message: "Não é possível excluir uma semente que está reservada para uma plantação"`).

---

### Plantações/Cultivos — `/crops`

| Método | Rota | Middlewares | Validação | Ação |
|---|---|---|---|---|
| GET | `/crops/all` | `authMiddleware`, `adminMiddleware("plantações")` | — | `CropController.listAll` |
| GET | `/crops/me` | `authMiddleware` | — | `CropController.listMyCrops` |
| GET | `/crops/:id` | `authMiddleware` | — | `CropController.getById` |
| POST | `/crops/:id` | `authMiddleware` | `validateCropCreate` | `CropController.create` (`:id` = `territoryId`) |
| PUT | `/crops/:id` | `authMiddleware` | `validateCropUpdate` | `CropController.update` |
| DELETE | `/crops/:id` | `authMiddleware` | — | `CropController.delete` |

#### `GET /crops/all`

**Response `200 OK`** (`toResponseList` — inclui `cultura` e `territorio`)
```json
[
  {
    "id": 1,
    "nome": "Soja Safra 2026",
    "cultura": {
      "id": 5,
      "planta": { "id": 1, "nome": "Soja", "nomeCientifico": "Glycine max", "categoria": "oleaginosas" },
      "quantidade": 50,
      "unidadePeso": "kg",
      "dataCompra": "2026-08-01",
      "dataValidade": "2027-08-01",
      "fornecedor": "Agro Ltda",
      "observacoes": "Lote A"
    },
    "variedade": "BRS 284",
    "area": 50,
    "unidadeArea": "ha",
    "dataPlantio": "2026-09-01",
    "dataColheitaPrevista": "2027-01-10",
    "dataColheitaReal": "indisponível",
    "responsavel": "João",
    "status": "planejada",
    "observacoes": "Primeira safra",
    "territorio": {
      "id": 10,
      "cep": "90000000",
      "cidade": "Porto Alegre",
      "estado": "RS",
      "bairro": "Centro",
      "logradouro": "Rua X",
      "area": 100,
      "unidadeArea": "ha"
    }
  }
]
```

**Erros:** `401`, `403` (`resource: "plantações"`).

---

#### `GET /crops/me`

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `401`.

---

#### `GET /crops/:id`

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `401`, `403`, `404`.

---

#### `POST /crops/:id`

> `:id` = `territoryId`

**Request body**
```json
{
  "nome": "Soja Safra 2026",
  "sementeId": 5,
  "variedade": "BRS 284",
  "area": 50,
  "unidadeArea": "ha",
  "dataPlantio": "2026-09-01",
  "responsavel": "João",
  "status": "planejada",
  "observacoes": "Primeira safra"
}
```

**Response `201 Created`** — mesmo formato do `toResponse`.

**Erros:** `400`, `401`, `403` (território/semente de outro usuário), `404` (território/semente inexistente), `500`.

---

#### `PUT /crops/:id`

**Request body** (parcial; `area` e `unidadeArea` juntos)
```json
{ "area": 60, "unidadeArea": "ha", "dataColheitaReal": "2027-01-20", "status": "concluida" }
```

**Response `200 OK`** (`toSummaryResponse` — **sem** `territorio`)
```json
{
  "id": 1,
  "nome": "Soja Safra 2026",
  "cultura": { "…": "…" },
  "variedade": "BRS 284",
  "area": 60,
  "unidadeArea": "ha",
  "dataPlantio": "2026-09-01",
  "dataColheitaPrevista": "2027-01-10",
  "dataColheitaReal": "2027-01-20",
  "responsavel": "João",
  "status": "concluida",
  "observacoes": "Primeira safra"
}
```

**Erros:** `400`, `401`, `403`, `404`, `500`.

> **Regras de negócio:**
> - Trocar `sementeId` desvincula a semente antiga e recalcula `dataColheitaPrevista`.
> - `dataColheitaReal` no passado marca `status = CONCLUIDA`.
> - `status = CANCELADA` desvincula a semente.

---

#### `DELETE /crops/:id`

**Response `204 No Content`** — soft delete + desvinculação da semente.

**Erros:** `401`, `403`, `404`, `500`.

---

### Financeiro — `/finances`

| Método | Rota | Middlewares | Validação | Ação |
|---|---|---|---|---|
| GET | `/finances/all` | `authMiddleware`, `adminMiddleware("registros financeiros")` | — | `FinanceController.listAll` |
| GET | `/finances/me` | `authMiddleware` | — | `FinanceController.listMyFinances` |
| GET | `/finances/:id` | `authMiddleware` | — | `FinanceController.getById` |
| POST | `/finances` | `authMiddleware` | `validateFinanceCreate` | `FinanceController.create` |
| PUT | `/finances/:id` | `authMiddleware` | `validateFinanceUpdate` | `FinanceController.update` |
| DELETE | `/finances/:id` | `authMiddleware` | — | `FinanceController.delete` |

#### `GET /finances/all`

**Response `200 OK`** (`toResponse` — inclui `usuario`)
```json
[
  {
    "id": 1,
    "tipo": "despesa",
    "valor": 1500.5,
    "observacoes": "Compra de sementes",
    "detalhes": "Lote A",
    "data": "2026-09-01",
    "usuario": { "id": 2, "nome": "Usuário", "sobrenome": "Exemplo" }
  }
]
```

**Erros:** `401`, `403` (`resource: "registros financeiros"`).

---

#### `GET /finances/me`

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `401`.

---

#### `GET /finances/:id`

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `401`, `403`, `404`.

---

#### `POST /finances`

**Request body**
```json
{
  "tipo": "ganho",
  "valor": 3000,
  "observacoes": "Venda de soja",
  "detalhes": "Safra 2026",
  "data": "2026-09-21"
}
```

**Response `201 Created`** — mesmo formato do `toResponse`.

**Erros:** `400`, `401`, `500`.

---

#### `PUT /finances/:id`

**Request body** (parcial)
```json
{ "valor": 3200 }
```

**Response `200 OK`** (`toSummaryResponse` — sem `usuario`)
```json
{
  "id": 2,
  "tipo": "ganho",
  "valor": 3200,
  "observacoes": "Venda de soja",
  "detalhes": "Safra 2026",
  "data": "2026-09-21"
}
```

**Erros:** `400`, `401`, `403`, `404`, `500`.

---

#### `DELETE /finances/:id`

**Response `204 No Content`**

**Erros:** `401`, `403`, `404`, `500`.

---

### Estoques — `/stocks`

| Método | Rota | Middlewares | Validação | Ação |
|---|---|---|---|---|
| GET | `/stocks/all` | `authMiddleware`, `adminMiddleware("estoques")` | — | `StockController.listAll` |
| GET | `/stocks/me` | `authMiddleware` | — | `StockController.listMyStock` |
| GET | `/stocks/:id` | `authMiddleware` | — | `StockController.getById` |
| POST | `/stocks` | `authMiddleware` | `validateStockCreate` | `StockController.create` |
| PUT | `/stocks/:id` | `authMiddleware` | `validateStockUpdate` | `StockController.update` |
| DELETE | `/stocks/:id` | `authMiddleware` | — | `StockController.delete` |

#### `GET /stocks/all`

**Response `200 OK`** (`toResponse` — inclui `usuario` e `limiteMinimo`)
```json
[
  {
    "id": 1,
    "nome": "Fertilizante NPK",
    "quantidade": 50,
    "unidade": "KG",
    "categoria": "INSUMO",
    "limiteMinimo": 10,
    "dataValidade": "2027-08-01",
    "usuario": { "id": 2, "nome": "Usuário", "sobrenome": "Exemplo" }
  }
]
```

**Erros:** `401`, `403` (`resource: "estoques"`).

---

#### `GET /stocks/me`

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `401`.

---

#### `GET /stocks/:id`

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `401`, `403`, `404`.

---

#### `POST /stocks`

**Request body**
```json
{
  "nome": "Fertilizante NPK",
  "categoria": "fertilizantes",
  "quantidade": 50,
  "unidade": "kg",
  "dataValidade": "2027-08-01",
  "limiteMinimo": 10
}
```

**Response `201 Created`** — mesmo formato do `toResponse`.

**Erros:** `400`, `401`, `500`.

---

#### `PUT /stocks/:id`

**Request body** (parcial)
```json
{ "quantidade": 75 }
```

**Response `200 OK`** (`toSummaryResponse` — sem `usuario` e `limiteMinimo`)
```json
{
  "id": 1,
  "nome": "Fertilizante NPK",
  "quantidade": 75,
  "unidade": "kg",
  "categoria": "fertilizantes",
  "dataValidade": "2027-08-01"
}
```

**Erros:** `400`, `401`, `403`, `404`, `500`.

---

#### `DELETE /stocks/:id`

**Response `204 No Content`**

**Erros:** `401`, `403`, `404`, `500`.

---

### Sensores — `/sensors`

| Método | Rota | Middlewares | Validação | Ação |
|---|---|---|---|---|
| GET | `/sensors/all` | `authMiddleware`, `adminMiddleware("sensores")` | — | `SensorController.listAll` |
| GET | `/sensors/me` | `authMiddleware` | — | `SensorController.listMySensors` |
| GET | `/sensors/:id` | `authMiddleware` | — | `SensorController.getById` |
| POST | `/sensors/territory/:id` | `authMiddleware` | `validateSensorCreate` | `SensorController.create` (`:id` = `territoryId`) |
| PUT | `/sensors/:id` | `authMiddleware` | `validateSensorUpdate` | `SensorController.update` |
| DELETE | `/sensors/:id` | `authMiddleware` | — | `SensorController.delete` |

#### `GET /sensors/all`

**Response `200 OK`** (`toResponse` — inclui `unidade`, `territorio`, `dados`)
```json
[
  {
    "id": 1,
    "modelo": "DHT22",
    "tipo": "umidade do solo",
    "unidade": "%",
    "territorio": {
      "id": 10,
      "cep": "90000000",
      "cidade": "Porto Alegre",
      "estado": "RS",
      "bairro": "Centro",
      "logradouro": "Rua X",
      "area": 100,
      "unidadeArea": "ha"
    },
    "dados": [
      {
        "id": 1,
        "configuracoes": { "valor": 42.5 },
        "dataLeitura": "2026-09-21T10:00:00.000Z"
      }
    ]
  }
]
```

**Erros:** `401`, `403` (`resource: "sensores"`).

---

#### `GET /sensors/me`

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `401`.

---

#### `GET /sensors/:id`

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `401`, `403`, `404`.

---

#### `POST /sensors/territory/:id`

> `:id` = `territoryId`

**Request body** (`createSensorSchema`)
```json
{ "modelo": "DHT22", "tipo": "umidade do solo" }
```

**Response `201 Created`** — mesmo formato do `toResponse` (com `dados: []`).

**Erros:** `400`, `401`, `403`, `404`.

---

#### `PUT /sensors/:id`

**Request body** (`updateSensorSchema` — parcial)
```json
{ "modelo": "DHT22 v2" }
```

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `400`, `401`, `403`, `404`.

---

#### `DELETE /sensors/:id`

**Response `204 No Content`**

**Erros:** `401`, `403`, `404`, `500`.

---

### Dados de Sensores — `/sensor-data`

| Método | Rota | Middlewares | Validação | Ação |
|---|---|---|---|---|
| GET | `/sensor-data/sensor/:id/latest` | `authMiddleware` | — | `SensorDataController.getLatestBySensor` |
| GET | `/sensor-data/sensor/:id` | `authMiddleware` | — | `SensorDataController.listBySensor` |
| GET | `/sensor-data/:id` | `authMiddleware` | — | `SensorDataController.getById` |
| POST | `/sensor-data/sensor/:id` | `authMiddleware` | `validateSensorDataCreate` | `SensorDataController.create` |

> `:id` nas rotas `/sensor-data/sensor/:id*` representa o **`sensorId`**.

#### `GET /sensor-data/sensor/:id`

**Response `200 OK`** (`SensorDataMapper.toResponseList`)
```json
[
  {
    "id": 1,
    "configuracoes": { "valor": 42.5 },
    "dataLeitura": "2026-09-21T10:00:00.000Z",
    "sensor": {
      "id": 1,
      "modelo": "DHT22",
      "tipo": "umidade do solo",
      "unidade": "%",
      "territorio": {
        "id": 10,
        "cep": "90000000",
        "cidade": "Porto Alegre",
        "estado": "RS",
        "bairro": "Centro",
        "logradouro": "Rua X",
        "area": 100,
        "unidadeArea": "ha"
      }
    }
  }
]
```

**Erros:** `401`, `403`, `404` (sensor).

---

#### `GET /sensor-data/sensor/:id/latest`

**Response `200 OK`** (`SensorDataMapper.toResponse` — leitura mais recente)

**Erros:** `401`, `403`, `404`.

---

#### `GET /sensor-data/:id`

**Response `200 OK`** (`SensorDataMapper.toResponse`)

**Erros:** `401`, `403`, `404`.

---

#### `POST /sensor-data/sensor/:id`

> `:id` = `sensorId`

**Request body** (`createDataSensorSchema`)
```json
{ "valor": 42.5 }
```

**Response `201 Created`** — mesmo formato do `toResponse`.

**Erros:** `400`, `401`, `403`, `404`.

---

### Clima — `/weather`

| Método | Rota | Middlewares | Validação | Ação |
|---|---|---|---|---|
| GET | `/weather/all` | `authMiddleware`, `adminMiddleware("registros climáticos")` | — | `WeatherController.listAll` |
| GET | `/weather/me` | `authMiddleware` | — | `WeatherController.listMyWeathers` |
| GET | `/weather/territory/:id` | `authMiddleware` | — | `WeatherController.listByTerritoryId` |
| GET | `/weather/:id` | `authMiddleware` | — | `WeatherController.getById` |
| POST | `/weather/territory/:id` | `authMiddleware` | `validateWeatherCreate` | `WeatherController.create` (`:id` = `territoryId`) |

#### `GET /weather/all`

**Response `200 OK`** (`toResponse` — campos achatados, inclui `territorio`)
```json
[
  {
    "id": 1,
    "data": "2026-09-21",
    "temperaturaMinima": 17.2,
    "temperaturaMaxima": 28.5,
    "precipitacao": 0,
    "velocidadeVentoMaxima": 12.3,
    "evapotranspiracao": 4.1,
    "territorio": {
      "id": 10,
      "cep": "90000000",
      "cidade": "Porto Alegre",
      "estado": "RS",
      "bairro": "Centro",
      "logradouro": "Rua X",
      "area": 100,
      "unidadeArea": "ha"
    }
  }, 
  "..."
]
```

**Erros:** `401`, `403` (`resource: "registros climáticos"`).

---

#### `GET /weather/me`

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `401`, `404` (usuário).

---

#### `GET /weather/territory/:id`

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `401`, `403`, `404`.

---

#### `GET /weather/:id`

**Response `200 OK`** — mesmo formato do `toResponse`.

**Erros:** `401`, `403`, `404`.

---

#### `POST /weather/territory/:id`

> `:id` = `territoryId`

**Request body** — formato `daily` da [Open-Meteo](https://open-meteo.com/en/docs)
```json
{
  "daily": {
    "time": ["2026-09-21"],
    "temperature_2m_max": [28.5],
    "temperature_2m_min": [17.2],
    "precipitation_sum": [0],
    "wind_speed_10m_max": [12.3],
    "et0_fao_evapotranspiration": [4.1]
  }
}
```

> **Origem dos dados:** o payload `daily` segue **exatamente** os nomes de campo da API Open-Meteo (`temperature_2m_max`, `temperature_2m_min`, `precipitation_sum`, `wind_speed_10m_max`, `et0_fao_evapotranspiration`). Assim, o cliente pode enviar diretamente o retorno dessa API.
>
> **Persistência:** o `WeatherService` usa **apenas o primeiro elemento** de cada array (`[0]`) e mapeia para:
>
> | Open-Meteo | Coluna interna |
> |---|---|
> | `time[0]` | `data` |
> | `temperature_2m_max[0]` | `temperaturaMaxima` |
> | `temperature_2m_min[0]` | `temperaturaMinima` |
> | `precipitation_sum[0]` | `precipitacao` |
> | `wind_speed_10m_max[0]` | `velocidadeVentoMaxima` |
> | `et0_fao_evapotranspiration[0]` | `evapotranspiracao` |
> > O serviço **não recebe** parâmetros de unidade do Open-Meteo. Se o cliente alterar
> `wind_speed_unit` ou `temperature_unit` na chamada ao Open-Meteo, os valores chegarão
> à API já convertidos e serão salvos sem distinção de unidade — recomenda-se padronizar
> a chamada ao Open-Meteo com as unidades default (km/h e °C).
| Grandeza | Unidade Padrão Open-Meteo |
|---|---|
| `temperature_2m_*` | °C |
| `precipitation_sum` | mm |
| `wind_speed_10m_max` | km/h |
| `et0_fao_evapotranspiration` | mm |

**Response `201 Created`** — mesmo formato do `toResponse`.

**Erros:** `400`, `401`, `403`, `404`, `409` (`fields: ["data"]`, `message: "Já possui registro para o dia atual"`).

---

## Resumo de permissões administrativas

| Recurso | Rota protegida |
|---|---|
| `usuários` | `GET /users/all` |
| `territórios` | `GET /territories/all` |
| `sementes` | `GET /seeds/all` |
| `plantações` | `GET /crops/all` |
| `registros financeiros` | `GET /finances/all` |
| `estoques` | `GET /stocks/all` |
| `sensores` | `GET /sensors/all` |
| `registros climáticos` | `GET /weather/all` |

---

## Observações finais

- Rotas `GET /all` e `GET /me` estão declaradas antes de `GET /:id` para evitar conflito de parâmetros.
- `role` do usuário **não é exposto** em nenhum endpoint; existe apenas no payload do JWT.
- **Cookie `token` no login:** atualmente gravado com `secure: false` e `sameSite: "lax"` (config de desenvolvimento — Thunder Client). Em produção com front em domínio distinto, usa-se `secure: true` + `sameSite: "none"`.
- **Território**: `cidade`, `estado`, `bairro`, `logradouro` são preenchidos por `fetchAddress(cep)` (ViaCEP).
- **Semente**: resposta inclui `planta` completa + `plantacao` (summary de crop) + `usuario` (summary).
- **Plantação**: resposta traz `cultura` (summary de semente) e `territorio` (summary); `PUT /crops/:id` retorna sem `territorio`.
- **Clima (Open-Meteo):** o corpo de `POST /weather/territory/:id` recebe o objeto `daily` no
  formato exato retornado pela API [Open-Meteo](https://open-meteo.com/en/docs). O service
  persiste apenas o primeiro elemento de cada array (`[0]`), mapeando os nomes Open-Meteo
  (`temperature_2m_max`, `temperature_2m_min`, `precipitation_sum`, `wind_speed_10m_max`,
  `et0_fao_evapotranspiration`) para as colunas internas em português.
- **Sensor**: inclui `unidade` (`getUnidade()`) e array `dados`.
- **Todos os `DELETE` retornam `204 No Content`**.
- **`PUT /users` e `DELETE /users`** operam sempre sobre o **usuário autenticado** (não recebem `:id`).
- **Prefixo dos sensores é `/sensors` (plural)**; o prefixo dos dados de sensores é `/sensor-data`.
- **Todos os validadores de `index.validate.ts` estão aplicados**.
- **`ConflictError`** aceita `{ fields?, info?, message? }`; mensagem automática quando `message` não é fornecida.
- **Fallbacks textuais** substituem `null`/`undefined`: `"indisponível"`, `"não informado"`, `"sem observações"`, `"sem detalhes"`, `"data não informada"`, `"plantação indisponível"`.