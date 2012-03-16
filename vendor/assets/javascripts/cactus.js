var cactus = {};

cactus.expect = function(dom, att) {
  var dom = dom;
  var att = att;
  var css = $(dom).css(att);

  return {
    toEqual: function(expected) {
      if(css !== expected) {
        console.log("Expected " + dom + ":" + att + " to equal " + expected + " but got " + css + " instead." );
      }
    }
  }
};
