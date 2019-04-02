interface JQuery {
  slick(arg: any): JQuery;
}

jQuery(($: JQueryStatic) => {
  $('.headline-slideshow__slides').each((index: number, component: HTMLElement) => {
    $(component)
      .slick({
        arrows: false,
        dots: false,
        infinite: false,
        prevArrow:
          '<button type="button" class="headline-slideshow__arrow headline-slideshow__arrow--previous"><svg class="icon-angle-left"><title>Previous Slide</title><use xlink:href="../images/icons/icons.svg#icon-angle-left"></use></svg></button>',
        nextArrow:
          '<button type="button" class="headline-slideshow__arrow headline-slideshow__arrow--next"><svg class="icon-angle-right"><title>Next Slide</title><use xlink:href="../images/icons/icons.svg#icon-angle-right"></use></svg></button>',
        slidesToScroll: 4,
        slidesToShow: 4,
        speed: 300,
        responsive: [
          {
            breakpoint: 1248,
            settings: {
              arrows: true,
              dots: false,
              slidesToScroll: 3,
              slidesToShow: 3
            }
          },
          {
            breakpoint: 960,
            settings: {
              arrows: true,
              dots: false,
              slidesToScroll: 2,
              slidesToShow: 2
            }
          },
          {
            breakpoint: 672,
            settings: {
              arrows: false,
              dots: false,
              slidesToScroll: 1,
              slidesToShow: 1
            }
          }
        ]
      })
      // force each slide to be the height of the tallest (the track);
      // this adds visual consistency between the slides (some will be taller than others);
      .on('setPosition', function(event: any, slick: any) {
        slick.$slides.css('height', slick.$slideTrack.height() + 'px');
      });
  });
});
