Auth Service

Banco: SQLite em /data/auth.db

Rotas:
- POST /register { email, password }
- POST /login (OAuth2PasswordRequestForm): username=email, password
- GET /health

