// eslint configuration;
/* global Markdown, hljs */

jQuery(($) => {
    const $h2 = $("h2");
    const $files = $h2.find("select.files");
    const $bodyCode = $("code.content");
    const $bodyDiv = $("div.content");
    const convert = Markdown.getSanitizingConverter().makeHtml;

    // on change, grab the contents of the URL and display them;
    $files.on("change", () => {
        const url = $files.val();
        // what type of file is it? (we only care about json right now);
        const extension = url.split(".").pop();

        // update the label;
        $h2.find("span").text(url);

        const ajaxParams = {
            url: url,
            dataType: "text"
        };

        // gogo Ajax;
        $.ajax(ajaxParams)
            // no error trapping... yet;
            .always((data) => {
                const whichContent = () => {
                    let content = data;

                    // JS files come back as an object;
                    if (extension === "js") {
                        // responseText might not be available;
                        // some JS files it is... some it is not;
                        content = data.responseText || data;
                    }

                    return content;
                };

                // insert the content;
                // it could be markdown content (that we need to transform to HTML);
                if (extension === "md") {
                    $bodyDiv.show().html(convert(data));
                    $bodyCode.empty().parent().hide();
                // or it's content that we want to display as code;
                } else {
                    $bodyDiv.hide().empty();
                    $bodyCode
                        .parent()
                        .show()
                        .end()
                        .removeClass()
                        .addClass(extension)
                        .text(whichContent())
                        .each((i, block) => {
                            // init highlight js (code color coding);
                            hljs.highlightBlock(block);
                        });
                }
            });
    });
});
