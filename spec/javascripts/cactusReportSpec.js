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

      it("hides toggle for failures", function() {
        expect($(".cactus_toggle_pass").is(":visible")).toBeTruthy();
        expect($(".cactus_toggle_fail").is(":visible")).toBeFalsy();
      });
    });

    describe("all tests failed", function() {
      beforeEach(function() {
        CactusReport.render(false, "test 1 failed");
      });

      it("hides toggle for passes", function() {
        expect($(".cactus_toggle_pass").is(":visible")).toBeFalsy();
        expect($(".cactus_toggle_fail").is(":visible")).toBeTruthy();
      });
    });

    describe("some tests passed, some tests failed", function() {
      beforeEach(function() {
        CactusReport.render(true , "test 1 passed");
        CactusReport.render(false, "test 2 failed");
      });

      it("displays div#cactus", function() {
        expect($("#cactus").is(":visible")).toBeTruthy();
      });

      it("contains 1 pass and 1 failure", function() {
        expect($("#cactus .cactus_pass").length).toEqual(1);
        expect($("#cactus .cactus_fail").length).toEqual(1);
      });

      it("shows toggles for passes and failures", function() {
        expect($(".cactus_toggle_pass").is(":visible")).toBeTruthy();
        expect($(".cactus_toggle_fail").is(":visible")).toBeTruthy();
      });
    });

    describe("passes are hidden by default", function() {
      beforeEach(function() {
        CactusReport.render(true , "test 1 passed");
      });

      it("is hidden", function() {
        expect($("#cactus .cactus_pass").is(":visible")).toBeFalsy();
      });

      it("is shown when clicked on 'Show Passes'", function() {
        $(".cactus_toggle_pass").click();
        expect($("#cactus .cactus_pass").is(":visible")).toBeTruthy();
      })
    });

    describe("failures are shown by default", function() {
      beforeEach(function() {
        CactusReport.render(false, "test 1 failed");
      });

      it("is shown", function() {
        expect($("#cactus .cactus_fail").is(":visible")).toBeTruthy();
      });

      it("is shown when clicked on 'Show Passes'", function() {
        $(".cactus_toggle_fail").click();
        expect($("#cactus .cactus_fail").is(":visible")).toBeFalsy();
      })
    });
  });

});
