---
icons: bars
nav: skip-nav
pug: skip-nav.pug
scss: skip-nav.scss

views:
  - title: skip-nav
    wrapper_before: <br><br><br>
    wrapper_after: <br><br><br>
---

# Skip Navigation Link

This component is only visible when it has focus. Put focus into the `<iframe>` below and press the tab key, that will put focus on the element, therefore making it visible. The intention is to allow keyboard users to quickly tab over repeative content &mdash; `<header>` and `<nav>` &mdash; present on every page.

This component relys upon the target element to have an id of `#main`. It is currently pointing to the `<main>` tag on on the page.

See [webaim.org](https://webaim.org/techniques/skipnav/) for more information about this approach.
