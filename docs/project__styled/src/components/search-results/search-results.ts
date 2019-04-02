import { debounce as _debounce } from 'lodash';

jQuery(($: JQueryStatic) => {
  const $searchResults = $('.search-results');
  const $stories = $('.search-results__stories');
  const $loadingCard = $('.search-results__card-loading');
  const cardTemplate = $('#search-results__card-template').html();
  let loading = false;

  $(window).on('scroll', _debounce(calculatePosition, 150));

  // run onload in case the user is already at the bottom of the page;
  calculatePosition();

  function calculatePosition() {
    const position = window.scrollY + window.innerHeight;
    const height = document.body.scrollHeight;
    const distanceFromBottom = height - position;

    if (distanceFromBottom < 120) {
      const url = $searchResults.data('next');

      if (loading === false && url) {
        getMoreResults(url);
        showLoading();
      }
    }
  }

  function showLoading() {
    loading = true;
    $loadingCard.fadeIn();
  }

  function hideLoading() {
    loading = false;
    $loadingCard.fadeOut();
  }

  function getMoreResults(url: string) {
    $.get(url, processResults);
  }

  function processResults(response: any) {
    // add delay so the user can see something happening;
    window.setTimeout(() => {
      // add each story to the DOM;
      response.stories.forEach(story => {
        const $card = $(cardTemplate);

        $card
          .find('a')
          .attr('href', story.url)
          .find('img')
          .attr('src', story.img)
          .attr('alt', story.alt)
          .end()
          .end()
          .find('h3')
          .text(story.title);

        $card.insertBefore($loadingCard);
      });

      // change the next Ajax request URL (if present);
      $searchResults.data('next', response.next || null);

      // remove the loading indicator;
      hideLoading();
    }, 2500);
  }
});
