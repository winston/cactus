describe("CactusReport", function() {

  describe("displays Cactus feedback in div#cactus", function() {
    beforeEach(function() {
      $("#cactus").remove();
    });
    afterEach(function() {
      $("#cactus").remove();
    });

    describe("all tests passed", function() {
      beforeEach(function() {
        CactusReport.render(true, "test 1 passed");
      });

      it("only shows toggle for passes", function() {
        expect($(".cactus_toggle_pass").is(":visible")).toBe(true);
        expect($(".cactus_toggle_fail").is(":visible")).toBe(false);
        expect($(".cactus_toggle_skip").is(":visible")).toBe(false);
      });
    });

    describe("all tests failed", function() {
      beforeEach(function() {
        CactusReport.render(false, "test 1 failed");
      });

      it("only shows toggle for failures", function() {
        expect($(".cactus_toggle_pass").is(":visible")).toBe(false);
        expect($(".cactus_toggle_fail").is(":visible")).toBe(true);
        expect($(".cactus_toggle_skip").is(":visible")).toBe(false);
      });
    });

    describe("all tests skipped", function() {
      beforeEach(function() {
        CactusReport.render("skip", "test 1 skipped");
      });

      it("only shows toggle for skips", function() {
        expect($(".cactus_toggle_pass").is(":visible")).toBe(false);
        expect($(".cactus_toggle_fail").is(":visible")).toBe(false);
        expect($(".cactus_toggle_skip").is(":visible")).toBe(true);
      });
    });

    describe("some tests passed, some tests failed, some tests skipped", function() {
      beforeEach(function() {
        CactusReport.render(true  , "test 1 passed");
        CactusReport.render(false , "test 2 failed");
        CactusReport.render("skip", "test 3 skipped");
      });

      it("displays div#cactus", function() {
        expect($("#cactus").is(":visible")).toBe(true);
      });

      it("contains 1 pass, 1 failure and 1 skip", function() {
        expect($("#cactus .cactus_pass").length).toEqual(1);
        expect($("#cactus .cactus_fail").length).toEqual(1);
        expect($("#cactus .cactus_skip").length).toEqual(1);
      });

      it("shows toggles for passes, failures and skips", function() {
        expect($(".cactus_toggle_pass").is(":visible")).toBe(true);
        expect($(".cactus_toggle_fail").is(":visible")).toBe(true);
        expect($(".cactus_toggle_skip").is(":visible")).toBe(true);
      });
    });

    describe("passes are hidden by default", function() {
      beforeEach(function() {
        CactusReport.render(true , "test 1 passed");
      });

      it("is hidden", function() {
        expect($("#cactus .cactus_pass").is(":visible")).toBe(false);
      });

      it("is shown when clicked on 'Show Passes'", function() {
        $(".cactus_toggle_pass").click();
        expect($("#cactus .cactus_pass").is(":visible")).toBe(true);
      })
    });

    describe("skips are hidden by default", function() {
      beforeEach(function() {
        CactusReport.render("skip" , "test 1 skipped");
      });

      it("is hidden", function() {
        expect($("#cactus .cactus_skip").is(":visible")).toBe(false);
      });

      it("is shown when clicked on 'Show Skips'", function() {
        $(".cactus_toggle_skip").click();
        expect($("#cactus .cactus_skip").is(":visible")).toBe(true);
      })
    });

    describe("failures are shown by default", function() {
      beforeEach(function() {
        CactusReport.render(false, "test 1 failed");
      });

      it("is shown", function() {
        expect($("#cactus .cactus_fail").is(":visible")).toBe(true);
      });

      it("is shown when clicked on 'Show Passes'", function() {
        $(".cactus_toggle_fail").click();
        expect($("#cactus .cactus_fail").is(":visible")).toBe(false);
      })
    });
  });

});
