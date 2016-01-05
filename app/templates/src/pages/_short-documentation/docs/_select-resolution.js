jQuery(($) => {
    const $p = $("p.resolution");              // container of the SELECT and fake label;
    const $label = $p.find("span.value");      // fake label for the SELECT (innerHTML = value of the select);
    const $select = $p.find("select");         // SELECT with resolution options, opacity: 0 which is why we need the $span;
    const $columnIframe = $("div.col-iframe"); // IFRAME containers that we will change the width of;
    const $columnReadme = $("div.col-readme"); // the other container that gets to take up the remaining space;

    // on change of the resolution SELECT, change the width of the IFRAME;
    $select
        .on("change", () => {
            const $option = $select.find("option:selected");
            const widths = JSON.parse($option.prop("value"));

            // update the "label";
            $label.text($option.text());

            // change the width of the IFRAME;
            $columnIframe.css("flex", widths[0]);
            $columnReadme.css("flex", widths[1]);
        });
});
