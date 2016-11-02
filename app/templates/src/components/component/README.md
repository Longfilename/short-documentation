---
nav: <%= name %>
jade: <%= name %>.jade
<% if (size) { %>size: <%= size %><% } %>
<% if (js) { %>ts: <%= name %>.ts<% } %>
views:
  - title: <%= name %>
    json: _<%= name %>.json
---

# <%= name %>
