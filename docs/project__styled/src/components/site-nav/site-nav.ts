jQuery(($: JQueryStatic) => {
  const $drawer = $('.site-nav__drawer');
  const drawerVisibleClass = 'site-nav__drawer--show';
  const sectionVisibleClass = 'site-nav__section--show';

  // stop clicks within the nav from closing the nav (click event on the body);
  $('.site-nav__drawer').on('click', (event: Event) => {
    event.stopPropagation();
  });

  $('.site-nav__button-toggle').on('click', (event: Event) => {
    $(event.currentTarget)
      .parent('.site-nav__section')
      .toggleClass(sectionVisibleClass);
  });

  $('.site-nav__button-icon--open').on('click', (event: Event) => {
    $drawer.addClass(drawerVisibleClass);
    event.stopPropagation();
  });

  $('body, .site-nav__button-icon--close').on('click', () => {
    $drawer.removeClass(drawerVisibleClass);
  });
});
