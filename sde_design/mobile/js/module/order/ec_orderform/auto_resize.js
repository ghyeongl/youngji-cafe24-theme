/* File start */
EC$('.wrap').on('keyup', 'textarea', function () {
    EC$(this).height(0);
    EC$(this).height(this.scrollHeight);
});
EC$('.wrap').find('textarea').keyup();

/* File end */
