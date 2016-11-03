interface Buttons {
  close: JQuery;
  open: JQuery;
}

jQuery(($: JQueryStatic) => {
  const $buttons: Buttons = {
    close: $('.js__template--close'),
    open: $('.js__template--open')
  };
  const $iframe: JQuery = $('.template__iframe');
  const $html: JQuery = $('html');
  const $resizer: JQuery = $('.resizer');
  const $template: JQuery = $('.template');
  const openClass: string = 'template--open';
  const visibleClass: string = 'resizer--visible';
  const click: string = 'click.template';

  $buttons.open.each((index: number, button: Element) => {
    const $button: JQuery = $(button);

    $button.on(click, (e: Event) => {
      e.preventDefault();

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
