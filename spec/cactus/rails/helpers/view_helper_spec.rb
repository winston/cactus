require 'spec_helper'

describe ApplicationController do

  describe "cactus" do
    it "has method" do
      ApplicationController.instance_methods.should include :cactus
    end

    it "includes method in corresponding helper" do
      ApplicationController.helpers.methods.should  include :cactus
    end

    context "rendering" do
      let(:controller) { ApplicationController.new }
      let(:html)       { controller.cactus }

      it "renders cactus.js" do
        html.should =~ /cactus.js/i
      end

      it "renders *spec.js files located in public/cactus_spec" do
        html.should_not =~ /spec\/dummy\/public/i

        html.should =~ /cactus_spec\/css1_spec.js/i
        html.should =~ /cactus_spec\/css2_spec.js/i

        html.should_not =~ /notcss.js/i
      end
    end
  end

end
