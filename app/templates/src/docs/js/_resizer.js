jQuery(($) => {
  $('.resizer').each((index, resizer) => {
    const $window = $(window);
    const $resizer = $(resizer);
    const hiddenClass = 'resizer-link--hidden';
    const activeClass = 'resizer-link--active';
    const $links = $resizer.find('.resizer-link');
    const resize = 'resize.resizer';
    const click = 'click.resizer';

    let $target;
    let $iframe;
    let resizedClass;

    if ($resizer.hasClass('resizer--template')) {
      $target = $('.template__iframe-wrapper');
      $iframe = $('.template__iframe');
      resizedClass = 'template__iframe-wrapper--resized';
    } else {
      $target = $resizer.prev().find('.component__view-back');
      $iframe = $target.find('.component__view-iframe');
      resizedClass = 'component__view-back--resized';
    }

    $links.each((i, link) => {
      const $link = $(link);
      const dataResizer = $link.data().resizer;

      $link.on(click, () => {
        if (dataResizer === '100%') {
          $target.removeClass(resizedClass);
        } else {
          $target.addClass(resizedClass);
        }

        $target.one('transitionend.resizer', () => {
          setTimeout(() => {
            $iframe.trigger('resize.view');
          }, 750);
        });

        $target.css({
          width: dataResizer
        });

        $links.removeClass(activeClass);
        $link.addClass(activeClass);
      });

      $window.on(resize, checkViability).trigger(resize);

      //

      function checkViability () {
        if ($window.width() < parseInt(dataResizer, 10)) {
          $link.addClass(hiddenClass);

          // if this is the active one, make the last one (the biggest) the active;
          if ($link.hasClass(activeClass)) {
            $links.last().trigger(click);
          }
        } else {
          $link.removeClass(hiddenClass);
        }
      }
    });
  });
});
