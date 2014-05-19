# findme

FindMe is a small node library that is designed to parse a string and
generate a list of dependencies that have been found in the string
embedded in `// dep:` or `// req:` comments.


[![NPM](https://nodei.co/npm/findme.png)](https://nodei.co/npm/findme/)

[![unstable](https://img.shields.io/badge/stability-unstable-yellowgreen.svg)](https://github.com/badges/stability-badges) [![Build Status](https://img.shields.io/travis/buildjs/findme.svg?branch=master)](https://travis-ci.org/buildjs/findme) 
[![browser support](https://ci.testling.com/buildjs/findme.png)](https://ci.testling.com/buildjs/findme)



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

## License(s)

### MIT

Copyright (c) 2014 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
