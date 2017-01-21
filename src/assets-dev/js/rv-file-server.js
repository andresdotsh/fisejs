(function(doc){
  var uploadForm = doc.querySelector('form#uploadform');
  var fileInput = doc.querySelector('input#fileinput');
  var uploadButton = doc.querySelector('input#uploadbutton');
  var anchors = doc.querySelectorAll('a.folder-item');
  if(uploadButton){
    uploadButton.addEventListener('click', function(){
      var files = fileInput.files;
      var totalSize = 0;
      for(var i = 0; i < files.length; i++){
        totalSize += files[i].size;
      }
      if(files.length > 0) uploadForm.submit();
      if((totalSize/1000000) > 5){
        bootbox.dialog({ message: '<h3 class="text-center">Loading...</h3><img src="/static/img/progress.gif" class="img-responsive center-block loading-img">' });
      }
    });
  }
  for(var i = 0; i < anchors.length; i++){
    anchors[i].addEventListener('click', function(e){
      e.preventDefault();
      this.parentElement.submit();
    });
  }
})(document);
