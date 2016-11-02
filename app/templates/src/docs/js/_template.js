jQuery(($) => {
  const $window = $(window);
  const $buttons = {
    close: $('.js__template--close'),
    open: $('.js__template--open')
  };
  const $iframe = $('.template__iframe');
  const $html = $('html');
  const $resizer = $('.resizer');
  const $template = $('.template');
  const openClass = 'template--open';
  const visibleClass = 'resizer--visible';
  const click = 'click.template';

  $buttons.open.each((index, button) => {
    const $button = $(button);

    $button.on(click, () => {
      $resizer.addClass(visibleClass);
      $html.addClass(openClass);
      $template.addClass(openClass);
      $iframe.prop('src', $button.data().url);
    });
  });

  $buttons.close.on(click, () => {
    $resizer.removeClass(visibleClass);
    $iframe.removeProp('src').removeAttr('src');
    $template.removeClass(openClass);
    $html.removeClass(openClass);
  });
});
