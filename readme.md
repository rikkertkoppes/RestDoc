Notes
==================

This all very priliminary, use at your own risk

This package uses the apiary (blueprint parser)[https://github.com/apiaryio/blueprint-parser]

This parser is a little rough to get going (at the moment, since the npm install does not work). On ubuntu do

    $ git clone https://github.com/apiaryio/blueprint-parser.git
    $ make
    $ npm install

For windows, copy the whole lot. I included the built package in this repo for now (still need to install)

This package constitutes:
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


