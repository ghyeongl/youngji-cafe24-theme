
window['getUrlParameter'] = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

(function() {

    window['CAFE24-COUNTRY'] = {
        code: 'ko_KR',
        use: true // 로컬개발용 언어변환 코드: 배포시에는 (false : 작동해제) 여야 합니다.
    };

    window['CAFE24-COUNTRY'].changeTextCode = function( LANGUAGE, SCOPE ) {

        if ( !window['CAFE24-COUNTRY'].use ) return;
        if ( getUrlParameter('langcode') ) window['CAFE24-COUNTRY'].code = getUrlParameter('langcode');

        var currentLanguage = LANGUAGE[ window['CAFE24-COUNTRY'].code ],
            $targetBlock = $( '.' + SCOPE ),
            pickupStr = $targetBlock.html();

        Object.keys( currentLanguage ).forEach(function(key) {
            pickupStr = pickupStr.replace( new RegExp("#" + key + "#", 'g') , currentLanguage[key] );
        });

        $targetBlock.html( pickupStr );

    };

})();


var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;

function gridCompatibilityforIE( contextSelector ) {

    var $gridContext = $(contextSelector),
        $gridItem = $gridContext.find('>.gridItem'),
        hasGridTemplate,
        splitGridTemplate = {},
        msGridTemplateStyle = '';

    function getInlineStyle($el, prop) {

        var styles = $el.attr("style"),
            value;

        styles && styles.split(";").forEach(function (e) {
            var style = e.split(":");
            if ($.trim(style[0]) === prop) {
                value = style[1];
            }
        });

        return value;
    }

    function changeRepeatStyle(a, b) {

        var countStr = '';
        for(var i=0, k = a; i<k; i++) countStr += ' ' + b;

        return countStr;
    }

    hasGridTemplate = getInlineStyle($gridContext, 'grid-template');

    if(hasGridTemplate) {

        splitGridTemplate.row = hasGridTemplate.split('/')[0].trim();
        splitGridTemplate.col = hasGridTemplate.split('/')[1].trim();

        if(splitGridTemplate.row.match('repeat')) {

            var repeatCount = splitGridTemplate.row.split('repeat(')[1];
            repeatCount = repeatCount.split(')')[0];
            repeatCount = repeatCount.split(',');

            msGridTemplateStyle = '-ms-grid-rows:' + changeRepeatStyle(repeatCount[0], repeatCount[1]);

        } else {
            msGridTemplateStyle = '-ms-grid-rows:' + splitGridTemplate.row;
        }

        $gridContext.attr('style', $gridContext.attr('style') + ';' + msGridTemplateStyle);

        if(splitGridTemplate.col.match('repeat')) {

            var repeatCount = splitGridTemplate.col.split('repeat(')[1];
            repeatCount = repeatCount.split(')')[0];
            repeatCount = repeatCount.split(',');

            msGridTemplateStyle = '-ms-grid-columns:' + changeRepeatStyle(repeatCount[0], repeatCount[1]);

        } else {
            msGridTemplateStyle = '-ms-grid-columns:' + splitGridTemplate.col;
        }

        $gridContext.attr('style', $gridContext.attr('style') + ';' + msGridTemplateStyle);

    }

    $gridItem.each(function(idx, element) {

        var $el = $(element),
            hasGridArea,
            msGridAreaStyle;

        hasGridArea = getInlineStyle($el, 'grid-area');
        if(hasGridArea) {
            hasGridArea = hasGridArea.split('/');
            msGridAreaStyle = '-ms-grid-row: '+hasGridArea[0]+'; -ms-grid-column: '+hasGridArea[1]+'; -ms-grid-row-span: '+(hasGridArea[2]-hasGridArea[0])+'; -ms-grid-column-span: '+(hasGridArea[3]-hasGridArea[1])+'';
            $el.attr('style', $el.attr('style') + ';' + msGridAreaStyle);
        }

    });

}

// 썸네일 이미지 엑박일경우 기본값 설정
$(window).load(function() {
    $(".thumbnail img, img.thumbImage, img.bigImage").each(function($i,$item){
        var $img = new Image();
        $img.onerror = function () {
            $item.src="//img.echosting.cafe24.com/thumb/img_product_big.gif";
        }
        $img.src = this.src;
    });
});


