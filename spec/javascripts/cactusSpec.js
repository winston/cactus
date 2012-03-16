describe("cactus", function() {

  describe("expect", function() {
    var expectation;

    beforeEach(function() {
      expectation = cactus.expect("div", "display");
    });

    it("returns cactus object for chaining", function() {
      expect(expectation).toBe(cactus);
    });

    it("sets variables", function() {
      var debug = expectation.debug();
      expect(debug.target_element).toEqual("div");
      expect(debug.css_attribute).toEqual("display");
      expect(debug.computed_style).toBeDefined();
    });
  });

  describe("matchers", function() {
    describe("toEqual", function() {
      it("is equal", function() {
        var expectation = cactus.expect("div", "display");
        var result = expectation.toEqual("block");

        expect(result).toBeTruthy();
      });

      it("is not equal", function() {
        var expectation = cactus.expect("div", "display");
        var result = expectation.toEqual("none");

        expect(result).toBeFalsy();
      });
    });

    describe("toHaveColor", function() {
      it("is equal (case insensitive)", function() {
        var expectation = cactus.expect(".banner", "background-color");
        var result = expectation.toHaveColor("#FFEEFF");

        expect(result).toBeTruthy();
      });

      it("is not equal", function() {
        var expectation = cactus.expect(".banner", "background-color");
        var result = expectation.toHaveColor("#000000");

        expect(result).toBeFalsy();
      });
    });

  });

});
