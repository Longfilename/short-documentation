var jQuery = jQuery,
    ShortDocs = ShortDocs || {};

jQuery(function ($) {
    var $h1 = $("h1"),
        $h2 = $("h2"),
        $objects = $h1.find("select.objects"),
        $files = $h2.find("select.files");
    
    // build the modules / pages SELECT;
    $objects
        .each(function () {
            var $select = $(this),
                buildOptions = function (data, title) {
                    var $optgroup, $option;
                    
                    // loop through the data and build the OPTIONS;
                    // if there is data;
                    if (data.length) {
                        // create the OPTGROUP (pages or modules);
                        $optgroup = $("<optgroup label='" + title + "'/>");
                        
                        // loop through each group data and build an OPTION per file;
                        data.map(function (item) {
                            $option = $("<option />");
                            
                            // need to make some adjustments to the data;
                            // don't want these parts of the path during Jade processing;
                            item.path =  "./html/" + item.page;
                            item.folder = "./" + item.folder;
                            
                            // build the OPTION;
                            $option
                                .html(item.title)
                                // attach the data to this OPTION so when we can access it onChange;
                                .data("config", item);
                            
                            // put the OPTION in the OPTGROUP;
                            $optgroup.append($option);
                        });
                    }
                    
                    // return our newly created OPTGROUP (full of OPTIONS);
                    return ($optgroup) ? $optgroup : "";
                };
            
            // build an OPTIONS for the pages;
            $select.append(buildOptions(ShortDocs.data.pages, "Pages"));
            // then the modules;
            $select.append(buildOptions(ShortDocs.data.modules, "Modules"));
        })
        .on("change", function () {
            var $option = $(this).find("option:selected"),
                config = $option.data().config;
            
            // update the label;
            $h1.find("span").text($objects.val());
        
            // load this page or module;
            $("iframe").prop("src", config.path);
        
            // clear any previous files;
            $files.empty();
        
            // and add new OPTIONs in the files SELECT;
            Object.keys(config).map(function (key) {
                // don't do anything with the folder name;
                if (typeof config[key] !== "string") {
                    var keyData = config[key],
                        // each type of content gets a OPTGROUP (md, jade, scss, json, js);
                        $optgroup = $("<optgroup label='" + key + "' />"),
                        // each file gets an OPTION;
                        $option;
                
                    // loop through the files (if there are any);
                    keyData.length && keyData.map(function (file) {
                        // create an OPTION;
                        $option = $("<option />");
                        $option.html(config.folder + file);
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
