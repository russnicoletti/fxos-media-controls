(function(define){define(function(require,exports,module){

/**
 * Dependencies
 */

var component = require('gaia-component');

/**
 * Locals
 */

var isTouch = 'ontouchstart' in window;

/**
 * Exports
 */

module.exports = component.register('fxos-media-controls', {
  created: function() {
    this.setupShadowRoot();

    var $id = this.shadowRoot.getElementById.bind(this.shadowRoot);

    this.els = {
      container: $id('container'),
      previous:  $id('previous'),
      toggle:    $id('toggle'),
      next:      $id('next')
    };

    var seeking = false;

    this.els.container.addEventListener('contextmenu', (evt) => {
      evt.preventDefault();

      if (seeking) {
        return;
      }

      var button = evt.target.closest('button');
      if (button.id === 'previous' || button.id === 'next') {
        seeking = true;

        this.dispatchEvent(new CustomEvent('startseek', {
          detail: { reverse: button.id === 'previous' }
        }));
      }
    });

    this.els.container.addEventListener(isTouch ? 'touchend' : 'mouseup',
      (evt) => {
        if (seeking) {
          evt.preventDefault();

          this.dispatchEvent(new CustomEvent('stopseek'));
          seeking = false;
        }
      }
    );

    this.els.container.addEventListener('click', (evt) => {
      var button = evt.target.closest('button');
      switch (button.id) {
        case 'previous':
        case 'next':
          this.dispatchEvent(new CustomEvent(button.id));
          break;
        case 'toggle':
          this.paused = !this.paused;
          this.dispatchEvent(new CustomEvent(this.paused ? 'pause' : 'play'));
          break;
      }
    });
  },

  attached: function() {
    this.setupShadowL10n();
  },

  attrs: {
    paused: {
      get() {
        return this.els.toggle.dataset.icon !== 'pause';
      },

      set(value) {
        var paused = !!value;
        if (paused === this.paused) {
          return;
        }

        this.els.toggle.dataset.icon   = paused ? 'play' : 'pause';
        this.els.toggle.dataset.l10nId = paused ? 'playbackPlay' : 'playbackPause';

        this.localizeShadow(this.shadowRoot);
      }
    }
  },

  template:
`<div id="container">
  <button type="button" id="previous"
      data-icon="skip-back"
      data-l10n-id="playbackPrevious">
  </button>
  <button type="button" id="toggle"
      data-icon="play"
      data-l10n-id="playbackPlay">
  </button>
  <button type="button" id="next"
      data-icon="skip-forward"
      data-l10n-id="playbackNext">
  </button>
</div>
<style>
  [data-icon]:before { /* Copied from gaia-icons/gaia-icons.css */
    font-family: "gaia-icons";
    content: attr(data-icon);
    display: inline-block;
    font-weight: 500;
    font-style: normal;
    text-decoration: inherit;
    text-transform: none;
    text-rendering: optimizeLegibility;
    font-size: 30px;
    -webkit-font-smoothing: antialiased;
  }
  #container {
    background: var(--background-minus-minus);
    border-top: 1px solid var(--background);
    direction: ltr;
    display: flex;
    flex-flow: row nowrap;
    position: relative;
    width: 100%;
    height: 48px;
    -moz-user-select: none;
  }
  #container > button {
    background: transparent;
    border: none;
    border-radius: 0;
    color: var(--text-color);
    flex: 1 0 auto;
    position: relative;
    padding: 0;
    height: 100%;
    transition: background 0.2s ease;
  }
  #container > button:hover {
    background: transparent;
  }
  #container > button:active {
    background: var(--highlight-color);
    transition-duration: 0s;
  }
  #container > button:disabled {
    opacity: 0.3;
  }
  #container > button:disabled:active {
    background: transparent;
  }
</style>`

});

});})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){
return w[n];},m.exports,m);w[n]=m.exports;};})('fxos-media-controls',this));
