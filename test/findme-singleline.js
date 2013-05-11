var findme = require('..'),
    test = require('tape');

test('extract the requirements from a single line of text', function(t) {
    var output = findme('// req: underscore, matchme');

    t.plan(4);
    t.equal(typeof output.content, 'string', 'string content');
    t.equal(output.content, '', 'empty content');
    t.ok(output.dependencies.underscore, 'found underscore');
    t.ok(output.dependencies.matchme, 'found matchme');
});

test('extract requirements using the // dep syntax', function(t) {
    var output = findme('// dep: underscore, matchme');

    t.plan(4);
    t.equal(typeof output.content, 'string', 'string content');
    t.equal(output.content, '', 'empty content');
    t.ok(output.dependencies.underscore, 'found underscore');
    t.ok(output.dependencies.matchme, 'found matchme');
});

test('extract requirements using an alias', function(t) {
    var output = findme('// dep: underscore as _, matchme');
    
    t.plan(5);
    t.equal(typeof output.content, 'string', 'string content');
    t.equal(output.content, '', 'empty content');

    t.ok(output.dependencies.underscore, 'found underscore');
    t.equal(output.dependencies.underscore.alias, '_', 'underscore aliased to _');
    t.ok(output.dependencies.matchme, 'found matchme');
});
    
test('extract versioned requirements', function(t) {
    var output = findme('// dep: underscore 1.3.x as _, matchme');
    
    t.plan(6);
    t.equal(typeof output.content, 'string', 'string content');
    t.equal(output.content, '', 'empty content');

    t.ok(output.dependencies.underscore, 'found underscore');
    t.equal(output.dependencies.underscore.version, '1.3.x', 'version extracted as 1.3.x');
    t.equal(output.dependencies.underscore.alias, '_', 'underscore aliased to _');
    t.ok(output.dependencies.matchme, 'found matchme');
});

test('extract a relative requirement', function(t) {
    var output = findme('// dep: ./underscore 1.3.x as _, matchme');
    
    t.plan(7);
    t.equal(typeof output.content, 'string', 'string content');
    t.equal(output.content, '', 'empty content');

    t.ok(output.dependencies.underscore, 'found underscore');
    t.equal(output.dependencies.underscore.version, '1.3.x', 'version extracted as 1.3.x');
    t.equal(output.dependencies.underscore.alias, '_', 'underscore aliased to _');
    t.equal(output.dependencies.underscore.path, './underscore', 'detected relative path');
    t.ok(output.dependencies.matchme, 'found matchme');
});