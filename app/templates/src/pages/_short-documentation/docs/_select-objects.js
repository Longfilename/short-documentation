// eslint configuration;
/* global ShortDocs */

jQuery(($) => {
    const $h1 = $("h1");
    const $h2 = $("h2");
    const $objects = $h1.find("select.objects");
    const $files = $h2.find("select.files");
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

            // update the label;
            $h1.find("span").text($objects.val());

            // load this page or module;
            $("iframe").prop("src", config.iframeSrc);

            // clear any previous files;
            $files.empty();

            // and add new OPTIONs in the files SELECT;
            Object.keys(config).map((key) => {
                let keyData;
                let $filesOptgroup;
                let $filesOption;

                // don't do anything with the folder name;
                if (typeof config[key] !== "string") {
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
