jQuery(($: JQueryStatic) => {
  $('.resizer').each((index: number, resizer: Element) => {
    const $window: JQuery = $(window);
    const $resizer: JQuery = $(resizer);
    const $links: JQuery = $resizer.find('.resizer-link');
    const hiddenClass: string = 'resizer-link--hidden';
    const activeClass: string = 'resizer-link--active';
    const resize: string = 'resize.resizer';
    const click: string = 'click.resizer';

    let $target: JQuery;
    let $iframe: JQuery;
    let resizedClass: string;

    if ($resizer.hasClass('resizer--template')) {
      $target = $('.template__iframe-wrapper');
      $iframe = $('.template__iframe');
      resizedClass = 'template__iframe-wrapper--resized';
    } else {
      $target = $resizer.prev().find('.component-view__loaded');
      $iframe = $target.find('.component-view__iframe');
      resizedClass = 'component-view__loaded--resized';
    }

    $links.each((i: number, link: Element) => {
      const $link: JQuery = $(link);
      const dataResizer: string = $link.data().resizer;

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

      function checkViability (): void {
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
