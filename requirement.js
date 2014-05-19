var reAlias = /(.*)\s+as\s+(\w+)/;

function Requirement(text) {
  var aliasMatch;
  var versionMatch;
  var modulesMatch;
  var pathMatch;

  if (! (this instanceof Requirement)) {
    return new Requirement(text);
  }

  aliasMatch = reAlias.exec(text);

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

module.exports = Requirement;
Requirement.prototype.toString = function() {
  var output = this.path;
  var nonCoreModules = [].concat(this.modules);

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
};
