var findme = require('../pkg/cjs/findme'),
    expect = require('expect.js');

describe('requirement modules tests', function() {
    it('should be able to define a requirement with modules', function() {
        var req = new findme.Requirement('mapcontrols[zoom]');
        
        expect(req.name).to.equal('mapcontrols');
        expect(req.version).to.equal('latest');
        expect(req.modules).to.contain('core');
        expect(req.modules).to.contain('zoom');
    });
    
    it('should be able to define a requirement with multiple modules', function() {
        var req = new findme.Requirement('mapcontrols[zoom:scale]');
        
        expect(req.name).to.equal('mapcontrols');
        expect(req.version).to.equal('latest');
        expect(req.modules).to.contain('core');
        expect(req.modules).to.contain('zoom');
        expect(req.modules).to.contain('scale');
    });
});