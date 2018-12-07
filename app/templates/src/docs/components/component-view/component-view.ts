jQuery(($: JQueryStatic) => {
  $('.component-view').each((index: number, view: HTMLElement) => {
    initIframe($(view));
  });

  // attach events to each view of the component views, and set loaded styles;
  function initIframe($view: JQuery): void {
    const $iframe: JQuery = $view.find('.component-view__iframe');

    // on resize of the iframe, set the height again - it may have changed;
    $iframe
      .on('resize.component-view', () => setHeight($view, $iframe))
      .prop('src', $iframe.data().src);

    // wait a short while before adding the laoded class;
    // iframe is a local call, it shouldn't take long at all;
    window.setTimeout(() => {
      $view.addClass('component-view--loaded');

      setHeight($view, $iframe);
    }, 350);
  }

  // change the height of an iframe;
  function setHeight($view: JQuery, $iframe: JQuery): void {
    // get the height from witin the iframe;
    const css: { height: number } = {
      height: $iframe
        .contents()
        .find('html')
        .outerHeight()
    };

    // then set the iframe and iframe container height;
    $iframe.css(css);
    $view.css(css);

    // once the height is set, hide the loading indicator;
    window.setTimeout(() => {
      $view.find('.component-view__loading').hide();
    }, 350);
  }
});
