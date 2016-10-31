jQuery(($) => {
  $('.component__resizer').each((index, resizer) => {
    const $resizer = $(resizer);
    const $view = $resizer.prev();
    const $iframeContainer = $view.find('.component__view-back');
    const $iframe = $view.find('.component__view-iframe');
    const resizedClass = 'component__view-back--resized';
    const activeClass = 'component__resizer-link--active';
    const $links = $resizer.find('.component__resizer-link');

    $links.each((i, link) => {
      const $link = $(link);
      const dataResizer = $link.data().resizer;

      $link.on('click.resizer', () => {
        if (dataResizer === '100%') {
          $iframeContainer.removeClass(resizedClass);
        } else {
          $iframeContainer.addClass(resizedClass);
        }

        $iframeContainer.one('transitionend.resizer', () => {
          setTimeout(() => {
            $iframe.trigger('resize.view');
          }, 750);
        });

        $iframeContainer.css({
          width: dataResizer
        });

        $links.removeClass(activeClass);
        $link.addClass(activeClass);
      });
    });
  });
});
