
define('findme', [], function() {
    var reCommaDelim = /\,\s*/,
        reColonOrSpaceDelim = /[\:\s]\s*/,
        reAlias = /(.*)\s+as\s+(\w+)/,
        reLeadingPaths = /^(\..*[\/\\])(.*)$/,
        reVersion = /(.*)\s+([\d\.x]+)/,
        reModules = /(.*)\[(.*?)\]$/;
    
    function Requirement(text) {
        var aliasMatch = reAlias.exec(text),
            versionMatch, modulesMatch, pathMatch;
            
        // initialise the relative status to false
        this.relative = false;
            
        // if we have an as section, then extract the text and the as section
        if (aliasMatch) {
            text = aliasMatch[1];
            this.alias = aliasMatch[2];
        }
        
        // check for a version in the name
        versionMatch = reVersion.exec(text);
        if (versionMatch) {
            text = versionMatch[1];
            this.version = versionMatch[2];
        }
        
        // check for a leading path
        pathMatch = reLeadingPaths.exec(text);
        if (pathMatch) {
            text = pathMatch[2];
            this.path = pathMatch[1];
            
            // set the relative flag to true
            this.relative = true;
        }
        
        // check for a module definition
        modulesMatch = reModules.exec(text);
        if (modulesMatch) {
            text = modulesMatch[1];
            
            // parse out the modules
            this.modules = modulesMatch[2].split(reColonOrSpaceDelim);
            
            // ensure the core module is included
            if (this.modules.indexOf('core') < 0) {
                this.modules.unshift('core');
            }
        }
        
        this.name = text;
        this.alias = this.alias || this.name;
        this.version = this.version || 'latest';
        this.modules = this.modules || ['core'];
        this.path = (this.path || '') + this.name;
    }
    
    Requirement.prototype = {
        toString: function() {
            var output = this.path,
                nonCoreModules = [].concat(this.modules);
                
            // splice out the core module
            nonCoreModules.splice(nonCoreModules.indexOf('core'), 1);
            
            // if we have modules, then attach that to the output
            if (nonCoreModules.length > 0) {
                output += '[' + nonCoreModules.join(':') + ']';
            }
            
            // if we have a version (other than latest) include that in the output
            if (this.version !== 'latest') {
                output += ' ' + this.version;
            }
            
            // if we have an alias, include the alias specifier
            if (this.alias !== this.name) {
                output += ' as ' + this.alias;
            }
            
            return output;
        }
    };
    
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
    
    /**
    ## findme.resolve
    
    The resolve function is used to locate script tags within the page and identify elements
    that have a data attribute that specifies dependencies.  Valid data attributes are:
    
    - data-dep, data-deps, data-dependencies
    - data-req, data-reqs, data-requirements
    
    Once the requirements have been identified, the bake.io service is used to bring in 
    those requirements via relevant script and link tags.  Any scripts that have a dependency
    will have the `defer` attribute added to ensure that it is only run once the dependencies
    have been resolved.
    */
    findme.resolve = function(opts) {
    	var scripts = document.getElementsByTagName('script');
    
    	// ensure we have opts
    	opts = opts || {};
    
    	// initialise the default endpoint
    	opts.provider = opts.provider || 'bake.io';
    
    	// iterate through the scripts
    	scripts.forEach(function(script) {
    		console.log(script.innerText);
    	});
    };
    
    findme.Requirement = Requirement;
    
    return typeof findme != 'undefined' ? findme : undefined;
});