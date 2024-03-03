$(document).ready(function () {
    var dropzone = $('#file-dropzone');
    var loadButton = $('#loadButton');
 
    dropzone.on('dragover', function (e) {
       e.preventDefault();
       dropzone.addClass('dragover');
    });
 
    dropzone.on('dragleave', function () {
       dropzone.removeClass('dragover');
    });
 
    dropzone.on('drop', function (e) {
       e.preventDefault();
       dropzone.removeClass('dragover');
 
       var files = e.originalEvent.dataTransfer.files;
       handleFiles(files);
    });
 
    $('#file-input').on('change', function () {
       var files = this.files;
       handleFiles(files);
    });
 
    loadButton.on('click', function () {
       // Perform actions after clicking the "Load" button
       // You can read file contents and perform necessary operations
       var files = $('#file-input')[0].files;
       handleFiles(files);
    });
 
    function handleFiles(files) {
       // Implement file handling logic here
       // You can read file contents and perform necessary operations
       for (var i = 0; i < files.length; i++) {
          var file = files[i];
          console.log('File Name:', file.name);
          console.log('File Type:', file.type);
 
          // Read file contents asynchronously
          var reader = new FileReader();
          reader.onload = function (e) {
             var content = e.target.result;
             console.log('File Content:', content);
          };
          reader.readAsText(file);
       }
    }
 });
 