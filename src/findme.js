//= core/requirement

var reDelimitedModules = /\[([^\]]*[\s\,][^\]]*)\]/g,
    reDelim = /\,\s*/g;

function findme(content, opts) {
    var reRequire, reSplit,
        output = [];

    // ensure we have opts
    opts = opts || {};

    // see if we have been passed a requirements store to use, if not use the default array
    opts.store = opts.store || {};

    // initialise the comment leader regular expression
    reRequire = opts.requireRegex || (/^\;?\s*(?:\/\/|\#)\s*(?:req|dep)\:\s(.*)$/);
    
    // initialise the line break regex
    reSplit = opts.splitRegex || (/\n/);
    
    // process the lines in the content
    (content || '').split(reSplit).forEach(function(line) {
        // check if the line is a require statement
        var match = reRequire.exec(line);
        
        // if we have a match on this line, then add the requirements
        if (match) {
            var requirements = match[1],
                cleanRequiredModuleMatch = reDelimitedModules.exec(requirements);
                
            // clean module requirements from space and comma delimiters
            while (cleanRequiredModuleMatch) {
                var modules = cleanRequiredModuleMatch[1].replace(reDelim, ':');
                
                requirements = requirements.slice(0, cleanRequiredModuleMatch.index) + 
                    '[' + modules + ']' + 
                    requirements.slice(cleanRequiredModuleMatch.index + cleanRequiredModuleMatch[1].length + 2);
                
                cleanRequiredModuleMatch = reDelimitedModules.exec(requirements);
            }
            
            // split the requirements
            requirements.split(reDelim).forEach(function(requireText) {
                var req = new Requirement(requireText);
                
                // TODO: check the store for existing repo
                
                // add to the store
                opts.store[req.name] = req;
            });
        }
        // otherwise, pass the line through to the output
        else {
            output[output.length] = line;
        }
    });
    
    return {
        content: output.join('\n'),
        dependencies: opts.store
    };
}

findme.define = function(input) {
    return new Requirement(input);
};

findme.Requirement = Requirement;