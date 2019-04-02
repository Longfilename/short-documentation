---
nav: card
pug: card.pug
scss: card.scss _vars.scss

views:
  - title: Card Overlay
    json: card--overlay.json
    wrapper_before: <br><div class="container"><div class="row"><div class="col-12 col-sm-6 offset-sm-3 col-md-4 offset-md-4">
    wrapper_after: </div></div><div><br>
  - title: Card Stacked
    json: card--stacked.json
    wrapper_before: <br><div class="container"><div class="row"><div class="col-12 col-sm-6 offset-sm-3 col-md-4 offset-md-4">
    wrapper_after: </div></div><div><br>
---

# Card

The ACME `card` component is used in multiple components [`featured-stories`](./component__featured-stories.html), [`headline-slideshow`](./component__headline-slideshow.html), [`search-results`](./component__search-results.html) as just a few examples.

There are two styles for the `card`, an overlay (text on top of the image), and stacked (text underneath the image).

The `card` component has two SCSS files. This is so other components can read in the configuration variables for this component - and possibly alter them when the component is nested within other components. [`headline-slideshow`](./component__headline-slideshow.html) uses the `card` config VARS in setting styles for the slideshow.
