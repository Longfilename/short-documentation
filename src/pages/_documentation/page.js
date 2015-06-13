jQuery(function ($) {
    var $files = $("select.files"),
        $fileTypes = $("select.file-type"),
        $body = $("div.tab-body"),
        // the data attribute where myData is stored;
        keyName = "files";
    
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
    
    $fileTypes.on("change", function () {
        var $this = $(this).find("option:selected"),
            tabData = $this.data();
        
        // kill any existing content;
        $files.empty();
        
        // and for each file in this tab...;
        // iterate through the array of files;
        tabData[keyName].map(function (file) {
            // and create an OPTION for the SELECT;
            $files.append("<option>" + tabData.folder + file + "</option>");
        });
    
        // now that we're done adding all the values, trigger a change;
        $files.trigger("change");
    });
    
    // on click of navigation links;
    $("select.objects").on("change", function () {
        var $this = $(this).find("option:selected"),
            data = $this.data(),
            $option;
        
        // load this page or module;
        $("iframe").prop("src", data.path);
        
        // clear any previous files and tabs;
        $files.empty();
        $fileTypes.empty();
        
        // and add new tabs (and options in the select);
        Object.keys(data).map(function (key) {
            // don't do anything with the folder name;
            if (typeof data[key] !== "string") {
                    // content to pass on when this new A is clicked;
                var myData = data[key];
                
                // if we have actual content for this file type;
                if (myData.length) {
                    // create the tab link;
                    $option = $("<option/>")
                        .html(key)
                        .data(keyName, myData)
                        .data("folder", data.folder);
                    
                    // then add this tab to the page;
                    $fileTypes.append($option);
                }
            }
        });
        
        // we're done adding all the tab links, click the first one (so we have content to start with);
        $fileTypes.trigger("change");
    });
    
    // now click the first item just to get things going;
    $("select.objects").trigger("change");
});
