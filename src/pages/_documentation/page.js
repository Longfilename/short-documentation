jQuery(function ($) {
    var $files = $("select.files"),
        $objects = $("select.objects"),
        $bodyPre = $("pre.content"),
        $bodyDiv = $("div.content");
    
    // on change, grab the contents of the URL and display them;
    $files.on("change", function () {
        var url = $files.val(),
            // what type of file is it? (we only care about json right now);
            urlType = url.split(".").pop();
        
        // gogo Ajax;
        $.get(url)
            // no error trapping... yet;
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
                if (urlType === "md") {
                    $bodyDiv.text(whichContent());
                    $bodyPre.empty();
                } else {
                    $bodyDiv.empty();
                    $bodyPre.text(whichContent());
                }
            });
    });
    
    // on click of navigation links;
    $objects.on("change", function () {
        var $this = $(this).find("option:selected"),
            data = $this.data();
        
        // load this page or module;
        $("iframe").prop("src", data.path);
        
        // clear any previous files;
        $files.empty();
        
        // and add new OPTIONs in the files SELECT;
        Object.keys(data).map(function (key) {
            // don't do anything with the folder name;
            if (typeof data[key] !== "string") {
                var myData = data[key],
                    // each type of content gets a OPTGROUP;
                    $optgroup = $("<optgroup label='" + key + "' />"),
                    // each file gets an OPTION;
                    $option;
                
                // loop through the files;
                myData.length && myData.map(function (file) {
                    // create an OPTION;
                    $option = $("<option />");
                    $option.html(data.folder + file);
                    // and add it to this OPTGROUP;
                    $optgroup.append($option);
                });
                
                // once all the files are added for this group;
                // add the OPTGROUP to the SELECT;
                // if it has content;
                if ($optgroup.children().size()) {
                    $files.append($optgroup);
                }
            }
        });
        
        // we're done adding all the tab links, click the first one (so we have content to start with);
        $files.trigger("change");
    });
    
    // now click the first item just to get things going;
    $objects.trigger("change");
});
