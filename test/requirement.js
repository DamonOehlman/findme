var findme = require('..'),
    test = require('tape');

test('define a requirement just using a name', function(t) {
  var req = new findme.Requirement('underscore');

  t.plan(3);
  t.equal(req.name, 'underscore');
  t.equal(req.alias, 'underscore');
  t.equal(req.toString(), 'underscore');
});

test('define a require that uses an alias', function(t) {
  var req = new findme.Requirement('underscore as _');

  t.plan(3);
  t.equal(req.name, 'underscore');
  t.equal(req.alias, '_');
  t.equal(req.toString(), 'underscore as _');
});

test('define a require that uses jquery as an alias', function(t) {
  var req = new findme.Requirement('jquery as $');

  t.plan(3);
  t.equal(req.name, 'jquery');
  t.equal(req.alias, '$');
  t.equal(req.toString(), 'jquery as $');
});

test('extract a version from the requirement', function(t) {
  var req = new findme.Requirement('underscore 1.3.x');

  t.plan(4);
  t.equal(req.name, 'underscore');
  t.equal(req.alias, 'underscore');
  t.equal(req.version, '1.3.x');

  t.equal(req.toString(), 'underscore 1.3.x');
});

test('handle both a version and alias being defined', function(t) {
  var req = new findme.Requirement('underscore 1.3.x as _');

  t.plan(4);
  t.equal(req.name, 'underscore');
  t.equal(req.alias, '_');
  t.equal(req.version, '1.3.x');

  t.equal(req.toString(), 'underscore 1.3.x as _');
});
