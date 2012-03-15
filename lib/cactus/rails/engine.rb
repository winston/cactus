require "#{File.dirname(__FILE__)}/helpers/view_helper"

module Cactus
  module Rails
    class Engine < ::Rails::Engine
      initializer "cactus" do
        ActiveSupport.on_load(:action_controller) do
          include Cactus::Rails::ViewHelper
        end
      end
    end
  end
end
