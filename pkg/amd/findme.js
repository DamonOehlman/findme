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
      this.alias = this.alias || '';
      this.version = this.version || 'latest';
      this.modules = this.modules || ['core'];
      this.path = (this.path || '') + this.name;
  }
  
  Requirement.prototype = {
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
  
  findme.Requirement = Requirement;

  if (typeof findme != 'undefined') { return findme; }
});