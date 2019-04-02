jQuery(($: JQueryStatic) => {
  $('.tabs').each((index: number, tabs: HTMLElement) => {
    const $tabs: JQuery = $(tabs);
    const $nav: JQuery = $tabs.find('.tabs__nav-link');
    const $content: JQuery = $tabs.find('.tabs__content-tab');
    const activeClass: string = 'tabs__nav-link--active';

    let indexVisible: number = 0;

    showTab();

    $nav.each((i: number, link: HTMLElement) => {
      const $link: JQuery = $(link);

      $link.on('click', () => {
        indexVisible = i;
        showTab();
      });
    });

    function showTab(): void {
      $content.hide();
      $nav.removeClass(activeClass);
      $content.eq(indexVisible).show();
      $nav.eq(indexVisible).addClass(activeClass);
    }
  });
});
