
# NestJS Microservices with Kafka, Docker & Kafdrop

Este proyecto implementa una arquitectura de microservicios utilizando **NestJS**, **Kafka** (modo KRaft), **Docker** y **Kafdrop** como visor web de topics. Incluye un **API Gateway** para exponer rutas HTTP y varios microservicios backend desacoplados.

---

## Estructura del Proyecto

```
.
├── api-gateway        # Cliente Kafka y Gateway HTTP
├── auth-service       # Servicio de autenticación y creación de usuarios
├── user-service       # Gestión de usuarios
├── log-service        # Registro de eventos en el sistema
├── docker-compose.yml # Orquestador de servicios
└── README.md
```

---

## Cómo levantar el entorno completo

> 💡 Asegúrate de tener Docker y Docker Compose instalados.

### 1. Levanta todos los servicios

```bash
docker-compose up --build
```

Este comando construirá las imágenes Docker y levantará:

- Kafka en modo KRaft (sin Zookeeper)
- Kafdrop (interfaz web de Kafka)
- API Gateway (HTTP)
- Microservicios: Auth, User, Log

---

## 🌐 URLs y puertos importantes

| Servicio        | URL                           |
|------------------|-------------------------------|
| API Gateway      | http://localhost:3000         |
| Kafdrop (Kafka UI) | http://localhost:9000      |
| Kafka interno    | kafka:9092 (solo accesible desde los contenedores) |

---

## 📡 Endpoints disponibles

### API Gateway (http://localhost:3000)

- `POST /auth/register` – Registra un nuevo usuario
- `GET /users` – Retorna lista de usuarios

---

## 📄 Ejemplo de uso (Postman)

### Crear usuario

```
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "id": 1,
  "name": "Jaime Hernández",
  "email": "jaime@example.com"
}
```

--

## 🙌 Autor

Desarrollado por Jaime Hernández – 2025

---
