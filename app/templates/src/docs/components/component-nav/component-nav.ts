jQuery(($: JQueryStatic) => {
  const $nav: JQuery = $('.component-nav');
  const $buttons: JQuery = $nav.find('.button');
  const buttonActiveClass: string = 'button--selected';
  const $components: JQuery = $('.component');
  const componentActiveClass: string = 'component--selected';

  $buttons.each((i: number, link: HTMLElement) => {
    const $button: JQuery = $(link);

    $button.on('click', () => {
      // highlight the selected button so the user knows what component they are viewing;
      $buttons.removeClass(buttonActiveClass);
      $button.addClass(buttonActiveClass);

      $components.removeClass(componentActiveClass);
      $components.eq(i).addClass(componentActiveClass);
    });
  });
});
