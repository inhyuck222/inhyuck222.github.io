console.log('This would be the main JS file.');
$(document).ready(function() {
   $('img').mouseenter(function() {
       $(this).animate({
           height: '+=10px'
       });
   });
   $('img').mouseleave(function() {
       $(this).animate({
           height: '-=10px'
       }); 
   });
   $('img').click(function() {
       $(this).toggle(1000);
   }); 
});


$(document).ready(function() {
    $("#menu").accordion({collapsible: true, active: false});
});
