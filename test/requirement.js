var findme = require('../dist/commonjs/findme'),
    expect = require('expect.js');

describe('requirement tests', function() {
    it('should be able to define a requirement just using a name', function() {
        var req = new findme.Requirement('underscore');
        
        expect(req.name).to.equal('underscore');
        expect(req.alias).to.equal('underscore');
        
        expect(req.toString()).to.equal('underscore');
    });
    
    it('should be able to define a require that uses an alias', function() {
        var req = new findme.Requirement('underscore as _');
        
        expect(req.name).to.equal('underscore');
        expect(req.alias).to.equal('_');
        
        expect(req.toString()).to.equal('underscore as _');
    });
    
    it('should be able to extract a version from the requirement', function() {
        var req = new findme.Requirement('underscore 1.3.x');
        
        expect(req.name).to.equal('underscore');
        expect(req.alias).to.equal('underscore');
        expect(req.version).to.equal('1.3.x');
        
        expect(req.toString()).to.equal('underscore 1.3.x');
    });
    
    it('should be able to handle both a version and alias being defined', function() {
        var req = new findme.Requirement('underscore 1.3.x as _');
        
        expect(req.name).to.equal('underscore');
        expect(req.alias).to.equal('_');
        expect(req.version).to.equal('1.3.x');
        
        expect(req.toString()).to.equal('underscore 1.3.x as _');
    });
});