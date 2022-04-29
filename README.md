# Strawbrary

## Description

A web stack app for managing a smol library.

[Nest](https://github.com/nestjs/nest) framework with TypeScript.

## Requirements
* Docker
* Node

## Installation

```bash
$ cd web.app
$ npm install
```

## Running with Docker

```bash
# development
$ docker compose up --build
```

## Building to dist/ for Production
```bash
# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Environment variables
[NOTE] If running with docker compose. When changing ports, also reflect these changes in the `nginx/nginx.conf`. See issue #23
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
