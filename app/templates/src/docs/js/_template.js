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

    $button.on(click, (e) => {
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
