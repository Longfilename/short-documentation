jQuery(($: JQueryStatic) => {
  const $views: JQuery = $('.component-view');

  $views.each((index: number, view: HTMLElement) => {
    initIframe($(view));
  });

  function initIframe($view: JQuery): void {
    const $iframe: JQuery = $view.find('.component-view__iframe');

    $iframe.on('resize.component-view', setHeight).prop('src', $iframe.data().src);

    window.setTimeout(() => {
      $view.addClass('component-view--loaded');

      setHeight();
    }, 350);

    function setHeight(): void {
      const css: { height: number } = {
        height: $iframe
          .contents()
          .find('html')
          .outerHeight()
      };

      $iframe.css(css);
      $view.css(css);

      window.setTimeout(() => {
        $view.find('.component-view__loading').hide();
      }, 350);
    }
  }
});
