jQuery(($) => {
  const page = location.pathname.split('/').pop();

  $('.perspective__nav-link').each((index, link) => {
    const $link = $(link);

    if ($link.attr('href') === page) {
      $link.addClass('perspective__nav-link--active').removeProp('href').removeAttr('href');
    }
  });
});
