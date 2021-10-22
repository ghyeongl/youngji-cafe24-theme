/* 현금영수증 팝업창 리사이즈 */
(function(){
    setTimeout(function(){
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (!isMobile) return window.resizeTo(450, 270);
    }, 100)
})();
