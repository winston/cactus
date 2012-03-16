describe("cactus", function() {

  var expectation;

  describe("css verification for one element", function() {
    describe("expect", function() {
      beforeEach(function() {
        expectation = cactus.expect(".banner", "display");
      });

      it("returns cactus object for chaining", function() {
        expect(expectation).toBe(cactus);
      });

      it("sets variables", function() {
        var debug = expectation.debug();
        expect(debug.tag_name).toEqual(".banner");
        expect(debug.property).toEqual("display");
        expect(debug.styles).toEqual(["block"]);
      });
    });

    describe("matchers", function() {
      describe("toEqual", function() {
        beforeEach(function() {
          expectation = cactus.expect(".banner", "display");
        });

        it("is equal", function() {
          var result = expectation.toEqual("block");
          expect(result).toBeTruthy();
        });

        it("is not equal", function() {
          var result = expectation.toEqual("none");
          expect(result).toBeFalsy();
        });
      });

      describe("toContain", function() {
        beforeEach(function() {
          expectation = cactus.expect(".banner", "display");
        });

        it("is equal", function() {
          var result = expectation.toContain("blo");
          expect(result).toBeTruthy();
        });

        it("is not equal", function() {
          var result = expectation.toContain("non");
          expect(result).toBeFalsy();
        });
      });

      describe("toHaveColor", function() {
        beforeEach(function() {
          expectation = cactus.expect(".banner", "background-color");
        });

        it("is equal (case insensitive)", function() {
          var result = expectation.toHaveColor("#FFEEFF");
          expect(result).toBeTruthy();
        });

        it("is not equal", function() {
          var result = expectation.toHaveColor("#000000");
          expect(result).toBeFalsy();
        });
      });
    });
  });

  describe("css verification for all elements", function() {
    describe("expectEvery", function() {
      beforeEach(function() {
        expectation = cactus.expectEvery("label", "text-align");
      });

      it("returns cactus object for chaining", function() {
        expect(expectation).toBe(cactus);
      });

      it("sets variables", function() {
        var debug = expectation.debug();
        expect(debug.tag_name).toEqual("label");
        expect(debug.property).toEqual("text-align");
        expect(debug.styles).toBeDefined(["right", "right"]);
      });
    });

    describe("matchers", function() {
      describe("toEqual", function() {
        beforeEach(function() {
          expectation = cactus.expectEvery("label", "text-align");
        });

        it("is equal", function() {
          var result = expectation.toEqual("right");
          expect(result).toBeTruthy();
        });

        it("is not equal", function() {
          var result = expectation.toEqual("left");
          expect(result).toBeFalsy();
        });
      });

      describe("toContain", function() {
        beforeEach(function() {
          expectation = cactus.expect("label", "text-align");
        });

        it("is equal", function() {
          var result = expectation.toContain("righ");
          expect(result).toBeTruthy();
        });

        it("is not equal", function() {
          var result = expectation.toContain("lef");
          expect(result).toBeFalsy();
        });
      });

      describe("toHaveColor", function() {
        beforeEach(function() {
          expectation = cactus.expectEvery("label", "color");
        });

        it("is equal (case insensitive)", function() {
          var result = expectation.toHaveColor("#330033");
          expect(result).toBeTruthy();
        });

        it("is not equal", function() {
          var result = expectation.toHaveColor("#000000");
          expect(result).toBeFalsy();
        });
      });
    });
  });

});
