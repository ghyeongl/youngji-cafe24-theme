// Tab event
$('#tabProduct a').click(function(e){
    var oTarget = $(this).attr('href');
    $(this).parent('li').addClass('selected').siblings().removeClass('selected');

    $('#tabProduct a').each(function(){
        var oSiblings = $(this).attr('href');
        if (oTarget != oSiblings) {
            $(oSiblings).hide();
        } else {
            $(oTarget).show();
        }
    });
    removePagingArea(oTarget);
});


function removePagingArea(oTarget)
{
    if ($(oTarget).length < 1 && (oTarget != '#prdReview' || oTarget != '#prdQna')) return;

    if ($(oTarget).css('display') == 'block') {
        if (oTarget == '#prdReview') {
            //var record = $('#prdReview .xans-record-:first', '.xans-product-review');
            var record = $('.xans-record-:first', '.xans-product-review');
            if (record.length < 1 || record.is(':not(:visible)')) {
                $('.xans-product-reviewpaging').remove();
             }
         } else if (oTarget == '#prdQnA') {
             //var record = $('#prdQnA .xans-record-:first', 'xans-product-qna');
             var record = $('.xans-record-:first', '.xans-product-qna');
             if (record.length < 1 || record.is(':not(:visible)')) {
                 $('.xans-product-qnapaging').remove();
             }
         }
     }
}

$(document).ready(function() {

    $('#actionCartClone, #actionWishClone, #actionBuyClone, #actionWishSoldoutClone').unbind().bind('click', function() {
        try {
            var id = $(this).attr('id').replace(/Clone/g, '');
            if (typeof(id) !== 'undefined') $('#' + id).trigger('click');
            else return false;
        } catch(e) {
            return false;
        }
    });

    function productDetailOrigin(){
        var imgChk = $('#prdDetailContent').find('img').length;
        if(imgChk <= 0){
            $('#prdDetailBtn').remove();
        }
    } productDetailOrigin();

    // Add Image
    var oTarget = $('.xans-product-mobileimage ul li');
    var oAppend = oTarget.first().children('p').clone();

    oTarget.not(':first').each(function() {
        $(this).children().wrap(function() {
            return '<p class="thumbnail">' + $(this).html() + oAppend.html() + '</p>';
        });

        $(this).children('p').children('img:first').remove();
    });
});
