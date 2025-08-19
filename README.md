Hotel Self-Service – Microservices MVP

Como executar (com Docker):
1) docker compose up --build
2) Acesse:
   - Gateway: http://localhost:8080
   - Auth Service: http://localhost:8001/docs
   - Bookings Service: http://localhost:8002/docs
   - Payments Service: http://localhost:8003/docs
   - Notifications Service: http://localhost:8004/docs

Login rápido:
- Registre: POST /auth/register no gateway
- Login: POST /auth/login no gateway → copia o token
- Use o token Bearer nas chamadas protegidas (ex: /bookings)

Dev sem Docker:
- Veja cada `services/*/README.md` para rodar local com venv.
