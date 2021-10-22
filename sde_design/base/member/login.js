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
document.addEventListener('DOMContentLoaded', function() {
    var $scope = $(".dnd_module_403fc44481ecc8740bce862728fdc832");
    //로그인폼 placeholder 추가
    if ($('.xans-member-login').val() != undefined) {
        var loginId = $('#member_id').parent().attr('title');
        $('#member_id').attr('placeholder', loginId);
        $('#member_passwd').attr('placeholder', '패스워드');
    }
    if ($('.xans-myshop-orderhistorynologin').val() != undefined) {
        $('#order_name').attr('placeholder', '주문자명');
        $('#order_id1').attr('placeholder', '주문번호');
        $('#order_id').attr('placeholder', '주문번호(하이픈(-) 포함)');	//ECHOSTING-358843 비회원 주문조회
        $('#order_password').attr('placeholder', '주문번호 비밀번호');
    }
    //키보드 미리보기
    $('.keyboard button').click(function(){
        if($(this).hasClass('selected')==true){
            $('.keyboard .btnKey').removeClass('selected');
            $('.view div').hide();
        }
        else{
            $('.keyboard .btnKey').removeClass('selected');
            $('.view div').hide();
            $(this).addClass('selected');
            var key=$(this).attr('title');
            $(this).parent().next().children('.'+key+'').show();
        }
    });
    // 회원&비회원 토글
    $('.memberTab').each(function(){
        var selected = $(this).find('> ul > li.selected > a');
    });
    $('body').delegate('.memberTab a', 'click', function(e){
        var _target = $(this).attr('href');
        if (_target == '#member') {
            $('.memberLogin').show();
            $('.orderHistoryNoLogin').hide();
        } else {
            $('.memberLogin').hide();
            $('.orderHistoryNoLogin').show();
        }
        e.preventDefault();
    });
});