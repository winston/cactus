module Cactus
  module Rails
    module ViewHelper
      extend  ActiveSupport::Concern

      included do
        helper_method "cactus"
      end

      def cactus
        html  = "<script src='/assets/cactus.js' type='text/javascript'></script>"

        dir   = "#{::Rails.root}/public"
        specs = Dir[File.join(dir, "/cactus_spec", "/*spec.js")]
        specs.each do |file|
          filename = file[-(file.size - dir.size)..-1]

          html += "<script src='#{filename}' type='text/javascript'></script>"
        end

        html.html_safe
      end
    end
  end
end
