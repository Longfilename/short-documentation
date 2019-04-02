---
nav: featured-stories
pug: featured-stories.pug
scss: featured-stories.scss

views:
  - title: Featured Stories
    json: featured-stories.json
    wrapper_before: <div class="container">
    wrapper_after: </div><br>
---

# Featured Stories

`featured-stories` is a full width, multi-column component. Meant for the [`home`](./template__home.html) and [`section`](./template__section.html) templates.

This component changes drastically based on breakpoint. The middle column of `card` components is only visible at the large breakpoint and above. When the middle column of `card` components aren't visible, the list of &ldquo;Top Stories&rdquo; will contain links to those stories.

The list of links is set to always the same height as the featured story. This means links don't wrap in the list (otherwise we'd have to deal with truncating multi line content - which gets us into messy JavaScript).
