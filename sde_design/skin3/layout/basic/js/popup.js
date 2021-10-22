/**
 * 팝업창에 리사이즈 관련
 */

function setResizePopup() {
    var iWrapWidth    = $('#popup').width();
    var iWrapHeight   = $('#popup').height();

    var iWindowWidth  = $(window).width();
    var iWindowHeight = $(window).height();

    window.resizeBy(iWrapWidth - iWindowWidth, iWrapHeight - iWindowHeight);
}
setResizePopup();

// 팝업 페이지 로드가 완료된 후에 리사이징 함수를 다시 호출
$( window ).load(function() {
    setResizePopup();
});