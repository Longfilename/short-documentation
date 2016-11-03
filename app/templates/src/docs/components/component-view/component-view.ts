jQuery(($: JQueryStatic) => {
  const $views: JQuery = $('.component-view');
  const delay: number = 1000;

  if ($views.length) {
    initIframe(0);
  }

  function initIframe (index: number): void {
    const $view: JQuery = $views.eq(index);
    const $iframe: JQuery = $view.find('.component-view__iframe');

    $iframe
      .on('resize.view', setHeight)
      .on('load.view', startDelay)
      .prop('src', $iframe.data().src);



    //


    function startDelay (): void {
      window.setTimeout(showIframe, delay);
    }

    function showIframe (): void {
      window.setTimeout(() => {
        $view.addClass('component-view--loaded');

        if (index < $views.length - 1) {
          initIframe(index + 1);
        }

        setHeight();
      }, 350);
    }

    function setHeight (): void {
      const css: { height: number } = {
        height: $iframe.contents().find('html').outerHeight()
      };

      $iframe.css(css);
      $view.css(css);

      window.setTimeout(() => {
        $view.find('.component-view__loading').hide();
      }, 350);
    }
  }
});
