# DragonApp

## ℹ️ General Info

This is the repository of dragon app where you can see info about SpaceX dragon rocket

## 🏭 Applications

- [Backend](./backend) — DragonApp's application backend.

  _To work properly, fill in the `.env` file. Use the `.env.example` file as an example._

- [Frontend](./frontend) — DragonApp's application frontend.

  _To work properly, fill in the `.env` file. Use the `.env.example` file as an example._

- [Shared](./shared) — Dragons's application common modules for reuse.

- [Shared](./tests) — Dragons's application test.

  _To work properly, fill in the `.env` file. Use the `.env.example` file as an example._

## 🖍 Requirements

- [NodeJS](https://nodejs.org/en/) (16.x.x);
- [NPM](https://www.npmjs.com/) (8.x.x);
- [PostgreSQL](https://www.postgresql.org/) (14.0)
- [Docker](https://www.docker.com)
- run `npx simple-git-hooks` at the root of the project, before the start (it will set the [pre-commit hook](https://www.npmjs.com/package/simple-git-hooks) for any commits).

## 🏃‍♂️ Simple Start

### Setup database

1. Create `.env` folder at the root project and add `api-db.env` file according to `.env.example`

### Setup apps

1. Fill ENVs in each project
2. `npm install` at the root
3. `npx simple-git-hooks` at the root

### Run project

_Each project run in the separate terminal_

1. Apply first migration to DB: `npm run migrate`
2. Run: `npm run start:backend`
3. Run: `npm run start:frontend`

## ‍💻 Run test

From root run `npm run tests`

## Code Quality

Static analyzers are used for both frontend and backend projects to ensure basic code quality.

## Architecture

### 💽 DB Schema

```
  User {
    String id PK
    String email
    String password
    Boolean isActivated
    DateTime createdAt
    DateTime updatedAt
  }
```

## 🧑‍💻 CI / 📦 CD

After push on master branch git action build all app and check code quality after that if it success
runs build frontend part and backend part on separate docker container and push it two heroku registry
on two app one client part and one backend part and last steps run test two check if everything work correct

[Handled](.github/workflows/docker-image.yml) by [GitHub Actions](https://docs.github.com/en/actions).

### 🗜 Tools

### 🌑 Backend

- [Express](https://expressjs.com/) – a backend framework.
- [InversifyJS](https://inversify.io) - an IoC container
- [Prisma](https://www.prisma.io/) – an ORM.

### 🌕 Frontend

- [React](https://reactjs.org/) – a frontend library.
- [Redux](https://redux.js.org/) + [Redux Toolkit](https://redux-toolkit.js.org/) – a state manager.

#### 🥊 Code quality

- [simple-git-hooks](https://www.npmjs.com/package/simple-git-hooks) — a tool that lets you easily manage git hooks.
- [lint-staged](https://www.npmjs.com/package/lint-staged) — run linters on git staged files.
- [editorconfig](https://editorconfig.org/) — helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
- [prettier](https://prettier.io/) — an opinionated code formatter.
- [ls-lint](https://ls-lint.org/) — file and directory name linter.
- [eslint](https://eslint.org/) – find problems in your JS code
- [stylelint](https://stylelint.io/) – Find and fix problems in your CSS code

### 🗞 Git

#### 📊 Branches

- **`master`** - production source code.

#### 🗂 Commit flow

```
<project-prefix>: <modifier> <desc>
```

##### Modifiers:

- `+` (add)
- `*` (edit)
- `-` (remove)

##### Examples:

- `blog-5: + form component`
- `design-12: * filter markup`
- `blog-16: - require prop for nickname field`

## Build app in Docker locally

Specify `api.env` `api-db.env` files in `.env` folder use examples from '.env-example' folder at root of project
Run commands from root:

```
docker build --build-arg REACT_APP_API_ORIGIN_URL=/api/v1 --build-arg REACT_APP_SERVER_HOST=localhost -f .docker-local/frontend-local.Dockerfile -t frontend .
docker build -f .docker-local/backend-local.Dockerfile -t backend .
docker compose -f .docker-local/docker-compose.local.yml up -d
```

## 