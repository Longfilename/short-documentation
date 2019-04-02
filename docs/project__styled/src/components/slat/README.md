---
nav: slat
pug: slat.pug
scss: slat.scss

views:
  - title: Slat
    json: slat.json
    wrapper_before: <br><div class="container"><div class="row"><div class="col-12 col-sm-6 offset-sm-3 col-md-4 offset-md-4">
    wrapper_after: </div></div><div><br>
  - title: Slat (with trailer)
    json: slat--trailer.json
    wrapper_before: <br><div class="container"><div class="row"><div class="col-12 col-sm-6 offset-sm-3 col-md-4 offset-md-4">
    wrapper_after: </div></div><div><br>
  - title: Slat (with kicker)
    json: slat--kicker.json
    wrapper_before: <br><div class="container"><div class="row"><div class="col-12 col-sm-6 offset-sm-3 col-md-4 offset-md-4">
    wrapper_after: </div></div><div><br>
---

# Slat

The ACME `slat` component is used in multiple components:

- [`slat-list`](./component__slat-list.html)
- [`headline-slideshow`](./component__headline-slideshow.html)

There are three (3) styles for the `slat`.

Below you can see three different variants of a `slat` component in the list. The &ldquo;kicker&rdquo; (with content before the title), &ldquo;trailer&rdquo; (with content after the title), and plain (just the title).
