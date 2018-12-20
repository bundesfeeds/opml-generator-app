// deploys the default google pages for this repo
var ghpages = require('gh-pages');
ghpages.publish('dist', function(err) {});