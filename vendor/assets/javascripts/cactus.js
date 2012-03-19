var Cactus = (function() {

  // Public Accessor
  var _cactus  = {};

  // Private Variables
  var tag_name = null;
  var property = null;
  var styles   = null;


  // Debug
  _cactus.debug = function() {
    return {
      tag_name  : tag_name,
      property  : property,
      styles    : styles
    };
  };

  // Expectations
  _cactus.expect = function(elem, attr) {
    tag_name  = elem;
    property  = attr
    styles    = [ $(tag_name).css(property) ];

    return this;
  };

  _cactus.expectEvery = function(elem, attr) {
    tag_name  = elem;
    property  = attr
    styles    = $.map( $(tag_name), function(elem, i) { return $(elem).css(property);  } );

    return this;
  };

  // Matchers
  _cactus.toEqual = function(expected_style) {
    return expectationResult(styles, expected_style);
  };

  _cactus.toContain = function(expected_style) {
    return expectationResult(styles, expected_style, function(x, y) { return x.match(y); });
  };

  _cactus.toHaveColor = function(expected_style) {
    // Source: http://stackoverflow.com/questions/1740700/get-hex-value-rather-than-rgb-value-using-jquery
    function rgb2hex(rgb) {
      function hex(x) { return ("0" + parseInt(x).toString(16)).slice(-2); }

      rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
      return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    computed = $.map( styles, function(style, i) { return rgb2hex(style).toLowerCase(); } );
    expected = expected_style.toLowerCase();

    return expectationResult(computed, expected);
  };

  function expectationResult(computed, expected, comparator) {
    // Defaults to equality comparator
    if (comparator === undefined) { comparator = function(x, y) { return x === y; }; }

    var result = true;
    $.each(computed, function(index, style) {
      if (!comparator(style, expected)) {
        jq_selector = "$('" + tag_name + "')" + "[" + index + "]";
        console.log("Cactus expected " + jq_selector + " " + property + " to equal " + expected + ", but got " + style + " instead.");
        result = result && false;
      }
    });

    return result;
  };

  // Return Accessor
  return _cactus;

})();
