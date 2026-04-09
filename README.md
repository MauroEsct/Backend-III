# API de Adopción de Mascotas - Backend III

este proyecto es una API RESTful para la gestión de usuarios y adopción de mascotas, desarrollada con Node.js, Express y MongoDB. Incluye documentación interactiva con Swagger, tests funcionales con Mocha/Chai/Supertest y está completamente dockerizada.

##  Requisitos Previos
* Docker y Docker Compose (opcional) instalados.
* Node.js v22+ (si se desea correr localmente sin Docker).

## 🚀 Guía de Ejecución con Docker

### 1. Levantar la Base de Datos (MongoDB)
Antes de iniciar la aplicación, asegúrate de tener una instancia de MongoDB corriendo en tu máquina. Puedes levantar una rápidamente con Docker:
\`\`\`bash
docker run -d -p 27017:27017 --name local-mongo mongo:latest
\`\`\`

### 2. Construir la Imagen de la Aplicación
En la raíz del proyecto (donde se encuentra el `Dockerfile`), ejecuta el siguiente comando para construir la imagen de Node.js:
\`\`\`bash
docker build -t app-backend-iii .
\`\`\`

### 3. Correr el Contenedor de la Aplicación
Para enlazar la aplicación con tu base de datos local (en sistemas Linux), ejecuta:
\`\`\`bash
docker run -d -p 8080:8080 --network host --name backend-api app-backend-iii
\`\`\`
*(Nota: El uso de `--network host` permite que el contenedor acceda al `127.0.0.1` de tu máquina para conectarse a MongoDB).*

---

## 📌 Acceso al Proyecto

Una vez que el servidor esté corriendo, puedes acceder a los siguientes recursos:

* **Documentación Swagger:** [http://localhost:8080/api/docs](http://localhost:8080/api/docs)
* **Usuarios:** `GET /api/users`
* **Mascotas:** `GET /api/pets`
* **Adopciones:** `POST /api/adoptions/:uid/:pid`

## 🧪 Ejecución de Tests
Para correr la suite de pruebas funcionales (asegúrate de tener MongoDB corriendo y las dependencias instaladas con `npm install`):
\`\`\`bash
npm test
\`\`\`

## 🐳 Imagen en Docker Hub

La imagen de este proyecto se encuentra alojada públicamente en Docker Hub. 
Puedes acceder a ella mediante el siguiente enlace:
[https://hub.docker.com/r/mauroesct/app-backend-iii](https://hub.docker.com/r/mauroesct/app-backend-iii)

O descargarla directamente con el comando:
```bash
docker pull mauroesct/app-backend-iii:1.0.0