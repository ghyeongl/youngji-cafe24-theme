$(document).ready(function(){
    // 등록카드 정보조회
    $('.ec-base-tooltip .close').live('click', function() {
        $(this).parent().hide();
        $(this).parent().parent().find('span.arrow').hide();
        return false;
    });
});