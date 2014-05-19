var Requirement = require('./requirement');
var reCommaDelim = /\,\s*/;
var reColonOrSpaceDelim = /[\:\s]\s*/;
var reLeadingPaths = /^(\..*[\/\\])(.*)$/;
var reVersion = /(.*)\s+([\d\.x]+)/;
var reModules = /(.*)\[(.*?)\]$/;
var reDelimitedModules = /\[([^\]]*[\s\,][^\]]*)\]/g;
var reDelim = /\,\s*/g;

/**
  # findme

  FindMe is a small node library that is designed to parse a string and
  generate a list of dependencies that have been found in the string
  embedded in `// dep:` or `// req:` comments.

  ## Requirement Definition

  A requirement can be defined in a number of ways. Firstly, you can specify
  a module simply by name:

  ```js
  // req: underscore
  ```

  ### Versioning

  or, you can specify a particular version of underscore:

  ```js
  // req: underscore 1.3.x
  ```

  __NOTE__: While findme uses the [semver](http://semver.org/) syntax you can
  only specify either a concrete version (e.g. `1.3.3`) or a latest patch
  release for a specific minor version (e.g. `1.3.x`).  Support for other patterns
  has not been provided as in general using patterns such as `>= 1` and the
  like are discouraged when building apps.

  ### Aliases

  In the case of some packages / modules, they are usually given an alias within
  the context of your code.  For instance, the underscore module exports itself as
  the `_` character.  To support this in findme powered libraries, simply specify
  your requirement with an alias:

  ```js
  // req: underscore as _
  ```
**/

var findme = module.exports = function(content, opts) {
  var reRequire;
  var reSplit;
  var output = [];

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

findme.define = Requirement;
findme.Requirement = Requirement;
