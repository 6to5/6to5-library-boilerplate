# es6-library-boilerplate

Author libraries in ES6 for Node and the browser.

### Features

- Author ES6, export ES5
- Export UMD
- Mocha/Chai/Sinon testing stack
- Unit tests that work in Node and the browser

### Usage

This library is built with Gulp. There are three main Gulp
tasks for you to use.

- `gulp` - Lint the library and tests, then run the unit tests
- `gulp build` - Lint then build the library
- `gulp test:browser` - Build the library for use with the browser spec runner.
  Changes to the source will cause the runner to automatically refresh.

### Modifying

This is a moderately complex build system. There are a few places to make changes
to if you wish to do so:

