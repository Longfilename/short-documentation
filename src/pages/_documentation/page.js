jQuery(function ($) {
    var $ul = $("ul.files");
    
    $("a").on("click", function (e) {
        var $a = $(this),
            data = $a.data();
        
        // clear any previous files;
        $ul.empty();
        
        // and add new ones;
        Object.keys(data).map(function (key) {
            // if this key is not a string (the folder), then iterate through the array of files;
            typeof data[key] !== "string" && data[key].map(function (file) {
                $ul.append("<li>" + data.folder + file + "</li>");
            });
        });
    });
});
