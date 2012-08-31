var findme = require('../dist/commonjs/findme'),
    expect = require('expect.js');

describe('requirement modules tests', function() {
    it('should be able to define a requirement with modules', function() {
        var req = findme.define('mapcontrols[zoom]');
        
        expect(req.name).to.equal('mapcontrols');
        expect(req.version).to.equal('latest');
        expect(req.modules).to.contain('core');
        expect(req.modules).to.contain('zoom');
        
        expect(req.toString()).to.equal('mapcontrols[zoom]');
    });
    
    it('should be able to define a requirement with multiple modules', function() {
        var req = findme.define('mapcontrols[zoom:scale]');
        
        expect(req.name).to.equal('mapcontrols');
        expect(req.version).to.equal('latest');
        expect(req.modules).to.contain('core');
        expect(req.modules).to.contain('zoom');
        expect(req.modules).to.contain('scale');
        
        expect(req.toString()).to.equal('mapcontrols[zoom:scale]');
    });
    
    it('should be able to define a requirement with multiple modules (space delimited)', function() {
        var req = findme.define('mapcontrols[zoom scale]');
        
        expect(req.name).to.equal('mapcontrols');
        expect(req.version).to.equal('latest');
        expect(req.modules).to.contain('core');
        expect(req.modules).to.contain('zoom');
        expect(req.modules).to.contain('scale');
        
        expect(req.toString()).to.equal('mapcontrols[zoom:scale]');
    });
    
    it('should be able to define a require with variable modules', function() {
        var req = findme.define('trim[js#String.trim]');
        
        expect(req.name).to.equal('trim');
        expect(req.version).to.equal('latest');
        expect(req.modules).to.contain('core');
        expect(req.modules).to.contain('js#String.trim');
        
        expect(req.toString()).to.equal('trim[js#String.trim]');
    });
    
    it('should be able to define a require with multiple variable modules', function() {
        var req = findme.define('trim[js#String.trim js#Array.indexOf]');
        
        expect(req.name).to.equal('trim');
        expect(req.version).to.equal('latest');
        expect(req.modules).to.contain('core');
        expect(req.modules).to.contain('js#String.trim');
        expect(req.modules).to.contain('js#Array.indexOf');
        
        expect(req.toString()).to.equal('trim[js#String.trim:js#Array.indexOf]');
    });

    it('should be able to define a module that has an extension in the name', function() {
        var req = findme.define('spin.js');

        expect(req.name).to.equal('spin.js');
        expect(req.version).to.equal('latest');
        expect(req.modules).to.contain('core');
    });
});