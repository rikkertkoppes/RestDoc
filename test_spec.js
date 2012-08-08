var fs = require('fs');
var frisby = require('frisby');
var Parser = require('./parser');



function test(filename) {
    var str = fs.readFileSync(filename,'UTF8');
    var doc = Parser.parse(str);

    // console.log(JSON.stringify(doc,null,'   '));

    doc.sections.forEach(function(s) {
        testSection(s);
    });
    
}

function testSection(s) {
    var t = frisby.create(s.doc);
    t[s.method.toLowerCase()](s.fullPath);
    t.expectStatus(s.responseStatus);

    s.response.forEach(function(header) {
        t.expectHeaderContains(header.name.toLowerCase(), header.value);
    });

    t.expectJSON(s.responseJson);
    t.toss();
}

test('sample.blp');