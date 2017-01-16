$(function(){
  $('a.folder-item').click(function(e){
    e.preventDefault();
    $(this).parent().submit();
    return false;
  });
});
