# team-scrapper

Extrator de dados de time pelo site usando web scrapper

[![Coverage Status](https://coveralls.io/repos/github/claytonsilva/team-scrapper/badge.svg?branch=master)](https://coveralls.io/github/claytonsilva/team-scrapper?branch=master)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fclaytonsilva%2Fteam-scrapper%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/claytonsilva/team-scrapper/master)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Conventional Changelog](https://img.shields.io/badge/changelog-conventional-brightgreen.svg)](http://conventional-changelog.github.io)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
[![CircleCI](https://circleci.com/gh/claytonsilva/team-scrapper.svg?style=svg)](https://circleci.com/gh/claytonsilva/team-scrapper)

## requisitos

* node.js >= 12.18
* yarn  >= 1.20
* docker (caso queira testar usando docker)

## rodando o projeto com nodejs instalado

```bash
yarn install
yarn start
```

## checando os testes

```bash
yarn test
```

### rodando o projeto usando docker

```bash
docker build -t scrapper .
docker run -it scrapper
```
