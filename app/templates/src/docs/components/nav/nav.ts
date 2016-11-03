jQuery(($: JQueryStatic) => {
  const url: string = location.pathname.split('/').pop();

  $('.nav-link').each((index: number, link: Element) => {
    const $link: JQuery = $(link);
    const prop: string = 'href';
    const linkUrl: string = $link.attr(prop);

    // highlight the link that has a matching URL;
    // if the user is at /docs/, highlight the index link;
    if (linkUrl === url || (linkUrl === 'index.html' && url === '')) {
      $link.addClass('nav-link--active').removeProp(prop).removeAttr(prop);
    }
  });
});
