jQuery(function ($) {
    $("a").on("click", function (e) {
        e.preventDefault();
        console.log($(this).data());
    });
});

console.log("h1");
