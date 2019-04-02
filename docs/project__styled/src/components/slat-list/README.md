---
nav: slat-list
pug: slat-list.pug
scss: slat-list.scss

views:
  - title: Slat List
    json: slat-list.json
    wrapper_before: <br><div class="container"><div class="row"><div class="col-12 col-sm-6 offset-sm-3 col-md-4 offset-md-4">
    wrapper_after: </div></div><div><br>
  - title: Slat List with kicker
    json: slat-list--kicker.json
    wrapper_before: <br><div class="container"><div class="row"><div class="col-12 col-sm-6 offset-sm-3 col-md-4 offset-md-4">
    wrapper_after: </div></div><div><br>
  - title: Slat List with trailer
    json: slat-list--trailer.json
    wrapper_before: <br><div class="container"><div class="row"><div class="col-12 col-sm-6 offset-sm-3 col-md-4 offset-md-4">
    wrapper_after: </div></div><div><br>
---

# Slat List

The `slat-list` component is a collection of [`slat`](./component__slat.html) components. This component provides dividers between the slats.

Below you can see three different variants of a `slat` component in the list. The &ldquo;kicker&rdquo; (with content before the title), &ldquo;trailer&rdquo; (with content after the title), and plain (just the title).
