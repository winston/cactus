require "cactus/version"

# Rails Helper
lib_path = File.dirname(__FILE__)
require "#{lib_path}/cactus/rails/engine.rb" if defined?(Rails)
