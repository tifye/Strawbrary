# Strawbrary

## Description

A web stack app for managing a smol library.


Uses the [Nest](https://github.com/nestjs/nest) framework for architecture along with the ORM [Prisma](https://www.prisma.io/).

See this repository's root README.md for description of environment variables.

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
### Applying database changes
```bash
# Sync prisma.schema with database
$ npx prisma migrate deploy
```
## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```