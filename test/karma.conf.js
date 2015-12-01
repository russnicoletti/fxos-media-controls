'use strict';
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'sinon-chai'],
    browsers: ['firefox_latest'],
    client: {
      captureConsole: true,
      mocha: {'ui': 'tdd'}
    },
    basePath: '../',

    customLaunchers: {
      firefox_latest: {
        base: 'FirefoxNightly',
        prefs: {'dom.webcomponents.enabled': true}
      }
    },

    files: [
      'bower_components/gaia-component/gaia-component.js',
      'fxos-media-controls.js',
      'node_modules/test-utils/node_modules/axe-core/axe.min.js',
      'node_modules/test-utils/src/utils.js',
      'node_modules/test-utils/src/accessibility.js',
      'test/test-unit.js'
    ],

    proxies: {
      '/bower_components/': 'http://localhost:9876/base/bower_components/',
      '/node_modules/': 'http://localhost:9876/base/node_modules/'
    }
  });
};
