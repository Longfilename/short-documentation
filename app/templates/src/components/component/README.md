---
nav: <%= name %>
pug: <%= name %>.pug
scss: <%= name %>.scss
<% if (js) { %>ts: <%= name %>.ts<% } %>
<% if (size) { %>size: <%= size %><% } %>
views:
  - title: <%= name %>
    json: <%= name %>.json
---

# <%= name %>
