var cactus = (function() {

  var target_element = null;
  var css_attribute  = null;
  var computed_style = null;

  function expect(elem, attr) {
    target_element = elem;
    css_attribute  = attr
    computed_style = $(target_element).css(css_attribute);

    return this;
  }

  function debug() {
    return { target_element: target_element, css_attribute: css_attribute, computed_style: computed_style };
  }

  function expectationResult(computed, expected) {
    if(computed !== expected) {
      console.log("Expected " + target_element + ":" + css_attribute + " to equal " + expected + ", got " + computed + " instead." );
      return false;
    } else {
      return true;
    }
  }

  function toEqual(expected_style) {
    return expectationResult(computed_style, expected_style)
  }

  function toHaveColor(expected_style) {

    // Source: http://stackoverflow.com/questions/1740700/get-hex-value-rather-than-rgb-value-using-jquery
    function rgb2hex(rgb) {
      rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);

      function hex(x) { return ("0" + parseInt(x).toString(16)).slice(-2); }
      return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    computed = rgb2hex(computed_style).toLowerCase();
    expected = expected_style.toLowerCase();

    return expectationResult(computed, expected);
  }

  return {
    expect      : expect,
    debug       : debug,
    toEqual     : toEqual,
    toHaveColor : toHaveColor
  };

})();
