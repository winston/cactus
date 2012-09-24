var Cactus, CactusReport;

Cactus = (function() {
  // http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
  "use strict";

  // Module Accessor
  var _cactus  = {};

  // Private Variables
  var tag_name, property, styles;

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
    if (attr !== undefined) {
      property = attr;
      styles   = $.map( $(tag_name), function(elem, i) { return $(elem).css(property);  } );
    }

    return this;
  };

  // Matchers
  _cactus.toEqual = function(expected_style) {
    return compare(styles, expected_style, function(x, y) { return x === y; });
  };

  _cactus.toBeGreaterThan = function(expected_style) {
    return compare(styles, expected_style, function(x, y) { return parseInt(x) > parseInt(y); }, "exceed");
  };

  _cactus.toContain = function(expected_style) {
    return compare(styles, expected_style, function(x, y) { return x.match(y) ? true : false; });
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

  _cactus.toHaveMargin = function(expected_style) {
    var style_name = function(side) { return "margin-" + side };
    return allSidedTests(style_name, expected_style);
  };

  _cactus.toHavePadding = function(expected_style) {
    var style_name = function(side) { return "padding-" + side };
    return allSidedTests(style_name, expected_style);
  };

  _cactus.toHaveBorderWidth = function(expected_style) {
    var style_name = function(side) { return "border-" + side + "-width" };
    return allSidedTests(style_name, expected_style);
  };

  _cactus.toHaveBorderColor = function(expected_style) {
    var result   = true;
    var longhand = shorthand2longhand(expected_style);

    $.each(["top", "right", "bottom", "left"], function(index, side) {
      result = result && _cactus.expect(tag_name, "border-" + side + "-color").toHaveColor(longhand[index]);
    });

    return result;
  };

  // Private Methods

  function selector(index) {
    var str = "$('" + tag_name + "')";
    if (index >=0) { str += "[" + index + "]"; }
    return str;
  }

  function compare(computed, expected, comparator, operation) {
    var result = true, status, message;

    if ($(tag_name).is("*")) {
      $.each(computed, function(index, style) {
        status  = comparator(style, expected);
        message = "Expected " + selector(index) + " " + property + " to " + (operation ? operation : "equal") + " " + expected + ". Got " + style + ".";

        result = result && status;

        // Print result on page
        CactusReport.render(status, message);
      });
    } else {
      status  = "skip";
      message = "Expected " + selector() + " " + property + " to " + (operation ? operation : "equal") + " " + expected + ".";

      result = status;

      // Print result on page
      CactusReport.render(status, message);
    }

    return result;
  }

  function shorthand2longhand(style) {
    var shorthand = style.split(/\s/), longhand;

    switch(shorthand.length) {
      case 1:
        longhand = [shorthand[0], shorthand[0], shorthand[0], shorthand[0]];
        break;
      case 2:
        longhand = [shorthand[0], shorthand[1], shorthand[0], shorthand[1]];
        break;
      case 3:
        longhand = [shorthand[0], shorthand[1], shorthand[2], shorthand[1]];
        break;
      case 4:
        longhand = [shorthand[0], shorthand[1], shorthand[2], shorthand[3]];
        break;
    }

    return longhand;
  }

  function allSidedTests(style_name, expected_style) {
    var result   = true;
    var longhand = shorthand2longhand(expected_style);

    $.each(["top", "right", "bottom", "left"], function(index, side) {
      result = result && _cactus.expect(tag_name, style_name(side)).toEqual(longhand[index]);
    });

    return result;
  }

  // Return Accessor
  return _cactus;

}());

CactusReport = (function() {
  // http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
  "use strict";

  // Module Accessor
  var _cactus_report = {};

  // Private Variables
  var status_stats   = { spec: 0, failure: 0 };
  var status_types   =
  {
    false : { type: "fail", noun: "Failures" },
    true  : { type: "pass", noun: "Passes"   },
    skip  : { type: "skip", noun: "Skips"    }
  };
  var status_styles  =
  {
    false : { class: "cactus_fail", css: { "background": "#f6704d" } },
    true  : { class: "cactus_pass", css: { "display": "none", "background": "#93cd67" } },
    skip  : { class: "cactus_skip", css: { "display": "none", "background": "#f0e68c" } }
  };

  // Reset
  _cactus_report.reset  = function() {
    status_stats   = { spec: 0, failure: 0 };
    $("#cactus").remove();
  };

  // Render
  _cactus_report.render = function(status, message) {
    var $html, $row;

    // Init/Find #cactus
    $html = init_container();

    // Create row
    $row  = $(
      "<div />",
      {
        html : message,
        class: status_styles[status]["class"],
        css  : $.extend( { "padding": "5px 10px", "border-bottom": "1px solid #d3d3d3" }, status_styles[status]["css"] )
      }
    );
    $html.append($row);

    // Update Stats
    show_stats(status);

    // Show toggles
    show_toggle(status_types[status]["type"]);

  };

  // Private Methods

  function init_container() {
    var $html = $("#cactus");

    if ($html.length === 0) {
      // Create a new div#cactus
      $html = $(
        "<div id='cactus'>" +
          "<div class='cactus_header'>" +
            "<div class='cactus_title'>Cactus</div>" +
            "<div class='cactus_stats'></div>" +
            "<div class='cactus_links'>" +
              "<a href='#' class='cactus_toggle_fail' style='display: none;'>Hide Failures</a> " +
              "<a href='#' class='cactus_toggle_pass' style='display: none;'>Show Passes</a>   " +
              "<a href='#' class='cactus_toggle_skip' style='display: none;'>Show Skips</a>    " +
            "</div>" +
          "</div>" +
        "</div>"
      );

      // Append to body
      $("body").append($html);

      // Setup CSS stylings
      $html.css( { "position": "absolute", "height": "0", "width": "100%", "bottom": "0", left: "0", "font-size": "12px" } );
      $html.find(".cactus_header").css( { "display": "block", "padding": "10px", "background": "#faebd7", "overflow": "hidden" } );
      $html.find(".cactus_title").css( { "display": "inline-block", "font-size": "16px", "font-weight": "600", "padding": "0 10px 0 0" } );
      $html.find(".cactus_stats").css( { "display": "inline-block", "font-size": "12px", "font-weight": "200" } );
      $html.find(".cactus_links").css( { "display": "block", "float": "right", "font-size": "12px", "font-weight": "600" } );

      // Setup options
      $.each(status_types, function(key, value) { init_toggle(value["type"], value["noun"]); });
    }

    return $html;
  }

  function init_toggle(type, noun) {
    $(".cactus_toggle_" + type).click(
      function() {
        var $selector = $(".cactus_" + type);
        if ($selector.is(":visible")) {
          $(this).html("Show " + noun);
          $selector.hide();
        } else {
          $(this).html("Hide " + noun);
          $selector.show();
        }
      }
    )
  }

  function show_stats(status) {
    // Increment Stats
    status_stats["spec"] += 1;
    if (!status) { status_stats["failure"] += 1; }

    // Render Stats
    function pluralize(num, word) { return num == 1 ? num + " " + word : num + " " + word + "s"; }

    var $html = $(".cactus_stats");
    var stats = pluralize(status_stats["spec"], "spec") + ", " + pluralize(status_stats["failure"], "failure");

    $html.html(stats);
  }

  function show_toggle(type) {
    var $link, $rows;

    $link = $(".cactus_toggle_" + type);
    $rows = $(".cactus_" + type);

    if (!$link.is(":visible") && $rows.length > 0) {
      $link.show();
    }
  }

  // Return Accessor
  return _cactus_report;

}());
