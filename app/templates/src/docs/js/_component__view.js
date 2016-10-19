jQuery(($) => {
  const delay = 1000;
  const $views = $('.component__view');

  if ($views.length) {
    initIframe(0);
  }

  function initIframe (index) {
    const $view = $views.eq(index);
    const $card = $view.find('.component__view-card');
    const $iframe = $view.find('.component__view-iframe');

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
        $view.addClass('component__view--loaded');
        $card.addClass('component__view-card--loaded');

        if (index < $views.length - 1) {
          initIframe(index + 1);
        }

        // odd bug here..;
        // need to run twice because the first time through, the height isn't correct;
        setHeight();
        setHeight();
      }, 350);
    }

    function setHeight () {
      $iframe.add($view).css({
        height: $iframe.contents().find('html').outerHeight()
      });
    }
  }
});
