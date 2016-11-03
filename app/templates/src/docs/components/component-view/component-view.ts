jQuery(($) => {
  const delay = 1000;
  const $views = $('.component-view');

  if ($views.length) {
    initIframe(0);
  }

  function initIframe (index) {
    const $view = $views.eq(index);
    const $iframe = $view.find('.component-view__iframe');

    $iframe
      .on('resize.view', setHeight)
      .on('load.view', startDelay)
      .prop('src', $iframe.data().src);



    //


    function startDelay () {
      window.setTimeout(showIframe, delay);
    }

    function showIframe () {
      window.setTimeout(() => {
        $view.addClass('component-view--loaded');

        if (index < $views.length - 1) {
          initIframe(index + 1);
        }

        setHeight();
      }, 350);
    }

    function setHeight () {
      const css = {
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
