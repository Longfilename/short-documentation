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
  const click = 'click.template';
  const resize = 'resize.template';
  const $html = $('html');

  $buttons.open.each((index, button) => {
    const $button = $(button);

    $button.on(click, () => {
      $html.addClass(openClass);
      $template.addClass(openClass);
      $iframe.prop('src', $button.data().url);
      $window.trigger(resize);
    });
  });

  $buttons.close.on(click, () => {
    $iframe.removeProp('src').removeAttr('src');
    $template.removeClass(openClass);
    $html.removeClass(openClass);
  });

  $buttons.resizer.each((index, button) => {
    const $button = $(button);
    const size = $button.data().resizer.split(',');
    const height = size[1];
    const width = size[0];
    const resizedClass = 'template__iframe-wrapper--resized';
    const hiddenClass = 'template__resizer-link--hidden';
    const activeClass = 'template__resizer-link--active';

    $button.on(click, () => {
      $iframeWrapper.css({
        height: height,
        width: width
      });

      if (width === '100%' && height === '100%') {
        $iframeWrapper.removeClass(resizedClass);
      } else {
        $iframeWrapper.addClass(resizedClass);
      }

      $buttons.resizer.removeClass(activeClass);
      $button.addClass(activeClass);
    });

    // this is in the wrong place - too nested;
    $window.on(resize, checkViability);

    //

    function checkViability () {
      if ($overlay.height() < parseInt(height, 10) || $overlay.width() < parseInt(width, 10)) {
        $button.addClass(hiddenClass);

        // if this is the active one, make the last one (the biggest) the active;
        if ($button.hasClass(activeClass)) {
          $buttons.resizer.last().trigger(click);
        }
      } else {
        $button.removeClass(hiddenClass);
      }
    }
  });
});
