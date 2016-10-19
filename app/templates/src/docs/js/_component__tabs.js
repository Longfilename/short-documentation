jQuery(($) => {
  $('.tabs').each((index, tabs) => {
    const $tabs = $(tabs);
    const $nav = $tabs.find('.tabs__nav-link');
    const $content = $tabs.find('.tabs__content-tab');
    const activeClass = 'tabs__nav-link--active';
    let indexVisible = 0;

    showTab();

    $nav.each((j, link) => {
      const $link = $(link);

      $link.on('click', () => {
        indexVisible = j;
        showTab();
      });
    });

    function showTab () {
      $content.hide();
      $nav.removeClass(activeClass);

      $content.eq(indexVisible).show();
      $nav.eq(indexVisible).addClass(activeClass);
    }
  });
});
