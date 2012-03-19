var Cactus, CactusReport;

Cactus = (function() {
  // http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
  "use strict";

  // Private Variables
  var _cactus  = {};
  var tag_name = null;
  var property = null;
  var styles   = null;

  // Public Methods

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
    property  = attr;
    styles    = [ $(tag_name).css(property) ];

    return this;
  };

  _cactus.expectEvery = function(elem, attr) {
    tag_name  = elem;
    property  = attr;
    styles    = $.map( $(tag_name), function(elem, i) { return $(elem).css(property);  } );

    return this;
  };

  // Matchers
  _cactus.toEqual = function(expected_style) {
    return compare(styles, expected_style, function(x, y) { return x === y; });
  };

  _cactus.toContain = function(expected_style) {
    return compare(styles, expected_style, function(x, y) { return x.match(y); });
  };

  _cactus.toHaveColor = function(expected_style) {
    // Source: http://stackoverflow.com/questions/1740700/get-hex-value-rather-than-rgb-value-using-jquery
    function rgb2hex(rgb) {
      function hex(x) { return ("0" + parseInt(x, 10).toString(16)).slice(-2); }

      rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
      return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
    styles = $.map( styles, function(style, i) { return rgb2hex(style); } );

    return _cactus.toEqual(expected_style.toLowerCase());
  };

  // Private Methods

  function compare(computed, expected, comparator) {
    var result = true;

    $.each(computed, function(index, style) {
      var status  = comparator(style, expected);
      var message = "Expected" + " $('" + tag_name + "')" + "[" + index + "] " + property + " to equal " + expected + ". Got " + style + ".";

      result = result && status;

      // Print result on page
      CactusReport.render(status, message);
    });

    return result;
  }

  // Return Accessor
  return _cactus;

}());

CactusReport = (function() {
  // http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
  "use strict";

  // Private Variables
  var _cactus_report = {};

  _cactus_report.render = function(status, message) {
    var $html, $row;

    $html = init_container();

    $row  = $(
      "<div />",
      {
        html: message,
        css : { "padding": "5px 10px", "border-bottom": "1px solid #d3d3d3" }
      }
    );
    if(status) {
      $row.addClass("cactus_pass");
      $row.css( { "display": "none", "background": "#93cd67" } );
    } else {
      $row.addClass("cactus_fail");
      $row.css( { "background": "#f6704d" } );
    }

    $html.append($row);

    // Show toggles
    if ($(".cactus_pass").length > 0) { $(".cactus_toggle_pass").show(); }
    if ($(".cactus_fail").length > 0) { $(".cactus_toggle_fail").show(); }
  };

  // Private Methods

  function init_container() {
    var $html = $("#cactus");

    if ($html.length === 0) {
      // Create a new div#cactus
      $html = $("<div id='cactus'><div class='cactus_header'><div class='cactus_banner'>Cactus</div><div class='cactus_option'><a href='#' class='cactus_toggle_pass' style='display: none;'>Show Passes</a> <a href='#' class='cactus_toggle_fail' style='display: none;'>Hide Failures</a></div></div></div>");

      // Setup CSS stylings
      $html.css( { "position": "absolute", "width": "100%", "bottom": 0, "left": 0, "font-size": "12px" } );
      $html.find(".cactus_header").css( { "display": "block", "margin": "10px 0 0", "padding": "10px", "background": "#faebd7", "overflow": "hidden" } );
      $html.find(".cactus_banner").css( { "display": "block", "float": "left" , "font-size": "28px", "font-weight": "bold" } );
      $html.find(".cactus_option").css( { "display": "block", "float": "right", "font-size": "12px", "font-weight": "bold" } );

      // Append to body
      $("body").append($html);

      // Setup options
      show_and_hide_pass();
      show_and_hide_fail();
    }

    return $html;
  }

  function show_and_hide_pass() {
    $(".cactus_toggle_pass").toggle(
      function() {
        $(this).html("Hide Passes");
        $(".cactus_pass").show();
      },
      function() {
        $(this).html("Show Passes");
        $(".cactus_pass").hide();
      }
    );
  }

  function show_and_hide_fail() {
    $(".cactus_toggle_fail").toggle(
      function() {
        $(this).html("Show Failures");
        $(".cactus_fail").hide();
      },
      function() {
        $(this).html("Hide Failures");
        $(".cactus_fail").show();
      }
    );
  }

  // Return Accessor
  return _cactus_report;

}());
