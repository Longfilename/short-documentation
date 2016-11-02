jQuery(($) => {
  const url = location.pathname.split('/').pop();

  $('.nav-link').each((index, link) => {
    const $link = $(link);
    const prop = 'href';
    const linkUrl = $link.attr(prop);

    // highlight the link that has a matching URL;
    // if the user is at /docs/, highlight the index link;
    if (linkUrl === url || (linkUrl === 'index.html' && url === '')) {
      $link.addClass('nav-link--active').removeProp(prop).removeAttr(prop);
    }
  });
});
