// cf. http://tympanus.net/Development/PerspectivePageViewNavigation/index4.html

const $window = $(window);
const $perspective = $('.perspective');
const $content = $('.perspective__content');
const click = 'touchstart.perspective click.perspective';
const transitionEnd = 'transitionend.perspective';
const animateClass = 'perspective--animate';
const modalClass = 'perspective--modalview';

// init open button events;
// close events will be set AFTER open events have fired;
$('.js__perspective').on(click, showMenu);

//

function showMenu (event) {
  // prevent a click from firing on the $wrapper (and closing the modal);
  event.stopPropagation();

  // scroll to the top of the page so we can push the content down and show the navigation;
  $window.scrollTop(0);

  // show the thumbnail view and navigation;
  // get the content ready with the modal class (nothing visually changes yet);
  $perspective.addClass(modalClass);

  // move the content into the modal view;
  $perspective.addClass(animateClass);

  // now configure the close event handler;
  // if this was done on page load - the transition end listener would be configured before we want it to be;
  $content.one(click, hideMenu);
}

function hideMenu (event) {
  // after the transition has finished running;
  $perspective.one(transitionEnd, () => {
    // remove the modal class (so the content isn't fixed anymore);
    $perspective.removeClass(modalClass);
  });

  // start the process of sending the modal view back to the default desktop view;
  $perspective.removeClass(animateClass);
}
