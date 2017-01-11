$(function(){
  $('a.folder-item').click(function(e){
    e.preventDefault();
    $(this).parent().submit();
    return false;
  });
  if($('div#alert-message').length > 0){
    $('div#alert-message').delay(2000).slideUp(500);
  }
});
