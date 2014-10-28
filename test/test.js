var assert = require('assert');
var detective = require('../');

describe('detective-es6', function() {
  it('retrieves the dependencies of es6 modules', function() {
    var deps = detective('import {foo, bar} from "mylib";');
    assert(deps.length === 1);
    assert(deps[0] === 'mylib');
  });

  it('handles multiple imports', function() {
    var deps = detective('import {foo, bar} from "mylib";\nimport "mylib2"');

    assert(deps.length === 2);
    assert(deps[0] === 'mylib');
    assert(deps[1] === 'mylib2');
  });

  it('returns an empty list for non-es6 modules', function() {
    var deps = detective('var foo = require("foo");');
    assert(!deps.length);
  });
});