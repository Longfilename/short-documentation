// set click events to control the width of the documentation panels;
jQuery(($) => {
    const $columnIframe = $("div.col-iframe");
    const $columnReadme = $("div.col-readme");

    // on click of the width buttons;
    $("a.set-flex-width").on("click", (event) => {
        const data = $(event.originalTarget).data();

        // only proceed if we're getting what we're expecting from the DATA attribute;
        if (data.widths.length === 2) {
            // adjust the width of the columns;
            $columnIframe.css("flex", data.widths[0]);
            $columnReadme.css("flex", data.widths[1]);
        }
    });
});
