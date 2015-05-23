var formData = new FormData(),
    xhr;

function init(){
        xhr = new XMLHttpRequest();
        xhr.open('POST', 'http:104.236.247.200:4000/api/scorm/uploadfiles', true);

        xhr.onload = function () {
            init();
        };
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

        // Only process image files.
        if (!f.type.match('image.*')) {
            alert("Sólo puedes cargar imágenes");
            continue;
        } else if(f.size >= 1048576){
            alert("La imágen supera el límite de 1 MB");
            continue;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
           
               var name = uniqueId();
                    formData.append('files[]', f, name);
                    return function(e) {

                        pasteHtmlAtCaret('<img class="mathBlock" id="'+ name +'" style="height: 30px; width: 30px" src="'+ e.target.result+'" title="'+ escape(theFile.name) + '"/>');
                    };
            
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

var uniqueId = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

//Request upload file
function uploadFiles(){
    xhr.send(formData);
}

$(document).ready(function(){

    init();
    $('#insertimage').on("change", handleFileSelect);

});
