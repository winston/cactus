# Cactus

Write JavaScript. Test CSS.

Cactus is a CSS testing framework. It ensures that you always have the same CSS styling for DOM elements that you care about.

## Prerequisites

- Ruby on Rails, 3.2.x
- jquery-rails

## Installation

Install the Cactus gem manually or include it in your Rails Gemfile.

    gem install cactus

Add the Cactus helper in your application layout, just before the `body` closing tag.

    <%= cactus %>

Finally, add some CSS specs (written in JavaScript) in `public/cactus_spec`. Files need to end with spec.js.

    Cactus.expect(".header", "font-size").toEqual("24px");
    Cactus.expectEvery("p", "font-size").toEqual("12px");

## A Brief Explanation

The Cactus helper in your application layout includes Cactus.js and all spec files located in `public/cactus_spec/` on every page load in the Dev and Test env; the helper will not output anything when in other (Prod, Staging etc) environments.

Once the files are included, the specs will be verified against the current page DOM, and results will be displayed.

## Writing Specs

Write your specs in JavaScript, and place them in the `public/cactus_spec/` folder.

### Expectations

You can make an expectation either on a specific element or a group of elements.

#### `expect`

    Cactus.expect(".header", "font-size").toEqual("24px");

The `expect` method requires a tag name and an attribute, and the tag name should only resolve to one DOM element on the page.

If the tag name resolves to an array of DOM elements, only the first one will be tested. See `expectEvery` otherwise.

#### `expectEvery`

    Cactus.expectEvery("p", "font-size").toEqual("12px");

The `expectEvery` method requires a tag name and an attribute. All DOM elements that resolve to the tag name will be tested on.

### Matchers

The expectations are chained to matchers for verification of CSS styling.

#### `toEqual`

    Cactus.expect(".header", "font-size").toEqual("24px");

This tests for total equality.

#### `toContain`

    Cactus.expect(".header", "font-family").toContain("Helvetica");

This tests for partial equality, using a REGEX constructed from the pass in value.

#### `toHaveColor`

    Cactus.expect(".header", "color").toEqual("#ff0000");

This tests for total equality, by converting rgba values returned by browser into hex values.

## Support
- Google Groups?
- CI?
- Tracker?

## Maintainers
TBD

## License

TBD
