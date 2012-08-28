var findme = require('../dist/commonjs/findme'),
    expect = require('expect.js');

describe('findme singleline parsing', function() {
    it('should be able to extract the requirements from a single line of text', function() {
        var output = findme('// req: underscore, matchme');
        
        expect(typeof output.content).to.equal('string');
        expect(output.content).to.equal('');
        expect(output.dependencies.underscore).to.be.ok();
        expect(output.dependencies.matchme).to.be.ok();
    });
    
    it('should be able to extract requirements using the // dep syntax', function() {
        var output = findme('// dep: underscore, matchme');
        
        expect(typeof output.content).to.equal('string');
        expect(output.content).to.equal('');
        expect(output.dependencies.underscore).to.be.ok();
        expect(output.dependencies.matchme).to.be.ok();
    });
    
    it('should be able to extract requirements using an alias', function() {
        var output = findme('// dep: underscore as _, matchme');
        
        expect(typeof output.content).to.equal('string');
        expect(output.content).to.equal('');

        expect(output.dependencies.underscore).to.be.ok();
        expect(output.dependencies.underscore.alias).to.equal('_');
        expect(output.dependencies.matchme).to.be.ok();
    });
    
    it('should be able to extract versioned requirements', function() {
        var output = findme('// dep: underscore 1.3.x as _, matchme');
        
        expect(typeof output.content).to.equal('string');
        expect(output.content).to.equal('');

        expect(output.dependencies.underscore).to.be.ok();
        expect(output.dependencies.underscore.version).to.equal('1.3.x');
        expect(output.dependencies.underscore.alias).to.equal('_');
        expect(output.dependencies.matchme).to.be.ok();
    });
    
    it('should be able to extract a relative requirement', function() {
        var output = findme('// dep: ./underscore 1.3.x as _, matchme');
        
        expect(typeof output.content).to.equal('string');
        expect(output.content).to.equal('');

        expect(output.dependencies.underscore).to.be.ok();
        expect(output.dependencies.underscore.version).to.equal('1.3.x');
        expect(output.dependencies.underscore.alias).to.equal('_');
        expect(output.dependencies.underscore.path).to.equal('./underscore');
        expect(output.dependencies.matchme).to.be.ok();
    });
});