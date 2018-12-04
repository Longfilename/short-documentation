interface Buttons {
  close: JQuery;
  open: JQuery;
}

jQuery(($: JQueryStatic) => {
  const $buttons: Buttons = {
    close: $('.js__view-template--close'),
    open: $('.js__view-template--open')
  };
  const $iframe: JQuery = $('.view-template__iframe');
  const $html: JQuery = $('html');
  const $resizer: JQuery = $('.resizer');
  const $template: JQuery = $('.view-template');
  const openClass: string = 'view-template--open';
  const visibleClass: string = 'resizer--visible';
  const click: string = 'click.view-template';

  $buttons.open.each((index: number, button: HTMLElement) => {
    const $button: JQuery = $(button);

    $button.on(click, (e: Event) => {
      e.preventDefault();

      window.scrollTo(0, 0);

      $iframe.prop('src', $button.attr('href'));
      $resizer.addClass(visibleClass);
      $html.addClass(openClass);
      $template.addClass(openClass);
    });
  });

  $buttons.close.on(click, () => {
    $resizer.removeClass(visibleClass);
    $template.removeClass(openClass);
    $html.removeClass(openClass);
    $iframe.removeProp('src').removeAttr('src');
  });
});
