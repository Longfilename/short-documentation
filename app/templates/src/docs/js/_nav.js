jQuery(($) => {
  const url = location.pathname.split('/').pop();

  $('.nav-link').each((index, link) => {
    const $link = $(link);
    const prop = 'href';

    if ($link.attr(prop) === url) {
      $link.addClass('nav-link--active').removeProp(prop).removeAttr(prop);
    }
  });
});
