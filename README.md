# Cactus

[![Build Status](https://secure.travis-ci.org/winston/cactus.png?branch=master)](http://travis-ci.org/winston/cactus)

Designs can be tested too ([you should read the slides](https://speakerdeck.com/u/winston/p/wah-lau-css-can-be-tested-too))! Cactus is a proof of concept for a CSS testing framework.

It ensures that you always have the same CSS styling for DOM elements that you care about.

## Prerequisites

- Ruby on Rails, 3.2.x
- jquery-rails

## Installation

Install the Cactus gem manually or include it in your Rails Gemfile.

    gem install cactus

Add jQuery to application.js (or any manifest file)

    //= require jquery

Add the Cactus helper in your application layout, just before the `body` closing tag (assuming haml).

    = cactus

Finally, add some CSS specs (written in JavaScript) in `public/cactus_spec`. Files need to end with spec.js.

```javascript
Cactus.expect(".header", "font-size").toEqual("24px");
Cactus.expect("p", "font-size").toEqual("12px");
```
## A Brief Explanation

The Cactus helper in your application layout includes Cactus.js and all spec files located in `public/cactus_spec/` on every page load in the Dev and Test env; the helper will not output anything when in other (Prod, Staging etc) environments.

Once the files are included, the specs will be verified against the current page DOM, and results will be displayed.

## Writing Specs

Write your specs in JavaScript, and place them in the `public/cactus_spec/` folder.

### Expectations

You can make an expectation either on a specific element or a group of elements.

#### `expect`
```javascript
Cactus.expect(".header", "font-size").toEqual("24px");
```
The `expect` method requires a tag name and an attribute. All elements that resolve to the tag name will be tested.

### Matchers

The expectations are chained to matchers for verification of CSS styling.

#### `toEqual`
```javascript
Cactus.expect(".header", "font-size").toEqual("24px");
```
This tests for total equality.

#### `toContain`
```javascript
Cactus.expect(".header", "font-family").toContain("Helvetica");
```
This tests for partial equality, using a REGEX constructed from the pass in value.

#### `toHaveColor`
```javascript
Cactus.expect(".header", "color").toEqual("#ff0000");
```
This tests for total equality, by converting rgba values returned by browser into hex values.

#### `toHaveMargin`
```javascript
Cactus.expect(".header").toHaveMargin("10px");
```
This tests equality on all sides of the element. You can pass in shorthand or longhand notation.

#### `toHavePadding`
```javascript
Cactus.expect(".header").toHaveMargin("10px 5px");
```
This tests equality on all sides of the element. You can pass in shorthand or longhand notation.

#### `toHaveBorderWidth`
```javascript
Cactus.expect(".header").toHaveBorderWidth("1px");
```
This tests equality on all sides of the element. You can pass in shorthand or longhand notation.

#### `toHaveBorderColor`
```javascript
Cactus.expect(".header").toHaveBorderColor("#ff000");
```
This tests equality on all sides of the element.

## Automating

With RSpec and Capybara (Selenium webdriver), it's possible to automate the Cactus tests by writing request specs.

Add the following RSpec matcher to `spec/spec_helper.rb`:
```ruby
RSpec::Matchers.define :be_cactus do
  match do |actual|
    all(".cactus_fail").blank?
  end

  failure_message_for_should do |actual|
    message = "Oei! Something is wrong with the CSS on '#{actual.current_url}' lah!\n"
    all(".cactus_fail").each do |failure|
      message += "- #{failure.text}\n"
    end
    message
  end
end
```
Write a request spec `spec/requests/cactus_spec.rb`
```ruby
describe 'rspec and capybara integration with cactus', js: true do
  it "is cactus-ready " do
    page.should be_cactus
  end
end
```
## Maintainers
- [Winston Teo](mailto: winston@neo.com), Neo


## License

This software is licensed under the MIT License.
