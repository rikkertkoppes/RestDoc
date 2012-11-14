var fs = require('fs');
var frisby = require('frisby');
var Parser = require('blueprint-parser');



function test(filename) {
    var str = fs.readFileSync(filename,'UTF8');
    var doc = Parser.parse(str);

    doc.sections.forEach(function(s) {
        testSection(doc,s);
    });
}

function testSection(doc,s) {
    s.resources.forEach(function(r) {
        testResource(doc,r);
    });
}

function testResource(doc,r) {
    var t = frisby.create(r.description);
    t[r.method.toLowerCase()](doc.location+r.url);
    var header, headers = r.request.headers;
    for (header in headers) {
        t.addHeader(header, headers[header]);
    }
    var response = r.responses[0];
    if (response) {
        for (header in response.headers) {
            t.expectHeaderContains(header.toLowerCase(), response.headers[header]);
        }
        t.expectJSON(JSON.parse(response.body));
    }

    t.toss();
}

test('sample.blp');