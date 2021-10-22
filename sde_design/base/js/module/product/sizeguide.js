$('.ec-product-sizeguide-close').click(function () {
    if (EC_MOBILE_DEVICE) {
        self.close();
    } else {
        $('#sSizeGuideLayer').hide();
    }
});