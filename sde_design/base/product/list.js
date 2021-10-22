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
        // only skin
    }
    function dndComponent() {
        var $scope = $('.dnd_module_3ddaa5b17257b92540d46106537b9116'),
            $childList = $scope.find('.horizontal-scrollable'),
            childListCount = $childList.find('.category').children().length;
        if(!childListCount) {
            $childList.remove();
        }
    }
    if (document.readyState == 'complete') {
        dndComponent();
    } else {
        document.addEventListener('DOMContentLoaded', dndComponent);
        document.addEventListener('DOMContentLoaded', pageLoaded);
    }
})();
(function() {
    function pageLoaded(){
    }
    
    function dndComponent() {
        var $scope = $('.dnd_module_8435038b47e9023167117a9b53e0b024'),
            $swiperCarousel = $scope.find(".swiper-carousel");
        if( $swiperCarousel.length ) {
            $swiperCarousel.each( function(idx) {
                var $self = $(this),
                    self = this,
                    $wrapper = $self.find('.swiper-wrapper'),
                    $children = $wrapper.children(),
                    calculate = 0;
                $children.each(function(idx) { calculate += $(this).outerWidth(true); });
                new Swiper(self, {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 10,
                    setWrapperSize: calculate,
                    pagination: {
                        el: '.dnd_module_8435038b47e9023167117a9b53e0b024 .productPaginate .swiper-pagination',
                        clickable: true,
                    },
                    breakpoints: {
                        // when window width is <= 320px
                        320: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                            // spaceBetween: 10
                        },
                        // when window width is <= 480px
                        480: {
                            slidesPerView: 2,
                            slidesPerGroup: 2
                            // spaceBetween: 20
                        }
                    }
                });
            });
        }
    }
  
    if (document.readyState == 'complete') {
        dndComponent();
    } else {
        document.addEventListener('DOMContentLoaded', dndComponent);
        document.addEventListener('DOMContentLoaded', pageLoaded);
    }
  
})();
 var $scope = $('.dnd_module_6514adeff3546eda19278ff2b7049839'),
        $swiperCarousel = $scope.find(".swiper-carousel");
    if( $swiperCarousel.length ) {
        $swiperCarousel.each( function(idx) {
            var $self = $(this),
                self = this,
                $wrapper = $self.find('.swiper-wrapper'),
                $children = $wrapper.children(),
                calculate = 0;
            $children.each(function(idx) { calculate += $(this).outerWidth(true); });
			$.getScript('https://moma-img.echosting.cafe24.com/img/1/8435/jquery.plugin.js', function() {
                new Swiper(self, {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 10,
                    setWrapperSize: calculate,
                    pagination: {
                        el: '.dnd_module_6514adeff3546eda19278ff2b7049839 .productPaginate .swiper-pagination',
                        clickable: true,
                    },
                    breakpoints: {
                        // when window width is <= 320px
                        320: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                            // spaceBetween: 10
                        },
                        // when window width is <= 480px
                        480: {
                            slidesPerView: 2,
                            slidesPerGroup: 2
                            // spaceBetween: 20
                        }
                    }
                });
            });
        });
    }
(function() {
    function pageLoaded() {
        // only skin
    }
    function dndComponent() {
        $('.dnd_module_cb512e5bb1ccf49be3df289bf203e4fc .eProductSort button').click(function(){
            if ($(this).hasClass('selected')) {
 
            } else {
                $(this).addClass('selected');
                $(this).siblings('button').removeClass('selected');
                if ($(this).hasClass('selected')) {
                    $(this).parents('.xans-product-normalpackage').find('.xans-product-listnormal .prdList').toggleClass('small');
                }
            }
        });
        
        $('.dnd_module_cb512e5bb1ccf49be3df289bf203e4fc #shopQ').find('button.btnDelete').bind('click', function () {
            $(this).parent().find('input.keyword').attr('value', '').focus();
        });
    }
    if (document.readyState == 'complete') {
        dndComponent();
    } else {
        document.addEventListener('DOMContentLoaded', dndComponent);
        document.addEventListener('DOMContentLoaded', pageLoaded);
    }
})();