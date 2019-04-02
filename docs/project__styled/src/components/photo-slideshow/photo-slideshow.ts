jQuery(($: JQueryStatic) => {
  $('.photo-slideshow').each((index: number, component: HTMLElement) => {
    const $component = $(component);
    const selectorFor = '.photo-slideshow__for';
    const selectorNav = '.photo-slideshow__nav';

    $component.find(selectorFor).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: selectorNav
    });

    $component.find(selectorNav).slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      asNavFor: selectorFor,
      arrows: false,
      dots: false,
      focusOnSelect: true
    });
  });
});
