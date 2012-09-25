describe("Cactus", function() {

  var expectation;

  describe("expect", function() {
    beforeEach(function() {
      expectation = Cactus.expect("label", "text-align");
    });

    it("returns cactus object for chaining", function() {
      expect(expectation).toBe(Cactus);
    });

    it("sets variables", function() {
      var debug = expectation.debug();
      expect(debug.tag_name).toEqual("label");
      expect(debug.property).toEqual("text-align");
      expect(debug.styles).toBeDefined(["right", "right"]);
    });
  });

  describe("matchers", function() {
    beforeEach(function() {
      spyOn(CactusReport, "render");
    });

    describe("toEqual", function() {
      it("returns true when result is true for all matched elements", function() {
        var result = Cactus.expect("label", "text-align").toEqual("right");
        expect(result).toBe(true);
      });

      it("returns false when result is false for one of the matched elements", function() {
        // Setup
        $("label:first").css("text-align", "left");

        var result = Cactus.expect("label", "text-align").toEqual("left");
        expect(result).toBe(false);

        // Reset
        $("label:first").css("text-align", "right");
      });

    describe("toBeGreaterThan", function() {
      beforeEach(function() {
        $("label").css("font-size", "12px");
      });

      it("returns true when result is true for all matched elements", function() {
        var result = Cactus.expect("label", "font-size").toBeGreaterThan("10px");
        expect(result).toBe(true);
      });

      it("returns false when result is false for one of the matched elements", function() {
        // Setup
        $("label:first").css("font-size", "9px");

        var result = Cactus.expect("label", "font-size").toBeGreaterThan("10px");
        expect(result).toBe(false);

        // Reset
        $("label").css("font-size", "12px");
      });
    });
    });

    describe("toContain", function() {
      it("returns true when result is true for all matched elements", function() {
        var result = Cactus.expect("label", "text-align").toContain("righ");
        expect(result).toBe(true);
      });

      it("returns false when result is false for one of the matched elements", function() {
        // Setup
        $("label:first").css("text-align", "left");

        var result = Cactus.expect("label", "text-align").toContain("lef");
        expect(result).toBe(false);

        // Reset
        $("label:first").css("text-align", "right");
      });
    });

    describe("allSidedTests", function() {
      it("works for toHavePadding", function() {
        $(".jasmine_reporter").css("padding", "10px");

        var result = Cactus.expect(".jasmine_reporter").toHavePadding("10px");
        expect(result).toBe(true);
      });

      it("works for toHaveMargin", function() {
        $(".jasmine_reporter").css("margin", "10px 20px");

        var result = Cactus.expect(".jasmine_reporter").toHaveMargin("10px 20px");
        expect(result).toBe(true);
      });

      describe("border", function() {
        beforeEach(function() {
          $(".jasmine_reporter").css("border-top"   , "1px solid red");
          $(".jasmine_reporter").css("border-right" , "2px solid red");
          $(".jasmine_reporter").css("border-bottom", "3px solid red");
          $(".jasmine_reporter").css("border-left"  , "4px solid red");
        });

        it("works for toHaveBorderWidth", function() {
          var result = Cactus.expect(".jasmine_reporter").toHaveBorderWidth("1px 2px 3px 4px");
          expect(result).toBe(true);
        });

        it("works for toHaveBorderColor", function() {
          var result = Cactus.expect(".jasmine_reporter").toHaveBorderColor("#FF0000");
          expect(result).toBe(true);
        });
      });
    });

    describe("toHaveColor", function() {
      it("returns true when result is true for all matched elements (case insensitive)", function() {
        var result = Cactus.expect("label", "color").toHaveColor("#330033");
        expect(result).toBe(true);
      });

      it("returns false when result is false for one of the matched elements", function() {
        // Setup
        $("label:first").css("color", "#000000");

        var result = Cactus.expect("label", "color").toHaveColor("#000000");
        expect(result).toBe(false);

        // Reset
        $("label:first").css("color", "#330033");
      });
    });

    describe("skip", function() {
      it("returns 'skip' when tag is not found", function() {
        var result = Cactus.expect("#not_found", "display").toEqual("block");
        expect(result).toEqual("skip");
      });
    });
  });

});
