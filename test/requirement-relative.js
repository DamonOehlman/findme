var findme = require('../findme'),
    expect = require('expect.js');

describe('relative requirement tests', function() {
    it('should be able to define a requirement just using a relative path (same dir)', function() {
        var req = findme.define('./underscore');
        
        expect(req.name).to.equal('underscore');
        expect(req.path).to.equal('./underscore');
        expect(req.relative).to.be.ok();
        
        expect(req.toString()).to.equal('./underscore');
    });


    it('should be able to define a requirement just using a relative path (parent dir)', function() {
        var req = findme.define('../libs/underscore');
        
        expect(req.name).to.equal('underscore');
        expect(req.path).to.equal('../libs/underscore');
        expect(req.relative).to.be.ok();
        
        expect(req.toString()).to.equal('../libs/underscore');
    });
    
    it('should be able to alias relative modules', function() {
        var req = findme.define('./underscore as _');

        expect(req.name).to.equal('underscore');
        expect(req.path).to.equal('./underscore');
        expect(req.alias).to.equal('_');
        expect(req.relative).to.be.ok();
        
        expect(req.toString()).to.equal('./underscore as _');
    });
    
    it('should be able to handle relative paths even when a version is specified', function() {
        var req = findme.define('./underscore 1.3.x');
        
        expect(req.name).to.equal('underscore');
        expect(req.path).to.equal('./underscore');
        expect(req.version).to.equal('1.3.x');
        expect(req.relative).to.be.ok();
        
        expect(req.toString()).to.equal('./underscore 1.3.x');
    });
    
    it('should not think a non-relative package is relative', function() {
        var req = findme.define('underscore 1.3.x');
        
        expect(req.name).to.equal('underscore');
        expect(req.path).to.equal('underscore');
        expect(req.version).to.equal('1.3.x');
        expect(req.relative).to.not.be.ok();
    });
});