# Backend

This is the backend of our application. It has two configurations (private and public) which are defined using build tags at compile time. The private backend will only be used by internal services such as our machine learning containers. The public backend provides the endpoints used by the frontend when deployed.

The backend is written in Go using the net/http package of the standard library. The server is equipped with a middleware that will log the URL, status code and response time of any request to std out.

## Requirements

### Database

Both backends need a single PostgreSQL database with the PostGIS extension to be present at runtime. During development it is probably easiest to run that database locally.

- Run the [official PostGIS Docker container](https://hub.docker.com/r/postgis/postgis):

```
docker run --name some-postgis -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgis/postgis
```

- Initialise the database with the SQL scripts in `/Backend/sql/extensions.sql` and `/Backend/sql/schema.sql` using a database access tool like DBeaver.
  _**Note**: The schema setup process will be automated in the future, but for now it has to be done manually._

- Set the environment variables according to [this](#configuration).
  Connection string example:

```
postgres://postgres:mysecretpassword@localhost:5432/postgres
```

## Routes

- [Public Routes](./routes-public.md)
- [Private Routes](./routes-private.md)

## Error Codes
A list of all cutom error codes can be found [here](./readme_errors.md).

## Usage

There are two options to run the backend, either locally or using Docker.

### Run in Docker

Requirements:

- Docker or Docker-compliant container runtime

Navigate to the `PROJECT/Backend` and build the Docker image:

#### Build Private Backend

```
docker build -f Dockerfile.private -t cmpu9010-backend-private .
```

Then run the container with the following command:

```
docker run -p 8081:8080 cmpu9010-backend-private
```

The server will then be reachable on `localhost:8081`

#### Build Public Backend

```
docker build -f Dockerfile.public -t cmpu9010-backend-public .
```

Then run the container with the following command:

```
docker run -p 8080:8080 cmpu9010-backend-public
```

The server will then be reachable on `localhost:8080`

### Run Locally

#### Run Private Backend

Requirements:

- Golang >= 1.23.1

Navigate to `PROJECT/Backend` and run this command:

```
go run -tags private cmd/main/main.go
```

The server will then be reachable on `localhost:8080`

#### Run Public Backend

Requirements:

- Golang >= 1.23.1

Navigate to `PROJECT/Backend` and run this command:

```
go run -tags public cmd/main/main.go
```

The server will then be reachable on `localhost:8080`

### Configuration

The server is configured through environment variables. This can be achieved by providing a `.env` file, the content of which will be automatically loaded into the environment at runtime. The following enviroment variables are used by the server.

| Variable Name               | Description                                            | Default | Optional |
| --------------------------- | ------------------------------------------------------ | ------- | -------- |
| MAGPIE_DB_URL               | A valid PostgreSQL connection URL                      | -       | No\*     |
| MAGPIE_PORT                 | The port the server will listen on                     | 8080    | Yes      |
| MAGPIE_JWT_SECRET           | The secret used to generate JWTs for authentication    | -       | No       |
| MAGPIE_JWT_EXPIRY           | The expiry time for JWTs (must be in hours or minutes) | 24h     | Yes      |
| MAGPIE_CORS_ALLOWED_ORIGINS | Space separated list of allowed origins for CORS       | -       | Yes      |
| MAGPIE_CORS_ALLOWED_METHODS | Space separated list of allowed methods for CORS       | -       | Yes      |

\* `MAGPIE_DB_URL` can be omitted if the connection information is instead given as separate environment variables (`LOGIN`, `PASSWORD`, `HOST` and `DATABASE_NAME`). This is useful for deployments using Kubernetes. If both `MAGPIE_DB_URL` and the separate environment variables are set, only `MAGPIE_DB_URL` will be used to establish a connection.

#### CORS Configuration Examples

- `MAGPIE_CORS_ALLOWED_ORIGINS="http://localhost:3000 https://localhost:3000 http://example.com"`
- `MAGPIE_CORS_ALLOWED_METHODS="GET POST PUT DELETE"`
