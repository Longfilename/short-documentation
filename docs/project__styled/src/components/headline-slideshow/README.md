---
icons: bolt
nav: headline-slideshow
pug: headline-slideshow.pug
scss: headline-slideshow.scss
ts: headline-slideshow.ts

views:
  - title: Entertainment
    json: headline-slideshow-entertainment.json
    wrapper_before: <div class="container">
    wrapper_after: </div><br>
  - title: Health
    json: headline-slideshow-health.json
    wrapper_before: <div class="container">
    wrapper_after: </div><br>
  - title: Lifestyle
    json: headline-slideshow-lifestyle.json
    wrapper_before: <div class="container">
    wrapper_after: </div><br>
  - title: Sports
    json: headline-slideshow-sports.json
    wrapper_before: <div class="container">
    wrapper_after: </div><br>
---

# Headline Slideshow

[Slick Carousel](http://kenwheeler.github.io/slick/) is used for this component.

The carousel is comprised of four (4) slides. Each slide is either a [`card`](./component__card.html) or a [`slat-list`](./component__slat-list.html).

Each breakpoint shows a different number of slides at a time (always scrolling by one). At the smallest breakpoint, the previous and next arrows aren't visible, and the user will be able to navigate through the slides by dragging.

Below are multiple examples showing the content possibilities.
