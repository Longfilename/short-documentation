---
icons: bolt
nav: photo-slideshow
pug: photo-slideshow.pug
scss: photo-slideshow.scss
ts: photo-slideshow.ts

views:
  - title: Photo Slideshow
    json: photo-slideshow.json
    wrapper_before: <div class="container">
    wrapper_after: <div><br>
---

# Photo Slideshow

[Slick Carousel](http://kenwheeler.github.io/slick/) is used for this component.

This slideshow is comprised of two implementations of Slick. One to control the thumbnails, one to control the full size images and descriptions.

The thumbnail slideshow acts as navigation for the full size image slideshow.

This compoennt is not visible at smaller breakpoints.
