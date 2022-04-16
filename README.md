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

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Environment variables
* **DATABASE_URL**

  The Url used by Prisma to establish a connection with the postgres database.

  Example:
  `postgresql://<username>:<password>@<host>:<port>/strawbrary?schema=public`