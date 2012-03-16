var cactus = (function() {

  var target_element = null;
  var css_attribute  = null;
  var computed_style = null;

  function debug() {
    return { target_element: target_element, css_attribute: css_attribute, computed_style: computed_style };
  }

  function expect(elem, attr) {
    target_element = elem;
    css_attribute  = attr
    computed_style = $(target_element).css(css_attribute);

    return this;
  }

  function toEqual(expected) {
    if(computed_style !== expected) {
      console.log("Expected " + target_element + ":" + css_attribute + " to equal " + expected + ", got " + computed_style + " instead." );
    } else {
      return true;
    }
  }

  return {
    debug  : debug,
    expect : expect,
    toEqual: toEqual
  };

})();
