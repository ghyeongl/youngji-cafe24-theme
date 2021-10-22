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
        // only skin , no 편집창
    }
 
    function dndComponent() {
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
        function eSearchKeywordDel() {
            $('#shopQ').find('button.btnDelete').bind('click', function () {
                $(this).parent().find('input.keyword').attr('value', '').focus();
            });
        }
        $(document).ready(function(){
            eSearchKeywordDel();
        });
    }
 
    if (document.readyState == 'complete') {
        dndComponent();
    } else {
        document.addEventListener('DOMContentLoaded', dndComponent);
        document.addEventListener('DOMContentLoaded', pageLoaded);
    }
})();