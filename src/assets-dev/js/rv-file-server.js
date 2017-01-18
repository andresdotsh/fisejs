(function(doc){
  var anchors = doc.querySelectorAll('a.folder-item');
  for(var i = 0; i < anchors.length; i++){
    anchors[i].addEventListener('click', function(e){
      e.preventDefault();
      this.parentElement.submit();
    });
  }
})(document);
