var findme = require('..'),
    test = require('tape');

test('define a requirement just using a relative path (same dir)', function(t) {
    var req = findme.define('./underscore');
    
    t.plan(4);
    t.equal(req.name, 'underscore', 'name == underscore');
    t.equal(req.path, './underscore');

    t.ok(req.relative);
    t.equal(req.toString(), './underscore');
});


test('define a requirement just using a relative path (parent dir)', function(t) {
    var req = findme.define('../libs/underscore');
    
    t.plan(4);
    t.equal(req.name, 'underscore', 'name == underscore');
    t.equal(req.path, '../libs/underscore');

    t.ok(req.relative);
    t.equal(req.toString(), '../libs/underscore');
});

test('alias relative modules', function(t) {
    var req = findme.define('./underscore as _');

    t.plan(5);
    t.equal(req.name, 'underscore', 'name == underscore');
    t.equal(req.path, './underscore');
    t.equal(req.alias, '_');

    t.ok(req.relative);
    t.equal(req.toString(), './underscore as _');
});

test('handle relative paths even when a version is specified', function(t) {
    var req = findme.define('./underscore 1.3.x');
    
    t.plan(5);
    t.equal(req.name, 'underscore', 'name == underscore');
    t.equal(req.path, './underscore');
    t.equal(req.version, '1.3.x');

    t.ok(req.relative);
    t.equal(req.toString(), './underscore 1.3.x');
});

test('should not think a non-relative package is relative', function(t) {
    var req = findme.define('underscore 1.3.x');
    
    t.plan(3);
    t.equal(req.name, 'underscore', 'name == underscore');
    t.equal(req.version, '1.3.x');
    t.notOk(req.relative);
});