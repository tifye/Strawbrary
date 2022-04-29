# Strawbrary

## Description

A web stack app for managing a smol library.

## Requirements
* Docker

## Running with Docker - initial run

```bash
# Start up all services
$ docker compose up --build
```
### Sync Prisma.schema with database
Once at least the `web.app` and `postgres` containers are created and running. Apply the database migration files in order to sync with the prisma.schema. 

There are two ways of doing this:

*  cli into the `web.app` container once its running along with the `postgres` container, then run the command:
    ```bash
    # Inside web.app container /app
    $ npx prisma migrate deploy
    ```
2. [or] Once the `postgres` container is running.
    ```bash
    # Enter the web.app directory
    $ cd web.app
    # Install packages (mainly for the prisma package)
    $ npm install
    # Apply migration history to database
    $ npx prisma migrate deploy
    ```
    This option requires you have the `web.app`'s `.env` file present along with the `DATABASE_URL` variable defined.





## Environment variables
[NOTE] If running with docker compose. When changing ports, also reflect these changes in the `nginx/nginx.conf`. See issue #23

All environment variables here are used in the root `.env` by docker compose. For `web.app` and `react.app` their environment variables should be applied to their local root if not running through docker compose.

There are three `example.env` files located in `root`, `web.app/`, and `react.app/`. They are examples of what the actual `.env` files should look like. 

### web.app
* **DATABASE_URL**

  The Url used by Prisma to establish a connection with the postgres database.

  Example:
  `postgresql://<username>:<password>@<host>:<port>/strawbrary?schema=public`

* **WEB_APP_PORT**
  
  The port on which to run the `web.app` application. Defaults to 3000.

### react.app
* **REACT_APP_BASE_URL**

  The base Url of the backend server. Used when making requests.

  Example: `http://host:port`

* **REACT_APP_WEBPACK_DEV_PORT**

  The porn on which the react app webpack development server runs on.

### nginx
* **NGINX_EXPOSED_PORT**

  THe port on which the nginx container is exposed outward.
