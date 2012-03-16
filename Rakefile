require "bundler/gem_tasks"
Bundler::GemHelper.install_tasks # Gives us rake build, rake install and rake release

# RSpec Tasks
require 'rspec/core/rake_task'

RSpec::Core::RakeTask.new(:spec) do |t|
  t.rspec_opts = ['--options', '.rspec']
end

task :default => :spec
