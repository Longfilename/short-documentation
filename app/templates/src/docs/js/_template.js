jQuery(($) => {
  const $window = $(window);
  const $buttons = {
    close: $('.js__template--close'),
    open: $('.js__template--open'),
    resizer: $('.js__template--resizer')
  };
  const $iframeWrapper = $('.template__iframe-wrapper');
  const $iframe = $('.template__iframe');
  const $overlay = $('.template__overlay');
  const $template = $('.template');
  const openClass = 'template--open';
  const visibleClass = 'template__resizer--visible';
  const resizedClass = 'template__iframe-wrapper--resized';
  const click = 'click.template';
  const resize = 'resize.template';
  const $html = $('html');
  const $resizer = $('.template__resizer');

  $buttons.open.each((index, button) => {
    const $button = $(button);

    $button.on(click, () => {
      $resizer.addClass(visibleClass);
      $html.addClass(openClass);
      $template.addClass(openClass);
      $iframe.prop('src', $button.data().url);
      $window.trigger(resize);
    });
  });

  $buttons.close.on(click, () => {
    $resizer.removeClass(visibleClass);
    $iframe.removeProp('src').removeAttr('src');
    $template.removeClass(openClass);
    $html.removeClass(openClass);
  });

  $buttons.resizer.each((index, link) => {
    const $link = $(link);
    const dataResizer = $link.data().resizer;

    $link.on('click.resizer', () => {
      if (dataResizer === '100%') {
        $iframeWrapper.removeClass(resizedClass);
      } else {
        $iframeWrapper.addClass(resizedClass);
      }

      $iframeWrapper.one('transitionend.resizer', () => {
        setTimeout(() => {
          $iframe.trigger('resize.view');
        }, 750);
      });

      $iframeWrapper.css({
        width: dataResizer
      });
    });
  });
});
