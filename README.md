## AppBank – Plataforma Bancária Whitelabel (mono-repo)

Este repositório contém um esqueleto operacional para a arquitetura multi-tenant orientada a eventos com ledger de dupla entrada.

### Conteúdo
- `services/`: microsserviços (Kotlin + Spring Boot)
- `libs/`: bibliotecas compartilhadas (idempotência, outbox, common)
- `api/`: contratos OpenAPI
- `docs/`: diagramas C4 em Mermaid
- `.github/workflows`: pipeline CI

### Requisitos
- JDK 21
- Docker (opcional)

### Build

```bash
./gradlew build
```

### Execução (exemplo – Ledger)

```bash
./gradlew :services:ledger:bootRun
```

Endpoints de teste:
- POST `/v1/ledger/postings` (header `Idempotency-Key` obrigatório)
- POST `/v1/payments/transfer`
- POST `/v1/pix/payments`

Configurações de banco (dev) em `application.yml`. Flyway aplica migrações do Ledger automaticamente.


