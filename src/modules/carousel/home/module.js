import jQuery from "jquery";
import lib1 from "../../../js/library1";

jQuery(function ($) {
    $("section.carousel-home").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });
});
