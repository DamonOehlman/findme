# findme

FindMe is a small node library that is designed to parse a string and generate a list of dependencies that have been found in the string embedded in `// dep:` or `// req:` comments.

<a href="http://travis-ci.org/#!/DamonOehlman/findme"><img src="https://secure.travis-ci.org/DamonOehlman/findme.png" alt="Build Status"></a>

[![browser support](https://ci.testling.com/buildjs/findme.png)](https://ci.testling.com/buildjs/findme)

## Requirement Definition

A requirement can be defined in a number of ways. Firstly, you can specify a module simply by name:

```js
// req: underscore
```

### Versioning

or, you can specify a particular version of underscore:

```js
// req: underscore 1.3.x
```

__NOTE__: While findme uses the [semver](http://semver.org/) syntax you can only specify either a concrete version (e.g. `1.3.3`) or a latest patch release for a specific minor version (e.g. `1.3.x`).  Support for other patterns has not been provided as in general using patterns such as `>= 1` and the like are discouraged when building apps.

### Aliases

In the case of some packages / modules, they are usually given an alias within the context of your code.  For instance, the underscore module exports itself as the `_` character.  To support this in findme powered libraries, simply specify your requirement with an alias:

```js
// req: underscore as _
```