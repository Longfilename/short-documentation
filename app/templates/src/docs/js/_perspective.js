// cf. http://tympanus.net/Development/PerspectivePageViewNavigation/index4.html

const $window = $(window);
const $perspective = $('.perspective'); // outer content (contains everything);
const $container = $('.perspective__content-wrapper'); // content for the content (and .content);
const $content = $('.perspective__content'); // content content we adjust to emulate scroll position;
const click = 'touchstart.perspective click.perspective';
const transitionEnd = 'transitionend.perspective';
const animateClass = 'perspective--animate';
const modalClass = 'perspective--modalview';
let scrollPosition = 0;

// init open button events;
// close events will be set AFTER open events have fired;
$('.js__perspective').on(click, showMenu);

//

function showMenu (event) {
  // prevent a click from firing on the $container (and closing the modal);
  event.stopPropagation();

  // record the scroll position so we can maintain it after closing the menu;
  scrollPosition = $window.scrollTop();

  // move the content to emulate the scroll position;
  // this is so the ‘thumbnail’ view of the page has the same scroll position as the real page;
  $content.css({ top: scrollPosition * -1 + 'px' });

  // scroll to the top of the page so we can push the content down and show the navigation;
  $window.scrollTop(0);

  // show the thumbnail view and navigation;
  // get the content ready with the modal class (nothing visually changes yet);
  $perspective.addClass(modalClass);

  // move the content into the modal view;
  $perspective.addClass(animateClass);

  // now configure the close event handler;
  // if this was done on page load - the transition end listener would be configured before we want it to be;
  $container.one(click, hideMenu);
}

function hideMenu (event) {
  // after the transition has finished running;
  $perspective.one(transitionEnd, () => {
    // remove the modal class (so the content isn't fixed anymore);
    $perspective.removeClass(modalClass);

    // scroll back to the original location (it was changed to 0 to show the menu);
    $window.scrollTop(scrollPosition);

    // undo the fake scroll position (set so the modal would look like the page);
    $content.css({ top: 0 });
  });

  // start the process of sending the modal view back to the default desktop view;
  $perspective.removeClass(animateClass);
}
