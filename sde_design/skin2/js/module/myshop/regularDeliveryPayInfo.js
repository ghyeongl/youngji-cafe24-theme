$(document).ready(function(){
    // 등록카드 정보조회
    // $('.regularDeliveryPayInfo .cardSearch').bind('click', function() {
    //     $('.regularDeliveryPayInfo').find('.ec-base-tooltip').show();
    // });
    $('.ec-base-tooltip .close').live('click', function() {
        $(this).parent().hide();
        $(this).parent().parent().find('span.arrow').hide();
        return false;
    });
});