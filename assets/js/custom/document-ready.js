/**
 * document ready
 */
(function ($) {
    $(document).ready(function () {
        /**  cookie */
        if (!$.cookie("user-cookies-accepted") && $('.cookiePopupWrapper').length) {
            setTimeout(function () {
                $('*').blur();
                $('.cookiePopupWrapper').addClass('show');
            }, 3000);
            $('.cookiePopupWrapper .overallButton').click(function () {
                $.cookie("user-cookies-accepted", true, cookieParamsAdd);
                $('.cookiePopupWrapper').removeClass('show');
                return false;
            });
        }

        /** header */
        $("body").headroom({
            tolerance: {
                up: 14,
                down: 26,
            }
        });

        if($('header')){
            initHeaderNavigation($(this))
            initBurger($(this))
        }


        if($('.tracker').length){
            $('.tracker').each(function () {
                initTracking($(this));
            })
        }


    });
})(jQuery);
