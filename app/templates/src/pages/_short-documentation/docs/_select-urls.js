jQuery(($) => {
    const $p = $("p.urls");
    const $label = $p.find("span.value");
    const $urls = $p.find("select");

    // build the modules / pages SELECT;
    $urls
        .on("change", () => {
            const value = $urls.val();

            // update the label;
            $label.text(value);

            // load this page or module;
            $("iframe").prop("src", "./html/" + value);
        });

    // load the initial page;
    $urls.trigger("change");
});
