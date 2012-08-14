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