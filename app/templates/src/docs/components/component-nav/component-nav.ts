jQuery(($: JQueryStatic) => {
  const $buttons: JQuery = $('.component-nav .button');
  const buttonActiveClass: string = 'button--selected';
  const $components: JQuery = $('.component');
  const componentActiveClass: string = 'component--selected';

  // when a button is clicked show the corresponding view for the component;
  $buttons.each((i: number, link: HTMLElement) => {
    const $button: JQuery = $(link);

    $button.on('click', () => {
      // highlight the selected button so the user knows what component they are viewing;
      $buttons.removeClass(buttonActiveClass);
      $button.addClass(buttonActiveClass);

      // show only the corresponding view for the component;
      $components.removeClass(componentActiveClass);
      $components.eq(i).addClass(componentActiveClass);
    });
  });
});
