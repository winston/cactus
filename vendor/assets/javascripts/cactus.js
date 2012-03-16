var cactus = (function() {

  var tag_name = null;
  var property = null;
  var styles   = null;

  function debug() {
    return {
      tag_name  : tag_name,
      property  : property,
      styles    : styles
    };
  }

  function expect(elem, attr) {
    tag_name  = elem;
    property  = attr
    styles    = [ $(tag_name).css(property) ];

    return this;
  }

  function expectEvery(elem, attr) {
    tag_name  = elem;
    property  = attr
    styles    = $.map( $(tag_name), function(elem, i) { return $(elem).css(property);  } );

    return this;
  }

  function expectationResult(computed, expected) {
    var result = true;
    $.each(computed, function(index, style) {
      if(style !== expected) {
        jq_selector = "$('" + tag_name + "')" + "[" + index + "]";
        console.log("Cactus expected " + jq_selector + " " + property + " to equal " + expected + ", but got " + style + " instead.");

        result = result && false;
      }
    });

    return result;
  }

  function toEqual(expected_style) {
    return expectationResult(styles, expected_style);
  }

  function toHaveColor(expected_style) {

    // Source: http://stackoverflow.com/questions/1740700/get-hex-value-rather-than-rgb-value-using-jquery
    function rgb2hex(rgb) {
      function hex(x) { return ("0" + parseInt(x).toString(16)).slice(-2); }

      rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
      return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    computed = $.map( styles, function(style, i) { return rgb2hex(style).toLowerCase(); } );
    expected = expected_style.toLowerCase();

    return expectationResult(computed, expected);
  }

  return {
    debug       : debug,
    expect      : expect,
    expectEvery : expectEvery,
    toEqual     : toEqual,
    toHaveColor : toHaveColor
  };

})();
