# pousafacil-dev
verse-conta-final/
├── .github/
│   └── workflows/
│       └── ci-build-publish.yml    # Nosso pipeline de CI/CD
├── api-gateway-service/
├── accounts-service/
├── ... (todas as outras pastas de serviço)
├── shared/                       # O código comum refatorado
├── policy/
│   └── authz.rego                # A política de segurança
├── k8s/
│   └── ...                       # Nossos manifestos de produção
├── .env.example                  # O TEMPLATE de configuração
├── docker-compose.yml            # O MANIFESTO de implantação
└── README.md                     # Instruções de uso
