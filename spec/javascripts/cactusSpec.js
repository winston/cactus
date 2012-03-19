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
      afterEach(function() {
        $("label:first").css("text-align", "right");
      });

      it("returns true when result is true for all matched elements", function() {
        var result = Cactus.expect("label", "text-align").toEqual("right");
        expect(result).toBeTruthy();
      });

      it("returns false when result is false for one of the matched elements", function() {
        $("label:first").css("text-align", "left");
        var result = Cactus.expect("label", "text-align").toEqual("left");
        expect(result).toBeFalsy();
      });
    });

    describe("toContain", function() {
      afterEach(function() {
        $("label:first").css("text-align", "right");
      });

      it("returns true when result is true for all matched elements", function() {
        var result = Cactus.expect("label", "text-align").toContain("righ");
        expect(result).toBeTruthy();
      });

      it("returns false when result is false for one of the matched elements", function() {
        $("label:first").css("text-align", "left");
        var result = Cactus.expect("label", "text-align").toContain("lef");
        expect(result).toBeFalsy();
      });
    });

    describe("toHaveColor", function() {
      afterEach(function() {
        $("label:first").css("color", "#330033");
      });

      it("returns true when result is true for all matched elements (case insensitive)", function() {
        var result = Cactus.expect("label", "color").toHaveColor("#330033");
        expect(result).toBeTruthy();
      });

      it("returns false when result is false for one of the matched elements", function() {
        $("label:first").css("color", "#000000");
        var result = Cactus.expect("label", "color").toHaveColor("#000000");
        expect(result).toBeFalsy();
      });
    });
  });

});
