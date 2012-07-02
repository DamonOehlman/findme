var findme = require('../pkg/cjs/findme'),
    expect = require('expect.js');

describe('requirement definition tests', function() {
    it('should be able to define a requirement just using a name', function() {
        var req = new findme.Requirement('underscore');
        
        expect(req.name).to.equal('underscore');
    });
});