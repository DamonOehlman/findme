var reCommaDelim = /\,\s*/,
    reColonOrSpaceDelim = /[\:\s]\s*/,
    reAlias = /(.*)\s+as\s+(\w+)/,
    reLeadingPaths = /^(\..*[\/\\])(.*)$/,
    reVersion = /(.*)\s+([\d\.x]+)/,
    reModules = /(.*)\[(.*?)\]$/;

function Requirement(text) {
    var aliasMatch = reAlias.exec(text),
        versionMatch, modulesMatch, pathMatch;
        
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