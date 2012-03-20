describe("CactusReport", function() {

  describe("displays Cactus feedback in div#cactus", function() {
    beforeEach(function() {
      CactusReport.reset();
    });
    afterEach(function() {
      CactusReport.reset();
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

    describe("stats", function() {
      it("keeps a count of total specs", function() {
        CactusReport.render(true, "1 test passed");
        expect($(".cactus_stats").html()).toMatch("1 spec");

        CactusReport.render(true, "1 test passed");
        expect($(".cactus_stats").html()).toMatch("2 specs");
      });

      it("increments fail when test fails", function() {
        CactusReport.render(false, "1 test failed");
        expect($(".cactus_stats").html()).toMatch("1 failure") ;

        CactusReport.render(false, "2 test failed");
        expect($(".cactus_stats").html()).toMatch("2 failures") ;
      });
    });
  });

});
