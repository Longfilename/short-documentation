---
icons: bolt
nav: search-results
pug: search-results.pug
scss: search-results.scss
ts: search-results.ts

views:
  - title: Search Results
    json: search-results.json
    wrapper_before: <div class="container">
    wrapper_after: </div><br>
---

# Search Results

Flexbox container of `card` components.

Once the user scrolls to the bottom of the page:

1. the `data-next` attribute is checked to see if it contains a URL of more results
2. if the `data-next` value is present, an additional request is made
3. the loading `card` is shown
4. once the request JSON is returned
5. update the `data-next` value
6. insert the new `card` search results
7. hide the loading `card`

This repeats until the `data-next` attribute is not present.

The scroll event won't be triggered in the documentation.
