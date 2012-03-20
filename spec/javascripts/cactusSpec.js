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
