# Proyecto de Gestión de Pozos Petroleros

Sitio web que permite gestionar pozos petroleros que incluye un **frontend** (Angular), un **backend** (Node.js con Express), y una base de datos **PostgreSQL**.

---
## **Características Principales**
* Gestión de Pozos: Crear, leer, actualizar y eliminar pozos petroleros.
* Porcentaje de pozos activos e inactivos.
* Producción diaria total de pozos activos.
* Interfaz Reactiva: Cambios en los estados de los pozos reflejados en tiempo real(menos el señalar el cambio de estado, se debe actualizar la pagina).

## **Requisitos Previos**

Tener instalado en su computadora/laptop
1. **Node.js** (v16 o superior): [Descargar aquí](https://nodejs.org/)
2. **PostgreSQL** (v13 o superior): [Descargar aquí](https://www.postgresql.org/download/)
3. **Angular CLI** (v18 o superior): 
   ```bash
   npm install -g @angular/cli

## **Clonar el Repositorio**

git clone https://github.com/tu-usuario/proyecto-pozos.git
cd proyecto-pozos

## **Configurar la Base de Datos**

Inicia tu servidor de PostgreSQL.
* Crea una base de datos llamada pozos_db:
  Copiar código
  CREATE DATABASE pozos_db;
* Abrir archivo init.sql y ejecutar
  
## **Instalar Dependencias**

Ingresar a por medio de la terminal 
  * PosoPetrolero\TestSLB>
  * Ejecutar el siguiente comando para iniciar el backend
```bash
npm run start:backend
  * En una nueva terminal ejecutar para iniciar el frontend
    ```bash
    ng serve


