/* File start */
EC$(function() {
    //실시간 계좌이체, 에스크로 결제 수단 제외 처리
    EC$('#addr_paymethod').find("option[value='tcash']").remove();
    EC$('#addr_paymethod').find("option[value='esc_vcash']").remove();
    EC$('#payment_input_tcash').hide();
    EC$('#payment_input_esc_vcash').hide();

    // 청약 철회 방침에 동의
    EC$('#subscription').on('click', function() {
        if (EC$(this).prop('checked') === true) {
            EC$('#subscription_agreement0').prop('checked', true);
        } else {
            EC$('#subscription_agreement1').prop('checked', true);
        }
    });

    var fixLayerPriceRest = function() {
        EC$('#checked_order_count, #checked_order_price').html('').css('padding-bottom','0');
    };

    // 고정영역 빈값세팅
    fixLayerPriceRest();

    // 고정영역에 상품정보 세팅
    var fixedLayerPriceSet = function() {
        var iSumPrice = 0;
        var iCheckPrdCnt = 0;
        EC$('[id^="chk_order_cancel_list"]').each(function() {
            if (EC$(this).prop('checked') == true) {
                var sCheckId = EC$(this).attr('id');
                var aTemp = sCheckId.split('_');
                var iCheckId = aTemp[3].replace(/[^0-9]/g, '');
                var iProductPrice = aBasketProductOrderData[iCheckId].product_sum_price;
                iSumPrice = iSumPrice + iProductPrice;
                iCheckPrdCnt = iCheckPrdCnt + 1;
             }
        });
        if (iCheckPrdCnt > 0) {
            var sTotalPrice = SHOP_PRICE_FORMAT.toShopPrice(iSumPrice);
            EC$('#checked_order_count').html('<strong>' + sprintf(__('%s'),iCheckPrdCnt) + '</strong>' +'개 상품선택').css('padding-bottom','5px');
            EC$('#checked_order_price').html('결제예정금액 <strong><em>'+sTotalPrice+'</em></strong>').css('padding-bottom','5px');
        } else {
            fixLayerPriceRest();
        }

        var sPriceRef = SHOP_PRICE_FORMAT.shopPriceToSubPrice(iSumPrice);
        if (sPriceRef != '') {EC$('#checked_order_price').find('strong').append(sPriceRef);}
    };

    // 장바구니 체크박스 체크시 상품총합계, 체크한 숫자 구하기
    EC$('[id^="chk_order_cancel_list"]').on('click', function(e) {
        fixedLayerPriceSet();
    });

    // fix주문하기 버튼 클릭
    EC$('#btn_payment_fix').off().on('click', function() {
        EC$('#btn_payment').trigger('click');
    });

    // 상품리스트 전체선택
    EC$('#product_select_all').on('click', function() {
        var _status = EC$(this).data('status');

        EC$('[id^="chk_order_cancel_list"]').each(function() {
            var bChecked = EC$(this).is(":checked");

            if (_status == 'off') {
                if (bChecked === false) {EC$(this).prop('checked', true);}
            } else {
                EC$(this).prop('checked', false);
            }
        });

        EC$(this).data('status', _status == 'off' ? 'on' : 'off');
        fixedLayerPriceSet();
    });

    // 적립금, 마일리지 전체사용
    EC$('#all_use_mileage, #all_use_deposit').off().on('click', function() {
        var id = EC$(this).attr('id');
        var total_mileage = parseInt(EC$('#ori_total_avail_mileage').val());
        var total_deposit = parseInt(EC$('#ori_total_deposit').val());
        if (id == 'all_use_mileage') {
            EC$('#input_mile').val(total_mileage);
            EC$('#input_mile').trigger('blur');
        } else {
            EC$('#input_deposit').val(total_deposit);
            EC$('#input_deposit').trigger('blur');
        }
    });
});

