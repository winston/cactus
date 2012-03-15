# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)

require "cactus/version"

Gem::Specification.new do |s|
  s.name        = "cactus"
  s.version     = Cactus::VERSION
  s.authors     = ["Winston Teo Yong Wei"]
  s.email       = ["winston@newcontext.com"]
  s.homepage    = ""
  s.summary     = %q{CSS BDD framework}
  s.description = %q{Test your CSS}

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  # s.add_development_dependency "rspec"
end
