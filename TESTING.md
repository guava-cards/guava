# Testing

## Backend

The backend (Ruby on Rails) app uses RSpec to write/run tests.
If you are unfamiliar with RSpec, check out the following resource: https://rspec.info

### Running Tests

All test commands must be executed within the docker container shell.
In order to access this, make sure you have the `backend` container up and running:

```bash
$ cd backend && docker-compose up -d
```
And then you can access the shell through the Docker app, or CLI:

```bash
$ docker containers ls -f name=gauva_app

CONTAINER ID   IMAGE         COMMAND                  CREATED        STATUS       PORTS                                       NAMES
b26bb58635e7   backend_app   "dev-entrypoint.sh r…"   18 hours ago   Up 2 hours   0.0.0.0:3000->3000/tcp, :::3000->3000/tcp   guava_app

$ docker exec -it b26bb58635e7 /bin/sh
```

__Test Commands__

To test a specific file, run:

```bash
/var/app$ bundle exec rspec /path/to/test/file.rb
```

To test all suites, run:

```
/var/app$ bundle exec rails test
```


## Frontend

This frontend (`@guava/library`, `@guava/app`) uses:

* [unit testing](https://www.guru99.com/unit-testing-guide.html#:~:text=UNIT%20TESTING%20is%20a%20type,an%20application%20by%20the%20developers.)
* [intgration testing](https://testing-library.com/docs/react-testing-library/intro/)
* [end-to-end testing](https://www.cypress.io/)
* [snapshot testing](https://jestjs.io/docs/snapshot-testing)
* [accessibility testing](https://github.com/nickcolley/jest-axe)

__Unit Tests__

Written and ran with [Jest](https://jestjs.io/). The configuration for this can be found in the [jest.config.ts](jest.config.ts) and [jest.setup.ts](jest.setup.ts) files. Unit tests should be written in order to test a pice of code (e.g. function, component, class) in isolation, independent of any other parts of the application.

You should find yourself writing more *integration tests* than you do unit tests, since they not only test how systems work but how they interact with one another.

__Integration Tests__

Majority of the tests written should be integration tests. These tend to cover several different components, how the function and interact with each other. Beacuse of this, writing integration tests will get you higher coverage quicker than unit testing.

They're written and ran with [Jest](https://jestjs.io/). 
When integration testing React components, we use [React Testing Library](https://testing-library.com/docs/react-testing-library).

> While writing integration tests, keep in mind the goal is to test how the user reacts with the app rather than solely how it functions. Have a read through the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/#the-problem) introduction for a better background on this.

__End to End Tests__

Written and ran with [Cypress](https://www.cypress.io/). You should write these sparingly, as they are high level tests that test how the system works in real-life use cases .i.e. exactly how the user would interact with it.

Configuration for e2e testing can be found in the cypress.json file.

__Snapshot Testing__

Snapshots just comapre the state of the UI at the point the snapshot was taken, to the state of the UI currently and raise an error if there are any discrepancies.

For this reason, you should check out any snapshots to Git, and when you make intentional changes to the UI re-run the tests with the `-u` flag to update the snapshots.

These are ran by Jest.

__Accessibility Testing__

Read https://github.com/nickcolley/jest-axe for more background.

#### Running Tests
There are several scripts you can use to run tests across all the projects in the repo.

* `yarn test` – will run tests against all frontend projects
* `yarn test:app` – will run tests against `@guava/app`
* `yarn test:library` – will run tests against `@guava/library`
* `yarn test:coverage` – will run tests against all projects and generate a coverage report.
* `yarn coverage:open` – will open the coverage report if it exists, or generate a new one

If you'd like to run tests against a specific file, rather than the whole suite you can try something like this:

* `yarn test DeckList --watch`
