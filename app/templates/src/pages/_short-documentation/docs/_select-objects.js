// eslint configuration;
/* global ShortDocs */

jQuery(($) => {
    const $h1 = $("h1.objects");
    const $label = $h1.find("span.label");
    const $value = $h1.find("span.value");
    const $objects = $h1.find("select");
    const $files = $("h2.files select");
    const $urls = $("p.urls select");
    const dataAttr = "config";

    // build the modules / pages SELECT;
    $objects
        .each((index, value) => {
            const $select = $(value);
            const buildOptions = (data, title) => {
                let $optgroup;
                let $option;

                // loop through the data and build the OPTIONS;
                // if there is data;
                if (data.length) {
                    // create the OPTGROUP (pages or modules);
                    $optgroup = $("<optgroup label='" + title + "'/>");

                    // loop through each group data and build an OPTION per file;
                    data.map((item) => {
                        $option = $("<option />");

                        // need to make some adjustments to the data;
                        // don't want these parts of the path during Jade processing;
                        item.iframeSrc = "./html/" + item.html;

                        // build the OPTION;
                        $option
                            .html(item.title)
                            // attach the data to this OPTION so when we can access it onChange;
                            .data(dataAttr, item);

                        // if we have a home page, lets open with that one;
                        if (item.title.toLowerCase().indexOf("home") > -1) {
                            $option.attr("selected", true);
                        }

                        // put the OPTION in the OPTGROUP;
                        $optgroup.append($option);
                    });
                }

                // return our newly created OPTGROUP (full of OPTIONS);
                return $optgroup ? $optgroup : "";
            };

            // build an OPTIONS for the pages;
            $select.append(buildOptions(ShortDocs.data.pages, "Pages"));
            // then the modules;
            $select.append(buildOptions(ShortDocs.data.modules, "Modules"));
        })
        .on("change", (event) => {
            const $selectedOption = $(event.target).find("option:selected");
            const config = $selectedOption.data()[dataAttr];
            let $option;

            // built the pages select;
            $urls.empty();
            // loop through the files (if there are any);
            config.htmlArray.map(function (htmlFile) {
                // create an OPTION;
                $option = $("<option />");
                $option.html(htmlFile);

                // and add it to this OPTGROUP;
                $urls.append($option);
            });

            // trigger the page events (which load the iframe);
            $urls.trigger("change");

            // update the label;
            $label.text((config.folder.indexOf("pages/") === 0) ? "Page:" : "Module:");
            $value.text($objects.val());

            // clear any previous files;
            $files.empty();

            // and add new OPTIONs in the files SELECT;
            Object.keys(config).map((key) => {
                let keyData;
                let $filesOptgroup;
                let $filesOption;

                // don't do anything with the folder name;
                if (typeof config[key] !== "string" && key !== "htmlArray") {
                    keyData = config[key];
                    $filesOptgroup = $("<optgroup label='" + key + "' />"); // each type of content gets a OPTGROUP (md, jade, scss, json, js);

                    // loop through the files (if there are any);
                    if (keyData.length) {
                        keyData.map((file) => {
                            // create an OPTION;
                            $filesOption = $("<option />");
                            $filesOption.html(config.folder + "/" + file);

                            // and add it to this OPTGROUP;
                            $filesOptgroup.append($filesOption);
                        });
                    }

                    // once all the files are added for this group;
                    // add the OPTGROUP to the SELECT;
                    // if it has content;
                    if ($filesOptgroup.children().size()) {
                        $files.append($filesOptgroup);
                    }
                }
            });

            // we're done adding all the tab links, click the first one (so we have content to start with);
            $files.trigger("change");
        });

    // now click the first item just to get things going;
    $objects.trigger("change");
});
