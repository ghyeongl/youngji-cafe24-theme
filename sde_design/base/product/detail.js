document.addEventListener('DOMContentLoaded', function() {
    var $scope = $(".dnd_module_9742c60d3a2ee81fffada3eade8d931d");
    $scope.find('.headerMenu .btnSearch').unbind('click.btnSearch').bind('click.btnSearch', function () {
        var $header = $(this).closest('#header');
        $header.addClass('open');
        $header.find('#dimmedSlider').one("click", function () {
            $header.removeClass('open');
        });
    });
    $('.xans-layout-searchheader').find('button.btnDelete').unbind('click.btnDelete').bind('click.btnDelete', function () {
        $('.topSearch').find('input#keyword').attr('value', '').focus();
    });
});
(function() {
    function pageLoaded(){
    }
    function dndComponent() {
  
        var $scope = $(".dnd_module_c785e267507864e0f86dfc2033986f74");
        var calculateNavigationCategoryTimer = null,
            $navigation = $scope.find("#navigation");
  
        function calculateNavigationCategory() {
  
            var $navigationCategory = $("#navigation > .inner .category"),
                $categoryChild = $navigationCategory.children(),
                calculate = 0;
  
            if(!$navigationCategory.length) return;
  
            $categoryChild.each( function( idx ) {
                calculate = calculate + $(this).outerWidth(true) + parseInt( $( this ).css('marginLeft'),10 );
            } );
  
            if( $navigationCategory.width() < calculate + 50 ) {
  
                $("#navigation").addClass('isShort');
  
            } else {
  
                $("#navigation").removeClass('isShort');
  
            }
  
        }
  
        if( $navigation.length ) {
  
            $(window).bind('resize.calculateNavigationCategory', function() {
                if(calculateNavigationCategoryTimer) clearTimeout( calculateNavigationCategoryTimer );
                calculateNavigationCategoryTimer = setTimeout(calculateNavigationCategory, 100);
            }).trigger("resize.calculateNavigationCategory");
  
        }
  
        $scope.find('.eToggleCateLayer').click(function () {
            $scope.find('> nav').toggleClass('open');
            $('.navDimmed').toggleClass('show');
        });
  
    }
  
    if (document.readyState == 'complete') {
        dndComponent();
    } else {
        document.addEventListener('DOMContentLoaded', dndComponent);
        document.addEventListener('DOMContentLoaded', pageLoaded);
    }
  
})();
(function() {
    function pageLoaded() {
    }
    function dndComponent() {
        var $scope = $('.dnd_module_a240bc49ca24f8328aa623df4b028fda'),
            $swiperCarousel = $scope.find(".swiper-carousel"),
            $swiperSlide = $scope.find(".swiper-slide");
        if( $swiperCarousel.length && $swiperSlide.length >1 ) {
            $swiperCarousel.each( function(idx) {
                var $self = $(this),
                    $wrapper = $self.find('.swiper-wrapper'),
                    $children = $wrapper.children(),
                    calculate = 0;
                $children.each(function(idx) { calculate += $(this).outerWidth(true); });
                new Swiper(this, {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 0,
                    longSwipesRatio: 1,
                    setWrapperSize: calculate,
                    pagination: {
                        el: '.navigation',
                        clickable: true,
                    },
                    breakpoints: {
                        // when window width is <= 320px
                        320: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                            // spaceBetween: 10
                        },
                        // when window width is <= 480px
                        480: {
                            slidesPerView: 1,
                            slidesPerGroup: 1
                            // spaceBetween: 20
                        }
                    }
                });
            });
        }
        
         $('.dnd_module_a240bc49ca24f8328aa623df4b028fda .eProductDetailInfo').live('click', function() {
            var aProductId = $(this).attr('id').split('_');
            var iProductNum = aProductId[1];
            if ($('#eDescriptionToggle_' + iProductNum).hasClass('selected') === true) {
                $('#product_description_'+iProductNum).hide();
                $('#eDescriptionToggle_' + iProductNum).removeClass('selected');
            } else {
                $('.eProductDetailInfo').removeClass('selected');
                ProductSet.getProductDetailInfo($(this));
                $('#eDescriptionToggle_' + iProductNum).addClass('selected');
            }
        });        
    }
    if (document.readyState == 'complete') {
        dndComponent();
    } else {
        document.addEventListener('DOMContentLoaded', dndComponent);
        document.addEventListener('DOMContentLoaded', pageLoaded);
    }
})();
document.addEventListener('DOMContentLoaded', function() {
    var $scope = $(".dnd_module_92dd6f7ac13d81237bb5f8047fb78f58");
    // 상품상세 탭 이벤트
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
        if(e) e.preventDefault();
    });
    // 해당 게시판 읽기권한 없으면 페이징 삭제
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
    //상품상세 productSet 추가구성 상품, 세트 상품
    var productSetToggle = function(){
        $('.productSet .eToggleSet').live('click', function(){
            $(this).parents('.productSet').toggleClass('closed');
            $(this).parents('.productSet').find('.product').slideToggle();
        });
    };
    $(document).ready(function() {
        productSetToggle();
        // 장바구니, 관심상품, 구매버튼 클론들 액션처리
        /* edibot에는 이러한 아이디가 없으므로 주석   2020/6/30
        $('#actionCartClone, #actionWishClone, #actionBuyClone, #actionWishSoldoutClone').unbind().bind('click', function() {
            try {
                var id = $(this).attr('id').replace(/Clone/g, '');
                if (typeof(id) !== 'undefined') $('#' + id).trigger('click');
                else return false;
            } catch(e) {
                return false;
            }
        });
        */
        // 상품상세설명 없을때 원본보기 삭제
        function productDetailOrigin(){
            var imgChk = $('#prdDetailContent').find('img').length;
            if(imgChk <= 0){
                $('#prdDetailBtn').remove();
            }
        } productDetailOrigin();
        // 추가 이미지에 이미지 꾸미기 아이콘 적용
        /*edibot은 이 클래스가 없기 때문에주석     2020/6/30
        var oTarget = $('.xans-product-mobileimage ul li');
        var oAppend = oTarget.first().children('p').clone();
        oTarget.not(':first').each(function() {
            $(this).children().wrap(function() {
                return '<p class="thumbnail">' + $(this).html() + oAppend.html() + '</p>';
            });
            $(this).children('p').children('img:first').remove();
        });
        */
        //상품상세 확대보기
        /*	edibot은 이 기능이 없으므로 주석       2020/6/30
        $.fn.prdZoom = function(param){
            var ul     = param.target.find('.xans-product-addimage > ul'),
                detail = param.target.find('a#prdDetailImg'),
                swipe  = param.target.find('.xans-product-mobileimage > ul > li'),
                add    = param.target.find('.xans-product-addimage > ul > li');
            var zoom = {
                init : function(){
                    function structMobile(){
                        swipe.unbind().bind('click', function(){
                            var sZoomUrl = '/product/image_zoom.html' + $(this).data('param') + '&order=' + $(this).index();
                            zoom.showZoom(sZoomUrl);
                        });
                        add.mouseover(function(){
                            try {
                                $xans_product_mobileimage_slider_0.moveTab($(this).index());
                            } catch (e) { }
                            detail.data('order', $(this).index());
                        });
                        detail.unbind().bind('click', function(){
                            var iOrder =  $(this).data('order') || 0,
                                sZoomUrl = '/product/image_zoom.html' + $(this).data('param') + '&order=' + iOrder;
                            zoom.showZoom(sZoomUrl);
                        });
                    }
                    structMobile();
                },
                showZoom : function(sZoomUrl){
                    window.open(sZoomUrl, 'image_zoom', 'toolbar=no,scrollbars=auto,resizable=yes,width=560,height=710,left=0,top=0', this);
                    return false;
                }
            }
            zoom.init();
        };
        // 함수호출 : 상품상세 페이지
        $.fn.prdZoom({
            target : $('.xans-product-image')
        });
        */
    });
    /**
                         * 상품상세 사용후기
                         */
    $(document).ready(function(){
        $('.xans-product-review a').click(function(e) {
            e.preventDefault();
            var no = $(this).attr('href').replace(/(\S*)[?&]no=(\d+)(\S*)/g, '$2');
            var $obj = $('#product-review-read_'+no);
            //로드된 엘리먼트 존재 체크
            if ($obj.length > 0) {
                if ($obj.css('display') =='none') {
                    $obj.show();
                } else {
                    $obj.hide();
                }
                return;
            }
            REVIEW.getReadData($(this));
        });
        // 구매후기 탭 바로 활성화처리
        var href = document.location.href.split('#')[1];
        if (href == 'use_review' || href == 'prdReview') {
            $('a[name="use_review"]').trigger('click');
        }
    });
    var PARENT = '';
    var OPEN_REVIEW = '';
    window['REVIEW'] = {
        getReadData : function(obj, eType)
        {
            if (obj != undefined) {
                PARENT = obj;
                var sHref = obj.attr('href');
                var pNode = obj.parents('li');
                var pass_check = '&pass_check=F';
            } else {
                var sHref = PARENT.attr('href');
                var pNode = PARENT.parents('li');
                var pass_check = '&pass_check=T';
            }
            var sQuery = sHref.split('?');
            var sQueryNo = sQuery[1].split('=');
            if (OPEN_REVIEW == sQueryNo[1]) {
                $('#product-review-read').remove();
                OPEN_REVIEW = '';
                return false;
            } else {
                OPEN_REVIEW = sQueryNo[1];
            }
            $.ajax({
                url : '/exec/front/board/product/4?'+sQuery[1]+pass_check,
                dataType: 'json',
                success: function(data) {
                    $('#product-review-read').remove();
                    var sPath = document.location.pathname;
                    var sPattern = /^\/product\/(.+)\/([0-9]+)(\/.*)/;
                    var aMatchResult = sPath.match(sPattern);
                    if (aMatchResult) {
                        var iProductNo = aMatchResult[2];
                    } else {
                        var iProductNo = getQueryString('product_no');
                    }
                    var aHtml = [];
                    //읽기 권한 체크
                    if (false === data.read_auth && eType == undefined) {
                        alert(decodeURIComponent(data.alertMSG));
                        return false;
                    }
                    if (data.is_secret == true) {
                        // 비밀글 비밀번호 입력 폼
                        aHtml.push('<form name="SecretForm_4" id="SecretForm_4">');
                        aHtml.push('<input type="text" name="a" style="display:none;">');
                        aHtml.push('<div class="view secret">');
                        aHtml.push('<span class="alert">이 글은 비밀글입니다.</span>');
                        aHtml.push('<div class="formGroup"><input type="password" id="secure_password" name="secure_password" onkeydown="if (event.keyCode == 13) '+data.action_pass_submit+'"> <input type="button" value="확인" onclick="'+data.action_pass_submit+'" class="button"></div>');
                        aHtml.push('</div>');
                        aHtml.push('</form>');
                    } else {
                        // 글 내용
                        if (data.read['content_image'] != null) {
                            var sImg = data.read['content_image'];
                        } else {
                            var sImg = '';
                        }
                        aHtml.push('<div class="view comment">');
                        aHtml.push('<div id="ec-ucc-media-box-'+ data.read['no'] +'"></div>');
                        aHtml.push('<p>'+data.read['content']+'</p>');
                        aHtml.push('<p>'+sImg+'</p>');
                        aHtml.push('<div class="formGroup">');
                        if (data.comment != undefined) {
                            aHtml.push('<div class="gLeft">');
                            aHtml.push('<a href="#none" class="btnReply" onclick="REVIEW.comment_view('+data.read['no']+');">댓글 <span class="number">'+data.read['comment_count']+'</span></a>');
                            aHtml.push('</div>');
                        }
                        aHtml.push('<div class="gRight">');
                        aHtml.push('<a href="/board/product/modify.html?board_act=edit&no='+data.no+'&board_no=4&link_product_no='+iProductNo+'" class="button theme1">수정</a>');
                        if (data.comment != undefined) {
                            aHtml.push('<a href="#none" class="button theme2" onclick="REVIEW.comment_write(this);">댓글쓰기</a>');
                        }
                        aHtml.push('</div></div>');
                        // 댓글리스트
                        if (data.comment != undefined && data.comment.length != undefined) {
                            aHtml.push('<ul class="brdCmt" id="commentList_'+data.read['no']+'" style="display:none;">');
                            for (var i=0; data.comment.length > i; i++) {
                                //댓글리스트
                                if (data.comment[i]['comment_reply_css'] == undefined) {
                                    aHtml.push('<li id="'+data.comment[i]['comment_reply_id']+'">');
                                    aHtml.push('<div class="info">');
                                    aHtml.push('<span class="point '+data.use_point+'"><img src="//img.echosting.cafe24.com/skin/dnd_ko_KR/common/module/board/ico_star'+data.comment[i]['comment_point_count']+'.png" alt="'+data.comment[i]['comment_point_count']+'점" height="10" /></span>');
                                    aHtml.push('<span class="writer" title="작성자">'+data.comment[i]['comment_name']+'</span>');
                                    aHtml.push('<span class="regdate" title="작성일">'+data.comment[i]['comment_write_date']+'</span>');
                                    aHtml.push('</div>');
                                    aHtml.push('<div class="comment">'+data.comment[i]['comment_content']+'</div>');
                                    if (data.comment[i]['comment_reply_display'] == true) {
                                        aHtml.push('<div class="formGroup">'+'<div class="gLeft">');
                                        aHtml.push('<a href="#none" class="btnReply replyList" onclick="REVIEW.comment_reply_view('+data.comment[i]['comment_no']+')">댓글의 댓글 <span class="number">'+data.comment[i]['comment_reply_count']+'</span></a>');
                                        aHtml.push('</div>');
                                        aHtml.push('<div class="gRight">');
                                        aHtml.push('<a href="#none" class="button theme2" onclick="'+data.comment[i]['action_comment_reply_new']+'">쓰기</a>');
                                        aHtml.push('</div>');
                                        aHtml.push('</div>');
                                    }
                                    aHtml.push('</li>');
                                } else {
                                    //댓글의 댓글리스트
                                    aHtml.push('<li class="replyArea" style="display:none;" id="'+data.comment[i]['comment_reply_id']+'">');
                                    aHtml.push('<div class="info">');
                                    aHtml.push('<span class="writer" title="작성자">'+data.comment[i]['comment_name']+'</span>');
                                    aHtml.push('<span class="regdate" title="작성일">'+data.comment[i]['comment_write_date']+'</span>');
                                    aHtml.push('</div>');
                                    aHtml.push('<div class="comment">'+data.comment[i]['comment_content']+'</div>');
                                    aHtml.push('</li>');
                                }
                            }
                            aHtml.push('</ul>');
                        }
                        // 댓글쓰기
                        if (data.comment_write != undefined) {
                            aHtml.push('<form name="commentWriteForm_4'+data.key+'" id="commentWriteForm_4'+data.key+'" style="display:none;">');
                            aHtml.push('<div class="brdCmtWrite">');
                            aHtml.push('<div class="brdEditor">');
                            aHtml.push('<strong class="titEditor">댓글쓰기</strong>');
                            aHtml.push('<div class="info"><span class="name">' +data.comment_write['comment_name']+ '</span><span class="password">' +data.comment_write['comment_password']+ '</span></div>');
                            aHtml.push('<p class="help ' +data.comment_write['password_rule_help_display_class']+ '">영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자</p>');
                            aHtml.push('<span class="comment">' +data.comment_write['comment']+ '<span class="byte ' +data.comment_write['use_comment_size']+ '">/ byte</span>' + '</span>');
                            aHtml.push('<div class="byteRating ' +data.comment_write['use_point']+ '"><strong class="label">평점</strong>' +'<span class="rating">' +data.comment_write['comment_point']+ '</span></div>');
                            aHtml.push('<div class="captcha ' +data.comment_write['use_captcha']+ '"><span class="image">' +data.comment_write['captcha_image']+data.comment_write['captcha_refresh']+'</span><div class="form">'+data.comment_write['captcha']+ '</div><p class="help">위에 보이는 문자를 공백없이 입력하세요. (대소문자구분)</p></div>');
                            aHtml.push('<div class="formGroup"><div class="gLeft"></div><div class="gRight"><a href="#none" onclick="' +data.comment_write['action_comment_insert']+ '" class="button large theme2">등록하기</a></div></div>');
                            aHtml.push('</div>');
                            aHtml.push('</div>');
                            aHtml.push('</form>');
                        }
                        // 댓글의 댓글쓰기
                        if (data.comment_reply != undefined) {
                            aHtml.push('<form name="commentReplyWriteForm_4'+data.key+'" id="commentReplyWriteForm_4'+data.key+'" style="display:none;">');
                            aHtml.push('<div class="brdCmtReply">');
                            aHtml.push('<div class="brdEditor">');
                            aHtml.push('<strong class="titEditor">댓글의 댓글쓰기</strong>');
                            aHtml.push('<div class="info"><span class="name">' +data.comment_reply['comment_name']+ '</span><span class="password">' +data.comment_reply['comment_password']+ '</span></div>');
                            aHtml.push('<p class="help ' +data.comment_reply['password_rule_help_display_class']+ '">영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자</p>');
                            aHtml.push('<span class="comment">' +data.comment_reply['comment']+ '<span class="byte ' +data.comment_reply['use_comment_size']+ '">/ byte</span>' + '</span>');
                            aHtml.push('<div class="byteRating ' +data.comment_reply['use_point']+ '"><strong class="label">평점</strong>' +'<span class="rating">' +data.comment_reply['comment_point']+ '</span></div>');
                            aHtml.push('<div class="captcha ' +data.comment_reply['use_captcha']+ '"><span class="image">' +data.comment_reply['captcha_image']+data.comment_reply['captcha_refresh']+'</span><div class="form">'+data.comment_reply['captcha']+ '</div><p class="help">위에 보이는 문자를 공백없이 입력하세요. (대소문자구분)</p></div>');
                            aHtml.push('<div class="formGroup"><div class="gLeft"></div><div class="gRight"><a href="#none" onclick="' +data.comment_reply['action_comment_insert']+ '" class="button large theme2">등록하기</a></div></div>');
                            aHtml.push('</div>');
                            aHtml.push('</div>');
                            aHtml.push('</form>');
                        }
                    }
                    $(pNode).after('<li id="product-review-read'+data.key+'" class="contentView">'+aHtml.join('')+'</li>');
                    // 평점기능 사용안함일 경우 보여지는 td를 조절하기 위한 함수
                    PRODUCT_COMMENT.comment_colspan(pNode);
                    if (data.comment_write != undefined && data.comment_write['use_comment_size'] == '') PRODUCT_COMMENT.comment_byte(4, data.key);
                    if (data.comment_reply != undefined && data.comment_write['use_comment_size'] == '') PRODUCT_COMMENT.comment_byte(4, data.key, 'commentReplyWriteForm');
                    if (data.read['ucc_url']) $('#ec-ucc-media-box-'+ data.read['no']).replaceWith(APP_BOARD_UCC.getPreviewElement(data.read['ucc_url']));
                }
            });
        },
        // 댓글 보기
        comment_view : function (sId)
        {
            if ($('#commentList_'+sId).css('display') == 'none') {
                $('#commentList_'+sId).show();
            } else {
                $('#commentList_'+sId).hide();
            }
        },
        // 댓글의 댓글 보기
        comment_reply_view : function (iCommentNo)
        {
            $('[id^="replyArea_'+iCommentNo+'_"]').each(function(e) {
                if ($(this).css('display') == 'none') {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        },
        // 댓글 쓰기
        comment_write : function (e)
        {
            var $form = $("#commentWriteForm_4");
            if ($form.css('display') == 'none') {
                $form.css('display', 'block');
                var $p = $(e).parent().parent();
                if ( $(e).parent().find('#commentWriteForm_4').length < 1 ) {
                    $p.after($form);
                }
            } else {
                $form.hide();
            }
        },
        END : function() {}
    };
});
document.addEventListener('DOMContentLoaded', function() {
    /**
                         * 상품상세 Q&A
                         */
    $(document).ready(function(){
        $('.xans-product-qna a').click(function(e) {
            e.preventDefault();
            var no = $(this).attr('href').replace(/(\S*)[?&]no=(\d+)(\S*)/g, '$2');
            var $obj = $('#product-qna-read_'+no);
            //로드된 엘리먼트 존재 체크
            if ($obj.length > 0) {
                if ($obj.css('display') =='none') {
                    $obj.show();
                } else {
                    $obj.hide();
                }
                return;
            }
            QNA.getReadData($(this));
        });
        // qna 탭 바로 활성화처리
        var href = document.location.href.split('#')[1];
        if (href == 'use_qna' || href == 'prdQnA') {
            $('a[name="use_qna"]').trigger('click');
        }
    });
    var PARENT = '';
    var OPEN_QNA = '';
    window["QNA"] = {
        getReadData : function(obj, eType)
        {
            if (obj != undefined) {
                PARENT = obj;
                var sHref = obj.attr('href');
                var pNode = obj.parents('li');
                var pass_check = '&pass_check=F';
            } else {
                var sHref = PARENT.attr('href');
                var pNode = PARENT.parents('li');
                var pass_check = '&pass_check=T';
            }
            var sQuery = sHref.split('?');
            var sQueryNo = sQuery[1].split('=');
            if (OPEN_QNA == sQueryNo[1]) {
                $('#product-qna-read').remove();
                OPEN_QNA = '';
                return false;
            } else {
                OPEN_QNA = sQueryNo[1];
            }
            $.ajax({
                url : '/exec/front/board/product/6?'+sQuery[1]+pass_check,
                dataType: 'json',
                success: function(data) {
                    $('#product-qna-read').remove();
                    var sPath = document.location.pathname;
                    var sPattern = /^\/product\/(.+)\/([0-9]+)(\/.*)/;
                    var aMatchResult = sPath.match(sPattern);
                    if (aMatchResult) {
                        var iProductNo = aMatchResult[2];
                    } else {
                        var iProductNo = getQueryString('product_no');
                    }
                    var aHtml = [];
                    //읽기 권한 체크
                    if (false === data.read_auth && eType == undefined) {
                        alert(data.alertMSG);
                        return false;
                    }
                    if (data.is_secret == true) {
                        // 비밀글 비밀번호 입력 폼
                        aHtml.push('<form name="SecretForm_6" id="SecretForm_6">');
                        aHtml.push('<input type="text" name="a" style="display:none;">');
                        aHtml.push('<div class="view secret">');
                        aHtml.push('<span class="alert">이 글은 비밀글입니다.</span>');
                        aHtml.push('<div class="formGroup"><input type="password" id="secure_password" name="secure_password" onkeydown="if (event.keyCode == 13) '+data.action_pass_submit+'"> <input type="button" value="확인" onclick="'+data.action_pass_submit+'" class="button"></div>');
                        aHtml.push('</div>');
                        aHtml.push('</form>');
                    } else {
                        // 글 내용
                        if (data.read['content_image'] != null) {
                            var sImg = data.read['content_image'];
                        } else {
                            var sImg = '';
                        }
                        aHtml.push('<div class="view comment">');
                        aHtml.push('<div id="ec-ucc-media-box-'+ data.read['no'] +'"></div>');
                        aHtml.push('<p>'+data.read['content']+'</p>');
                        aHtml.push('<p>'+sImg+'</p>'); 
                        aHtml.push('<div class="formGroup">');
                        if (data.comment != undefined) {
                            aHtml.push('<div class="gLeft">');
                            aHtml.push('<a href="#none" class="btnReply" onclick="QNA.comment_view('+data.read['no']+');">댓글 <span class="number">'+data.read['comment_count']+'</span></a>');
                            aHtml.push('</div>');
                        }
                        aHtml.push('<div class="gRight">');
                        aHtml.push('<a href="/board/product/modify.html'+ data.read['param_modify'] +'&link_product_no='+iProductNo+'" class="button theme1">수정</a>');
                        if (data.comment != undefined) {
                            aHtml.push('<a href="#none" class="button theme2" onclick="QNA.comment_write(this);">댓글쓰기</a>');
                        }
                        aHtml.push('</div></div>');
                        // 댓글리스트
                        if (data.comment != undefined && data.comment.length != undefined) {
                            aHtml.push('<ul class="brdCmt" id="commentList_'+data.read['no']+'" style="display:none;">');
                            for (var i=0; data.comment.length > i; i++) {
                                //댓글리스트
                                if (data.comment[i]['comment_reply_css'] == undefined) {
                                    aHtml.push('<li id="'+data.comment[i]['comment_reply_id']+'">');
                                    aHtml.push('<div class="info">');
                                    aHtml.push('<span class="point '+data.use_point+'"><img src="//img.echosting.cafe24.com/skin/dnd_ko_KR/common/module/board/ico_star'+data.comment[i]['comment_point_count']+'.png" alt="'+data.comment[i]['comment_point_count']+'점" height="10" /></span>');
                                    aHtml.push('<span class="writer" title="작성자">'+data.comment[i]['comment_name']+'</span>');
                                    aHtml.push('<span class="regdate" title="작성일">'+data.comment[i]['comment_write_date']+'</span>');
                                    aHtml.push('</div>');
                                    aHtml.push('<div class="comment">'+data.comment[i]['comment_content']+'</div>');
                                    if (data.comment[i]['comment_reply_display'] == true) {
                                        aHtml.push('<div class="formGroup">'+'<div class="gLeft">');
                                        aHtml.push('<a href="#none" class="btnReply replyList" onclick="QNA.comment_reply_view('+data.comment[i]['comment_no']+')">댓글의 댓글 <span class="number">'+data.comment[i]['comment_reply_count']+'</span></a>');
                                        aHtml.push('</div>');
                                        aHtml.push('<div class="gRight">');
                                        aHtml.push('<a href="#none" class="button theme2" onclick="'+data.comment[i]['action_comment_reply_new']+'">쓰기</a>');
                                        aHtml.push('</div>');
                                        aHtml.push('</div>');
                                    }
                                    aHtml.push('</li>');
                                } else {
                                    //댓글의 댓글리스트
                                    aHtml.push('<li class="replyArea" style="display:none;" id="'+data.comment[i]['comment_reply_id']+'">');
                                    aHtml.push('<div class="info">');
                                    aHtml.push('<span class="name" title="작성자">'+data.comment[i]['member_icon']+' '+data.comment[i]['comment_name']+'</span>');
                                    aHtml.push('<span class="regdate" title="작성일">'+data.comment[i]['comment_write_date']+'</span>');
                                    aHtml.push('</div>');
                                    aHtml.push('<div class="comment">'+data.comment[i]['comment_content']+'</div>');
                                    aHtml.push('</li>');
                                }
                            }
                            aHtml.push('</ul>');
                        }
                        // 댓글쓰기
                        if (data.comment_write != undefined) {
                            aHtml.push('<form name="commentWriteForm_6'+data.key+'" id="commentWriteForm_6'+data.key+'" style="display:none;">');
                            aHtml.push('<div class="brdCmtWrite">');
                            aHtml.push('<div class="brdEditor">');
                            aHtml.push('<strong class="titEditor">댓글쓰기</strong>');
                            aHtml.push('<div class="info"><span class="name">' +data.comment_write['comment_name']+ '</span><span class="password">' +data.comment_write['comment_password']+ '</span></div>');
                            aHtml.push('<p class="help ' +data.comment_write['password_rule_help_display_class']+ '">영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자</p>');
                            aHtml.push('<span class="comment">' +data.comment_write['comment']+ '<span class="byte ' +data.comment_write['use_comment_size']+ '">/ byte</span>' + '</span>');
                            aHtml.push('<div class="byteRating ' +data.comment_write['use_point']+ '"><strong class="label">평점</strong>' +'<span class="rating">' +data.comment_write['comment_point']+ '</span></div>');
                            aHtml.push('<div class="captcha ' +data.comment_write['use_captcha']+ '"><span class="image">' +data.comment_write['captcha_image']+data.comment_write['captcha_refresh']+'</span><div class="form">'+data.comment_write['captcha']+ '</div><p class="help">위에 보이는 문자를 공백없이 입력하세요. (대소문자구분)</p></div>');
                            aHtml.push('<div class="formGroup"><div class="gLeft"></div><div class="gRight"><a href="#none" onclick="' +data.comment_write['action_comment_insert']+ '" class="button large theme2">등록하기</a></div></div>');
                            aHtml.push('</div>');
                            aHtml.push('</div>');
                            aHtml.push('</form>');
                        }
                        if (data.comment_reply != undefined) {
                            aHtml.push('<form name="commentReplyWriteForm_6'+data.key+'" id="commentReplyWriteForm_6'+data.key+'" style="display:none;">');
                            aHtml.push('<div class="brdCmtReply">');
                            aHtml.push('<div class="brdEditor">');
                            aHtml.push('<strong class="titEditor">댓글의 댓글쓰기</strong>');
                            aHtml.push('<div class="info"><span class="name">' +data.comment_reply['comment_name']+ '</span><span class="password">' +data.comment_reply['comment_password']+ '</span></div>');
                            aHtml.push('<p class="help ' +data.comment_reply['password_rule_help_display_class']+ '">영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자</p>');
                            aHtml.push('<span class="comment">' +data.comment_reply['comment']+ '<span class="byte ' +data.comment_reply['use_comment_size']+ '">/ byte</span>' + '</span>');
                            aHtml.push('<div class="byteRating ' +data.comment_reply['use_point']+ '"><strong class="label">평점</strong>' +'<span class="rating">' +data.comment_reply['comment_point']+ '</span></div>');
                            aHtml.push('<div class="captcha ' +data.comment_reply['use_captcha']+ '"><span class="image">' +data.comment_reply['captcha_image']+data.comment_reply['captcha_refresh']+'</span><div class="form">'+data.comment_reply['captcha']+ '</div><p class="help">위에 보이는 문자를 공백없이 입력하세요. (대소문자구분)</p></div>');
                            aHtml.push('<div class="formGroup"><div class="gLeft"></div><div class="gRight"><a href="#none" onclick="' +data.comment_reply['action_comment_insert']+ '" class="button large theme2">등록하기</a></div></div>');
                            aHtml.push('</div>');
                            aHtml.push('</div>');
                            aHtml.push('</form>');
                        }
                    }
                    $(pNode).after('<li id="product-qna-read'+data.key+'" class="contentView">'+aHtml.join('')+'</li>');
                    // 평점기능 사용안함일 경우 보여지는 td를 조절하기 위한 함수
                    PRODUCT_COMMENT.comment_colspan(pNode);
                    if (data.comment_write != undefined && data.comment_write['use_comment_size'] == '') PRODUCT_COMMENT.comment_byte(6, data.key);
                    if (data.comment_reply != undefined && data.comment_write['use_comment_size'] == '') PRODUCT_COMMENT.comment_byte(6, data.key, 'commentReplyWriteForm');
                    if (data.read['ucc_url']) $('#ec-ucc-media-box-'+ data.read['no']).replaceWith(APP_BOARD_UCC.getPreviewElement(data.read['ucc_url']));
                }
            });
        },
        // 댓글 보기
        comment_view : function (sId)
        {
            if ($('#commentList_'+sId).css('display') == 'none') {
                $('#commentList_'+sId).show();
            } else {
                $('#commentList_'+sId).hide();
            }
        },
        // 댓글의 댓글 보기
        comment_reply_view : function (iCommentNo)
        {
            $('[id^="replyArea_'+iCommentNo+'_"]').each(function(e) {
                if ($(this).css('display') == 'none') {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        },
        // 댓글 쓰기
        comment_write : function (e)
        {
            var $form = $("#commentWriteForm_6");
            if ($form.css('display') == 'none') {
                $form.css('display', 'block');
                var $p = $(e).parent().parent();
                if ( $(e).parent().find('#commentWriteForm_6').length < 1 ) {
                    $p.after($form);
                }
            } else {
                $form.hide();
            }
        },
        END : function() {}
    };
});