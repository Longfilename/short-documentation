jQuery(($) => {
  $('.resizer').each((index, resizer) => {
    const $resizer = $(resizer);
    // const $view = $resizer.prev();
    // const $iframeContainer = $view.find('.component__view-back');
    // const $iframe = $view.find('.component__view-iframe');
    // const resizedClass = 'component__view-back--resized';
    const activeClass = 'resizer-link--active';
    const $links = $resizer.find('.resizer-link');

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

      $link.on('click.resizer', () => {
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
    });
  });
});
