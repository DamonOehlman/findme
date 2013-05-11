var findme = require('..'),
    test = require('tape');

test('define a requirement with modules', function(t) {
    var req = findme.define('mapcontrols[zoom]');
    
    t.plan(5);
    t.equal(req.name, 'mapcontrols', 'name == mapcontrols');
    t.equal(req.version, 'latest', 'version == latest');

    t.ok(req.modules.indexOf('core') >= 0, 'core module required');
    t.ok(req.modules.indexOf('zoom') >= 0, 'zoom module required');

    t.equal(req.toString(), 'mapcontrols[zoom]', 'converted to string ok');
});

test('define a requirement with multiple modules', function(t) {
    var req = findme.define('mapcontrols[zoom:scale]');
    
    t.plan(6);
    t.equal(req.name, 'mapcontrols', 'name == mapcontrols');
    t.equal(req.version, 'latest', 'version == latest');

    t.ok(req.modules.indexOf('core') >= 0, 'core module required');
    t.ok(req.modules.indexOf('zoom') >= 0, 'zoom module required');
    t.ok(req.modules.indexOf('scale') >= 0, 'scale module required');

    t.equal(req.toString(), 'mapcontrols[zoom:scale]', 'converted to string ok');
});

test('define a requirement with multiple modules (space delimited)', function(t) {
    var req = findme.define('mapcontrols[zoom scale]');
    
    t.plan(6);
    t.equal(req.name, 'mapcontrols', 'name == mapcontrols');
    t.equal(req.version, 'latest', 'version == latest');

    t.ok(req.modules.indexOf('core') >= 0, 'core module required');
    t.ok(req.modules.indexOf('zoom') >= 0, 'zoom module required');
    t.ok(req.modules.indexOf('scale') >= 0, 'scale module required');

    t.equal(req.toString(), 'mapcontrols[zoom:scale]', 'converted to string ok');
});

test('define a require with variable modules', function(t) {
    var req = findme.define('trim[js#String.trim]');
    
    t.plan(5);
    t.equal(req.name, 'trim', 'name == trim');
    t.equal(req.version, 'latest', 'version == latest');

    t.ok(req.modules.indexOf('core') >= 0, 'core module required');
    t.ok(req.modules.indexOf('js#String.trim') >= 0, 'string.trim module required');

    t.ok(req.toString(), 'trim[js#String.trim]', 'tostring ok');
});

test('define a require with multiple variable modules', function(t) {
    var req = findme.define('trim[js#String.trim js#Array.indexOf]');
    
    t.plan(6);
    t.equal(req.name, 'trim', 'name == trim');
    t.equal(req.version, 'latest', 'version == latest');

    t.ok(req.modules.indexOf('core') >= 0, 'core module required');
    t.ok(req.modules.indexOf('js#String.trim') >= 0, 'string.trim module required');
    t.ok(req.modules.indexOf('js#Array.indexOf') >= 0, 'Array.indexOf module required');

    t.ok(req.toString(), 'trim[js#String.trim:js#Array.indexOf]', 'tostring ok');
});

test('define a module that has an extension in the name', function(t) {
    var req = findme.define('spin.js');

    t.plan(3);
    t.equal(req.name, 'spin.js', 'name == spin.js');
    t.equal(req.version, 'latest', 'version == latest');
    t.ok(req.modules.indexOf('core') >= 0, 'core module required');
});