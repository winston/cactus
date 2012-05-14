# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)

require "cactus/version"

Gem::Specification.new do |s|
  s.name        = "cactus"
  s.version     = Cactus::VERSION
  s.authors     = ["Winston Teo"]
  s.email       = ["winston@newcontext.com"]
  s.homepage    = "https://github.com/winston/cactus"
  s.summary     = %q{Cactus is a CSS testing framework}
  s.description = %q{Designs can be tested too. Cactus is a CSS testing framework. It ensures that you always have the same CSS styling for DOM elements that you care about.}

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.add_dependency "rails"        , ">= 3.2.0"
  s.add_dependency "jquery-rails" , ">= 2.0.1"

  s.add_development_dependency "rspec"
  s.add_development_dependency "jasmine"
end
