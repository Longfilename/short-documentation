jQuery(function ($) {
    var $files = $("select.files"),
        $tabs = $("div.tabs"),
        $body = $("div.tab-body");
    
    // on change, grab the contents of the URL and display them;
    $files.on("change", function () {
        var url = $files.val(),
            // what type of file is it? (we only care about json right now);
            urlType = url.split(".").pop();
        
        $.get(url)
            .always(function (data) {
                var whichContent = function () {
                    var content = data;
                    
                    // if this is a JSON file, we need to stringify the response;
                    if (urlType === "json") {
                        content = JSON.stringify(data);
                    // JS files come back as an object;
                    } else if (urlType === "js") {
                        content = data.responseText;
                    }
                    
                    return content;
                };
                // insert the content;
                $body.text(whichContent());
            });
    });
    
    // on click of navigation links;
    $("select.objects").on("change", function () {
        var $option = $(this).find("option:selected"),
            data = $option.data(),
            $tab;
        
        // load this page or module;
        $("iframe").prop("src", data.path);
        
        // clear any previous files and tabs;
        $files.empty();
        $tabs.empty();
        
        // and add new tabs (and options in the select);
        Object.keys(data).map(function (key) {
            // don't do anything with the folder name;
            if (typeof data[key] !== "string") {
                    // content to pass on when this new A is clicked;
                var myData = data[key],
                    // the data attribute where myData is stored;
                    keyName = "files";
                
                // if we have actual content for this file type;
                if (myData.length) {
                    // create the tab link;
                    $tab = $("<a/>")
                        .html(key)
                        .data(keyName, myData)
                        .on("click", function () {
                            var $this = $(this),
                                tabData = $this.data();
                            
                            // kill any existing content;
                            $files.empty();
                            
                            // and for each file in this tab...;
                            // iterate through the array of files;
                            tabData[keyName].map(function (file) {
                                // and create an OPTION for the SELECT;
                                $files.append("<option>" + data.folder + file + "</option>");
                            });
                            
                            // now that we're done adding all the values, trigger a change;
                            $files.trigger("change");
                        });
                    
                    // then add this tab to the page;
                    $tabs.append($tab);
                }
            }
        });
        
        // we're done adding all the tab links, click the first one (so we have content to start with);
        $tabs.find("a:first-child").trigger("click");
    });
    
    // now click the first item just to get things going;
    $("select.objects").trigger("change");
});
