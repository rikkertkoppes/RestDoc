/*
    parser for apiary blueprint format
    */
function Parser() {

}

Parser.prototype.parse = function(str) {
    str = str.replace(/\r\n/g,'\n').replace(/\r/g,'\n');
    var blocks = str.split(/\n\n+/g);
    this.doc = {};

    if (blocks[0].match(/^HOST:/)) {
        this.parseHost(blocks.shift());
    }
    if (blocks[0].match(/^---/)) {
        this.parseDocs(blocks.shift());
    }
    var self = this;
    this.doc.sections = [];
    blocks.forEach(function(block) {
        self.parseSection(block);
    });


    return this.doc;
};

Parser.prototype.parseHost = function(str) {
    this.doc.host = str.split(/\s+/)[1];
};

Parser.prototype.parseDocs = function(str) {
    var res,lines = str.split(/\n/);
    if ((res = lines[0].match(/^---\s*(.*?)\s*---/))) {
        this.doc.title = res[1];
        lines.shift();
    }
};

Parser.prototype.parseSection = function(block) {
    var res,lines = block.split(/\n/);
    var pair;
    var s = {
        request: [],
        response: []
    };
    //parse doc
    if ((res = lines[0].match(/^--\s*(.*?)\s*--/))) {
        s.doc = res[1];
        lines.shift();
    }
    //parse method and path
    if ((res = lines[0].match(/^([A-Z]+)\s+(.*)$/))) {
        s.method = res[1];
        s.path = res[2];
        s.fullPath = this.doc.host+res[2];
        lines.shift();
    }
    //parse request headers
    while ((res = lines[0].match(/^(>)\s+(.*)$/))) {
        pair = res[2].split(/:\s*/);
        s.request.push({
            name: pair[0],
            value: pair[1]
        });
        lines.shift();
    }

    //parse request
    if ((res = lines[0].match(/^(\{|<[^ ])/))) {
        if (res[0]==='{') {
            s.requestJson = JSON.parse(lines[0]);
        }
        if (res[0][0]==='<') {
            s.requestXml = lines[0];
        }
        s.responseText = lines.join('\n');
        lines.shift();
    }

    //parse response headers
    while ((res = lines[0].match(/^([<])\s+(.*)$/))) {
        if (res[2].match(/^\d{3}/)) {
            s.responseStatus = parseInt(res[2],10);
        } else {
            pair = res[2].split(/:\s*/);
            s.response.push({
                name: pair[0],
                value: pair[1]
            });
        }
        lines.shift();
    }
    //parse response
    if ((res = lines[0].match(/^(\{|<[^ ])/))) {
        if (res[0]==='{') {
            s.responseJson = JSON.parse(lines.join('\n'));
        }
        if (res[0][0]==='<') {
            s.responseXml = lines.join('\n');
        }
        s.responseText = lines.join('\n');
    }
    this.doc.sections.push(s);
};

Parser.parse = function(str) {
    var p = new Parser();
    return p.parse(str);
};

module.exports = Parser;