var hljs = window.hljs,
    Markdown = window.Markdown;

jQuery(function ($) {
    var $h2 = $("h2"),
        $files = $h2.find("select.files"),
        $bodyCode = $("code.content"),
        $bodyDiv = $("div.content"),
        convert = new Markdown.getSanitizingConverter().makeHtml;
    
    // on change, grab the contents of the URL and display them;
    $files.on("change", function () {
        var url = $files.val(),
            // what type of file is it? (we only care about json right now);
            urlType = url.split(".").pop();
        
        // update the label;
        $h2.find("span").text(url);
        
        // gogo Ajax;
        $.get(url)
            // no error trapping... yet;
            .always(function (data) {
                var whichContent = function () {
                    var content = data;
                    
                    // if this is a JSON file, we need to stringify the response;
                    if (urlType === "json") {
                        content = JSON.stringify(data, null, "\t");
                        // JS files come back as an object;
                    } else if (urlType === "js") {
                        content = data.responseText;
                    }
                    
                    return content;
                };
                
                // insert the content;
                // it could be markdown content (that we need to transform to HTML);
                if (urlType === "md") {
                    $bodyDiv.show();
                    $bodyDiv.html(convert(data));
                    $bodyCode.empty().parent().hide();
                // or it's content that we want to display as code;
                } else {
                    $bodyDiv.hide().empty();
                    $bodyCode
                        .parent()
                        .show()
                        .end()
                        .removeClass()
                        .addClass(urlType)
                        .text(whichContent())
                        .each(function (i, block) {
                            hljs.highlightBlock(block);
                        });
                }
            });
    });
});
