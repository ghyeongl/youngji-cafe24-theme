$(document).ready(function(){
    $('.ec-base-tab li a').click(function(e){
        $(this).parent().addClass('selected').siblings().removeClass('selected');
    });
});