### C4 – Contexto (alto nível)

```mermaid
graph TD
  subgraph Clientes
    MobileApp[App Mobile PF/PJ]
    WebApp[Internet Banking/Admin]
  end
  MobileApp --> APIGW
  WebApp --> APIGW

  subgraph Plataforma
    APIGW[API Gateway (Envoy+mTLS+OPA+RateLimit)]
    BFF[BFFs (Mobile/Web/Admin) REST/GraphQL]
    IAM[Identity & Access (OIDC/MFA)]
    Kafka[(Kafka + Schema Registry)]
    Observ[OTel + Prometheus + Loki/Tempo + Jaeger]
    Vault[Vault/KMS]
  end
  APIGW --> BFF
  APIGW --> IAM
  BFF -->|REST/gRPC| SVC[Microsserviços Domínios]
  SVC <-->|events| Kafka
  SVC --> Vault
  SVC --> Observ

  subgraph Dados
    PGCore[(PostgreSQL/CockroachDB - Ledger)]
    PGOps[(PostgreSQL Ops c/ RLS)]
    Redis[(Redis)]
    S3[(S3/MinIO)]
    DWH[(ClickHouse/BigQuery/Snowflake)]
  end
  SVC --> PGCore
  SVC --> PGOps
  SVC --> Redis
  SVC --> S3
  Kafka --> DWH
```