//정기배송 이용약관 동의
function viewRegularDelivery() {
    window.open('/order/ec_orderform/agreement/regular_delivery.html?basket_type='+EC$('#basket_type').val()+'&delvtype='+getQueryString('delvtype'));
}
//쇼핑몰 이용약관 동의
function viewMallAgree() {
    window.open('/order/ec_orderform/agreement/mallagree.html?basket_type='+EC$('#basket_type').val()+'&delvtype='+getQueryString('delvtype'));
}
//비회원 구매시 개인정보수집이용동의
function viewPersonAgree() {
    window.open('/order/ec_orderform/agreement/personagree.html?basket_type='+EC$('#basket_type').val()+'&delvtype='+getQueryString('delvtype'));
}
//청약철회방침 보기
function viewSubscription() {
    window.open('/order/ec_orderform/agreement/subscription.html?basket_type='+EC$('#basket_type').val());
}
//전자보증보험 보기
function viewInsurance() {
    window.open('/order/ec_orderform/agreement/insurance.html?basket_type='+EC$('#basket_type').val()+'&delvtype='+getQueryString('delvtype'));
}
//Daum 비회원 구매 동의 보기
function viewDaum() {
    window.open('/order/ec_orderform/agreement/daum.html?basket_type='+EC$('#basket_type').val());
}
//배송정보 제공방침 동의
function viewDelivery() {
    window.open('/order/ec_orderform/agreement/delivery.html?basket_type='+EC$('#basket_type').val()+'&delvtype='+getQueryString('delvtype'));
}
//고유식별정보수집 동의
function viewIdentification() {
    window.open('/order/ec_orderform/agreement/identification.html?basket_type='+EC$('#basket_type').val()+'&delvtype='+getQueryString('delvtype'));
}
//개인정보수집 이용동의
function viewMemberJoinAgree() {
    window.open('/order/ec_orderform/agreement/privacy_agreement.html?basket_type='+EC$('#basket_type').val()+'&delvtype='+getQueryString('delvtype'));
}
//개인정보 제3자 제공 동의
function viewInformationAgree() {
    window.open('/order/ec_orderform/agreement/information_agreement.html?basket_type='+EC$('#basket_type').val()+'&delvtype='+getQueryString('delvtype'));
}
//개인정보취급 위탁 동의
function viewConsignmentAgree() {
    window.open('/order/ec_orderform/agreement/consignment_agreement.html?basket_type='+EC$('#basket_type').val()+'&delvtype='+getQueryString('delvtype'));
}
//예약결제 이용 동의
function viewCrowdfunding() {
    window.open('/order/ec_orderform/agreement/crowdfunding.html?basket_type='+EC$('#basket_type').val()+'&delvtype='+getQueryString('delvtype'));
}
function viewSafePhone() {
    if (EC_MOBILE_DEVICE == true) {
        window.open('/order/ec_orderform/popup/safePhone.html?basket_type='+EC$('#basket_type').val()+'&delvtype='+getQueryString('delvtype'));
    } else {
        window.open('/order/ec_orderform/popup/safePhone.html?basket_type='+EC$('#basket_type').val()+'&delvtype='+getQueryString('delvtype'), '', 'width=500,height=467');
    }
}

//장바구니 선택상품 삭제
function selBasketDel(id) {
    EC$('[id^="'+BASKET_CHK_ID_PREFIX+'"]').prop('checked', false);
    EC$('[id="'+id+'"]').prop('checked', true);
    Basket.deleteBasket();
}

// 도움말 툴팁
EC$('body').on('click', '.mTooltip .eTip', function(e) {
    var findSection = EC$(this).parents('.section').first();
    var findTarget = EC$(EC$(this).siblings('.tooltip'));
    var findTooltip = EC$('.tooltip');
    EC$('.mTooltip').removeClass('show');
    EC$(this).parents('.mTooltip').first().addClass('show');
    EC$('.section').css({'zIndex': 0, 'position': 'static'});
    findSection.css({'zIndex': 100, 'position': 'relative'});

    findTooltip.hide();
    findTarget.show();
    e.preventDefault();
});
EC$('body').on('click', '.mTooltip .eClose', function(e) {
    var findSection = EC$(this).parents('.section').first();
    var findTarget = EC$(this).parents('.tooltip').first();
    EC$('.mTooltip').removeClass('show');
    findTarget.hide();
    findSection.css({'zIndex': 0, 'position': 'static'});
    e.preventDefault();
});
/**
 * 원터치주문서 > 레이어 보기
 */
EC$("body").on("click", ".ec-jigsaw-eLayer", function(e) {
    var findTarget = EC$(EC$(this).attr("href"));
    //call dimmed layer position function
    dimmedLayerPosition(findTarget);
    //흰색 투명 배경 생성.
    findTarget.parent().append("<div id='dimmed_"+ findTarget.attr('id') +"' class='dimmed'></div>");
    //흰색 투명 배경이 2개 이상일경우 zindex를 높여서 처리해줌.
    if (EC$(".dimmed").length > 1) {
        EC$(".dimmed").addClass("hide");
        var propZIndex = 110 + EC$(".dimmed").length;
        EC$(findTarget).css({"zIndex": propZIndex+5});
        EC$("#dimmed_"+ findTarget.attr("id")).css({ "zIndex": propZIndex }).removeClass("hide");
    }
    e.preventDefault();
});
/**
 * 원터치주문서 > 회색 레이어 위치
 */
function dimmedLayerPosition(target) {
    if (!target.attr("fixed")) {
        var findLayer = target,
            propWinWidth = EC$(window).width(),
            propWinHeight = EC$(window).height(),
            propWidth = findLayer.outerWidth(),
            propHeight = findLayer.outerHeight(),
            propWinScroll = EC$(window).scrollTop();
        if (propWinWidth < propWidth) {
            findLayer.css({"left": 0, "marginLeft": 0});
        } else {
            var propLeft = propWidth/2;
            findLayer.css({"left": "50%", "marginLeft": "-"+ propLeft +"px"});
        }
        var propTop = (propWinHeight/2) - (propHeight/2) + propWinScroll;
        findLayer.css({"top": propTop});
        findLayer.show();
    }
}

/* File end */
