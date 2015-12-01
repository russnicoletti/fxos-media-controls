/* global sinon, assert, suite, setup, teardown, test, controls */

suite('FxosMediaControls', function() {
  'use strict';

  setup(function() {
    this.sandbox = sinon.sandbox.create();
    this.dom = document.createElement('div');
    this.dom.innerHTML =
      `<fxos-media-controls id="controls"></fxos-media-controls>`;

    document.body.appendChild(this.dom);
  });

  teardown(function() {
    this.sandbox.restore();
    document.body.removeChild(this.dom);
    this.dom = null;
  });

  test('Default state is "paused"', function() {
    assert.equal(controls.paused, true);
  });
});
