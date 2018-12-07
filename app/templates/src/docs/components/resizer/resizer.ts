import debounce = require('lodash/debounce');

jQuery(($: JQueryStatic) => {
  $('.resizer').each((index: number, resizer: HTMLElement) => {
    const $window: JQuery<Window> = $(window);
    const $resizer: JQuery = $(resizer);
    const $links: JQuery = $resizer.find('.resizer-link');
    const hiddenClass: string = 'resizer-link--hidden';
    const activeClass: string = 'resizer-link--active';
    const resize: string = 'resize.resizer';
    const click: string = 'click.resizer';

    let $target: JQuery;
    let $iframe: JQuery;
    let resizedClass: string;

    if ($resizer.hasClass('resizer--view-template')) {
      $target = $('.view-template__iframe-wrapper');
      $iframe = $('.view-template__iframe');
      resizedClass = 'view-template__iframe-wrapper--resized';
    } else {
      $target = $resizer.prev().find('.component-view__loaded');
      $iframe = $target.find('.component-view__iframe');
      resizedClass = 'component-view__loaded--resized';
    }

    $links.each((i: number, link: HTMLElement) => {
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
            $iframe.trigger('resize.component-view');
          }, 750);
        });

        $target.css({
          width: dataResizer
        });

        $links.removeClass(activeClass);
        $link.addClass(activeClass);
      });

      $window.on(resize, debounce(checkViability, 150)).trigger(resize);

      function checkViability(): void {
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
