module Cactus
  module Rails
    module ViewHelper
      extend ActiveSupport::Concern

      included do
        helper_method "cactus"
      end

      def cactus
        html  = "<script src='/assets/cactus.js' type='text/javascript'></script>"
        html += "<script src='/cactus_specs/spec.js' type='text/javascript'></script>"
        html.html_safe
      end
    end
  end
end
