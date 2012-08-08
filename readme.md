Notes
==================

This all very priliminary, use at your own risk

This package constitutes:
* an apiary.io blueprint syntax parser, which is very crude and flawed (see parser.js)
* a blueprint to frisby test converter, which is incomplete (see test_spec.js)
* a blueprint renderer based on hbs and handlebars (see server.js)

First install

    npm install

To run the tests, install jasmine:

    npm install jasmine-node -g

Then run the tests

    jasmine-node .

To view the docs start the server

    node server.js

And view it at `localhost:3000`


