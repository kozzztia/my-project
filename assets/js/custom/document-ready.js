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


        if($('.customBlock .contacts')) {
            $(this).find('textarea').autogrow()
            initPhoneMask($(this));
        }


        if ($('header')) {
            initHeaderNavigation($(this))
            initBurger($(this))
        }

        if ($('.customBlock  .tracker').length) {
            $('.tracker').each(function () {
                initTracking($(this));
            })
        }

        if ($('.customBlockWrapper.main-card-slider').length) {
            $('.cardSlider').each(function () {
                initCardSlider($(this));
            });
        }
        if ($('.customBlockWrapper.main-project-slider').length) {
            $('.projectSlider').each(function () {
                initProjectSlider($(this));
            });
        }

    });
})(jQuery);