$(document).ready(function(){

    if ( $.browser.msie || ($.browser.mozilla == true && $.browser.version < 12) ) {

        // IE Prefix 호환
        gridCompatibilityforIE('.gridContainer');

        // Size RESET call
        var sliders = $("[id*='xans-mobile-banner-slider']");
        if(sliders.length) {

            sliders.each(function(idx, el) {
                var propName = el.id;
                propName = propName.replace(/\-/g,'_');
                window['$'+propName].setup();
            });

        }

    }

    $('body').css({'opacity':1});

    // 토글
    $('div.eToggle .title').click(function(){
        var toggle = $(this).parent('.eToggle');
        if(toggle.hasClass('disable') == false){
            $(this).parent('.eToggle').toggleClass('selected')
        }
    });

    $('dl.eToggle dt').click(function(){
        $(this).toggleClass('selected');
        $(this).next('dd').toggleClass('selected');
    });

    //장바구니 페이지 수량폼 Type 변경
    $('[id^="quantity"]').each(function() {
        $(this).get(0).type = 'tel';
    });

    // 모바일에서 공급사 테이블 th 강제조절
    $('.xans-mall-supplyinfo, .supplyInfo').find('table > colgroup').find('col').eq(0).width(98);
    $('.xans-mall-supplyinfo, .supplyInfo').find('th, td').css({padding:'13px 10px 12px'});

    /**
     *  상단탑버튼
     */
    var globalTopBtnScrollFunc = function() {
        // 탑버튼 관련변수
        var $btnTop = $('#btnTop');

        $(window).scroll(function() {
            try {
                var iCurScrollPos = $(this).scrollTop();

                if (iCurScrollPos > ($(this).height() / 2)) {
                    $btnTop.fadeIn('fast');
                } else {
                    $btnTop.fadeOut('fast');
                }
            } catch(e) { }
        });
    };

    /**
     *  구매버튼
     */
    var globalBuyBtnScrollFunc = function() {
        // 구매버튼 관련변수
        var sFixId = $('#orderFixItem').size() > 0  ? 'orderFixItem' : 'fixedActionButton',
            $area = $('#orderFixArea'),
            $item = $('#' + sFixId + '').not($area);

        $(window).scroll(function(){
            try {
                // 구매버튼 관련변수
                var iCurrentHeightPos = $(this).scrollTop() + $(this).height(),
                    iButtonHeightPos = $item.offset().top;

                if (iCurrentHeightPos > iButtonHeightPos || iButtonHeightPos < $(this).scrollTop() + $item.height()) {
                    if (iButtonHeightPos < $(this).scrollTop() - $item.height()) {
                        $area.fadeIn('fast');
                    } else {
                        $area.hide();
                    }
                } else {
                    $area.fadeIn('fast');
                }
            } catch(e) { }
        });
    };

    globalTopBtnScrollFunc();
    globalBuyBtnScrollFunc();
});

// 공통레이어팝업 오픈
var globalLayerOpenFunc = function(_this) {
    this.id = $(_this).data('id');
    this.param = $(_this).data('param');
    this.basketType = $('#basket_type').val();
    this.url = $(_this).data('url');
    this.layerId = 'ec_temp_mobile_layer';
    this.layerIframeId = 'ec_temp_mobile_iframe_layer';

    var _this = this;

    function paramSetUrl() {
        if (this.param) {
            // if isset param
        } else {
            this.url = this.basketType ?  this.url + '?basket_type=' + this.basketType : this.url;
        }
    };

    if (this.url) {
        window.ecScrollTop = $(window).scrollTop();
        $.ajax({
            url : this.url,
            success : function (data) {
                if (data.indexOf('404 페이지 없음') == -1) {
                    // 있다면 삭제
                    try { $(_this).remove(); } catch ( e ) { }

                    var $layer = $('<div>', {
                        html: $("<iframe>", { src: _this.url, id: _this.layerIframeId, scrolling: 'auto', css: { width: '100%', height: '100%', overflowY: 'auto', border: 0 } } ),
                        id: _this.layerId,
                        css : { position: 'absolute', top: 0, left:0, width: '100%', height: $(window).height(), 'z-index': 9999 }
                    });

                    $('body').append($layer);
                    $('html, body').css({'overflowY': 'hidden', height: '100%', width: '100%'});
                    $('#' + this.layerId).show();
                }
            }
        });
    }
};

// 공통레이어팝업 닫기
var globalLayerCloseFunc = function() {
    this.layerId = 'ec_temp_mobile_layer';

    if (window.parent === window)
        self.clse();
    else {
        parent.$('html, body').css({'overflowY': 'auto', height: 'auto', width: '100%'});
        parent.$('html, body').scrollTop(parent.window.ecScrollTop);
        parent.$('#' + this.layerId).remove();
    }
};

