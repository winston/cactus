#!/bin/bash

# RVM
source ~/.rvm/scripts/rvm && source .rvmrc

# Install bundler 
gem list --local bundler | grep bundler || gem install bundler || exit 1

# Debugging Info
echo USER=$USER && ruby --version && which ruby && which bundle

# Install project gems from Gemfile
bundle check || bundle install || exit 1

# Test!
bundle exec rake && bundle exec rake jasmine:ci
