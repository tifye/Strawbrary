# Strawbrary - CONSID Teknisk Uppgift
This project has three major parts:

1. The frontend, written with [React](https://reactjs.org/).
2. The backend, done in the [NodeJs](https://nodejs.org/en/) runtime with [Typescript](https://www.typescriptlang.org/) utilizing the [NestJs](https://nestjs.com/) framework and the [Prisma](https://www.prisma.io/) ORM.   
3. The [Postgres](https://www.postgresql.org/) database.

The project also uses [Docker](https://www.docker.com/) to run each major part in its own container. However, it is not needed see `README.md` about environment variables.

## First time start
### Requirements
* Docker & Docker Compose v3.8

### Steps
1.  ~~There are three `example.env` files. For now you just need to rename them to `.env`. The files are located in `<root>`, `web.app/`, and `react.app/`.~~ Temporarily added all `.env` files to be tracked. This step can be ignored.

2.  Then in root, run:
    ```bash
    $ docker compose up --build
    ```
    On a fresh build this might take some time.

3.  Once all containers are created and running. You need to sync the `prisma.schema` with the `postgres` database. There are two ways of doing this, I will list one here, the other can be found in `web.app/README.md`.

    Enter the `web.app` container via command line.
    Ensure you are located in the `app/` directory.
    Run the command:
    ```bash
    $ npx primsa migrate deploy
    ```

4. The application should be ready to use.

## For issues
The github repository should be public, there you can see the known issues I have created. You can contact be directly or create an issue if there's anything wrong.
