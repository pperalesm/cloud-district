**Requisitos:**

- Node v16.13.0
- Yarn v1.22.15


**Para la instalación y ejecución de la aplicación:**

1. Desplazarse a la raíz del proyecto.
1. Ejecutar `docker-compose up`.
2. Ejecutar `yarn install`.
3. Ejecutar `yarn migration:run`.
4. Ejecutar `yarn start:dev`.


**Para acceder a la base de datos e importar los CSV:**

1. Dirigirse a la url `localhost:8080` (pgAdmin 4).
2. Identificarse con las credenciales `pgadmin@pgadmin.com` y `pgadmin`.
3. Añadir un nuevo servidor a pgAdmin usando la siguiente información:
  - Host: `postgres`
  - Port: `5432`
  - Username: `postgres`
  - Password: `postgres`
4. Hacer click derecho encima de la tabla clubs para importar el archivo `clubs.csv` (en la raíz del proyecto).
5. Repetir el proceso con los archivos `players.csv`, `coaches.csv` y las tablas correspondientes.


**Para acceder al servidor de correo electrónico:**

1. Dirigirse a la url `https://ethereal.email/`.
2. Identificarse con las credenciales `maddison.shanahan@ethereal.email` y `myRU6pC43WAMFX8Sft`.
  - Si por cualquier motivo la cuenta ya no existiera, se puede crear una nueva e introducir el correo y contraseña generados en el archivo `.env`.


**Para acceder a la colección de Postman:**

1. Dirigirse a `https://www.postman.com/`.
2. Acceder al workspace deseado.
3. Importar la colección almacenada en el archivo `postman-collection.json` (en la raíz del proyecto).