/**
 * document.location.href split
 * return array Param
 */
var getQueryString = function(sKey)
{
    var sQueryString = document.location.search.substring(1);
    var aParam = {};

    if (sQueryString) {
        var aFields = sQueryString.split("&");
        var aField  = [];
        for (var i=0; i<aFields.length; i++) {
            aField = aFields[i].split('=');
            aParam[aField[0]] = aField[1];
        }
    }

    aParam.page = aParam.page ? aParam.page : 1;
    return sKey ? aParam[sKey] : aParam;
};

// PC버전 바로 가기
var isPCver = function() {
    var sUrl = window.location.hostname;
    var aTemp = sUrl.split(".");

    var pattern = /^(mobile[\-]{2}shop[0-9]+)$/;

    if (aTemp[0] == 'm' || aTemp[0] == 'skin-mobile' || aTemp[0] == 'mobile') {
        sUrl = sUrl.replace(aTemp[0]+'.', '');
    } else if (pattern.test(aTemp[0]) === true) {
        var aExplode = aTemp[0].split('--');
        aTemp[0] = aExplode[1];
        sUrl = aTemp.join('.');
    }
    window.location.href = '//'+sUrl+'/?is_pcver=T';
};

/* 도움말 */
$('body').delegate('.ec-base-tooltip-area .eTip', 'click', function(e){
    var findArea = $($(this).parents('.ec-base-tooltip-area'));
    var findTarget = $($(this).siblings('.ec-base-tooltip'));
    var findTooltip = $('.ec-base-tooltip');
    $('.ec-base-tooltip-area').removeClass('show');
    $(this).parents('.ec-base-tooltip-area:first').addClass('show');
    findTooltip.hide();
    findTarget.show();
    e.preventDefault();
});

$('body').delegate('.ec-base-tooltip-area .eClose', 'click', function(e){
    var findTarget = $(this).parents('.ec-base-tooltip:first');
    $('.ec-base-tooltip-area').removeClass('show');
    findTarget.hide();
    e.preventDefault();
});

$('.ec-base-tooltip-area').find('input').focusout(function() {
    var findTarget = $(this).parents('.ec-base-tooltip-area').find('.ec-base-tooltip');
    $('.ec-base-tooltip-area').removeClass('show');
    findTarget.hide();
});

/**
 * 컴포넌트와 연동되는 기본 기능
 */
$(window).load(function() {

    /**
     * 가로형 스크롤바 제어
     */
    if( $('.horizontal-scrollable').length ) {

        $('.horizontal-scrollable').mCustomScrollbar({
            axis:"x",
            theme:"dark-2",
            autoExpandScrollbar: false,
            autoHideScrollbar: true,
            updateOnContentResize: true,
            mouseWheel:{ enable: true, scrollAmount: 140 }
        });

    }

    if($('.eProductSort').length) {

        $('.eProductSort').each(function() {

            $(this).find('button').click(function() {
                if ($(this).hasClass('selected')) {

                } else {
                    $(this).addClass('selected');
                    $(this).siblings('button').removeClass('selected');
                    if ($(this).hasClass('smallView')) {
                        $(this).parent('.eProductSort').next('.prdList').addClass('small');
                    }else{
                        $(this).parent('.eProductSort').next('.prdList').removeClass('small');
                    }
                }
            });

        });

    }


});


/** 모바일쇼핑몰 슬라이딩메뉴 **/
$(document).ready(function(){
    $('#header .header').append('<div id="dimmedSlider"></div>');
    var offCover = {
        init : function() {
            $(function() {
                offCover.resize();
                $(window).resize(function(){
                    offCover.resize();
                });
            });
        },
        layout : function(){
            if ($('html').hasClass('expand')) {
                $('#aside').css({'visibility':'visible'});
                $('html, body').css({"overflow-x":""})
            } else {
                setTimeout(function(){
                    $('#aside').css({'visibility':''});
                }, 300);
            }
            $('#aside').css({'visibility':'visible'});
        },
        resize : function(){
            var height = $('body').height();
            $('#container').css({'min-height':height});
        }
    };
    offCover.init();

    $('#header .btnCate, #aside .btnClose').click(function(e){
        e.preventDefault();
        $('#dimmedSlider').toggle();
        $('html').toggleClass('expand');

        $('#dimmedSlider').one('click', function(e) {
            $('html').toggleClass('expand');
            $('#dimmedSlider').toggle();
        });
        offCover.layout();

    });

    if( getUrlParameter('PREVIEW_SDE') == 1 ) {
        // $('#header .btnCate').trigger('click');
    }

});
