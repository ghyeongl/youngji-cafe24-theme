/**
 * 카테고리 리스트 상품 정렬
 */
var aUrl = location.href.split('?');
var sQueryString = aUrl[1];

$(document).ready(function(){
    if (sQueryString && sQueryString.indexOf('sort_method') > -1) {
        for (var i=0; i<$('#selArray option').length; i++) {
            if ($('#selArray option:eq('+i+')').val().indexOf(sQueryString) > -1) {
                $('#selArray option:eq('+i+')').attr("selected", true);
            }
        }
    }
});

$('#selArray').change(function() {
    if ($('#selArray').val()) {
        location.href=$('#selArray').val();
    }
});

function goThumg(url) {
    location.href = url+'?'+sQueryString;
}

$('#order_by').change(function() {

    if(!sQueryString){
        return;
    }

    if ($(this).find('option:selected').val()) {
        if (sQueryString.indexOf('order_by') == -1) {
            location.href = location.href+'&order_by='+$(this).find('option:selected').val();
        } else {
            aParam = sQueryString.split('&');
            for(var x in aParam) {
                if (aParam[x].indexOf('order_by') > -1) {
                    aParam[x] = 'order_by='+$(this).find('option:selected').val();
                }
            }
            location.href = aUrl[0] +'?'+aParam.join('&');
        }
    }

});

