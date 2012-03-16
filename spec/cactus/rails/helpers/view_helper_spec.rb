require 'spec_helper'

describe ApplicationController do

  describe "cactus" do
    let(:controller) { ApplicationController.new }
    let(:html)       { controller.cactus }

    it "has method" do
      ApplicationController.instance_methods.should include :cactus
    end

    it "includes method in corresponding helper" do
      ApplicationController.helpers.methods.should  include :cactus
    end

    context "rendering" do
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

    context "environment" do
      it "production renders nothing" do
        ::Rails.should_receive(:env).any_number_of_times.and_return(ActiveSupport::StringInquirer.new("production"))
        html.should be_blank
      end

      it "any other renders nothing" do
        ::Rails.should_receive(:env).any_number_of_times.and_return(ActiveSupport::StringInquirer.new("staging"))
        html.should be_blank
      end

      it "test renders something" do
        ::Rails.should_receive(:env).any_number_of_times.and_return(ActiveSupport::StringInquirer.new("test"))
        html.should_not be_blank
      end

      it "development renders something" do
        ::Rails.should_receive(:env).any_number_of_times.and_return(ActiveSupport::StringInquirer.new("development"))
        html.should_not be_blank
      end
    end
  end

end
