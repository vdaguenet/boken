'use strict';

var join = require('path').join;
var outputRoot = join(process.cwd(), 'www');
var inputRoot = join(process.cwd(), 'app');

module.exports = {
  // Used by autoprefixer.
  browsersSupport: ['last 2 versions', '> 5%'],

  entry: {
    scripts: ['./app/index.js'],
    styles: ['./app/stylus/main.styl']
  },

  aliasify: {
    aliases: {
      'data': './data/',
      'sections': './sections/',
      'layouts': './layouts/',
      'config': './config/',
      'services': './services/',
      'utils': './utils/',
      'components': './components/'
    },
    configDir: inputRoot + '/',
    verbose: false
  },

  output: {
    root: outputRoot,
    path: join(outputRoot, 'build'),
    filename: 'app'
  }
};