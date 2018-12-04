// cf. http://tympanus.net/Development/PerspectivePageViewNavigation/index4.html

const $page: JQuery = $('.page');
const $frame: JQuery = $('.page__frame');
const click: any = 'touchstart.page click.page';
const transitionEnd: string = 'transitionend.page';
const animateClass: string = 'page--animate';
const modalClass: string = 'page--modalview';

// init open button events;
// close events will be set AFTER open events have fired;
$('.js__page').on(click, showMenu);

//

function showMenu(event: Event): void {
  // prevent a click from firing on the $wrapper (and closing the modal);
  event.stopPropagation();

  // show the thumbnail view and navigation;
  // get the content ready with the modal class (nothing visually changes yet);
  $page.addClass(modalClass);

  // move the content into the modal view;
  $page.addClass(animateClass);

  // now configure the close event handler;
  // if this was done on page load - the transition end listener would be configured before we want it to be;
  $frame.one(click, hideMenu);
}

function hideMenu(event: Event): void {
  // after the transition has finished running;
  $page.one(transitionEnd, () => {
    // remove the modal class (so the content isn't fixed anymore);
    $page.removeClass(modalClass);
  });

  // start the process of sending the modal view back to the default desktop view;
  $page.removeClass(animateClass);
}
