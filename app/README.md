# @guava/app

This folder contains all the code for the web-facing part of the app.
The bundled code can be found at [guava.cards](https://guava.cards)

## Development

### Setting up locally

In order to get started locally, make sure you have Node/yarn installed on your machine.
Next, run the following from the root directory:

```bash
$ yarn install
$ cd backend && docker-compose up -d
$ cd ../library && yarn codegen
$ cd ../app && yarn start
```

You want to make sure you have the [backend](../backend/README.md) up and running before booting up the dev server.
You also want to generate/re-generate the GraphQL artefacts in the `@guva/library` package

### Editor Setup

Make sure your code editor/IDE has the following installed/functional:

- ESLint
- Prettier + Autosave on Fix
- Typescript Autocomple + Intellisence
- Git

If you're using vscode, these should come out of the box requiring only minimal configration.
Other editors may require more/less setup, but make sure you have these up and running.

### Create React App

This project was bootstrapped using Create React App and extended with Craco.
Take a look at [craco.config.js](./craco.config.js) to see what configuration options were changed

## Testing

See [TESTING.md](../TESTING.md)
