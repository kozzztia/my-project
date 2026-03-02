// header init
function initHeaderNavigation(header) {
    if (!header) return;

    const nav = header.find('nav .desktop-menu')[0];
    const navWrapper = header.find('nav')[0];
    const thumb = header.find('.nav-thumb')[0];

    let activeLi = null;
    let currentLi = null;
    let timer = null;
    const segments = window.location.pathname.split('/').filter(Boolean);
    const currentPath = segments.length ? '/' + segments[0] : '/';

    const setThumbInstant = (li) => {
        const rect = li.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        thumb.style.left = (rect.left - navRect.left) + 'px';
        thumb.style.width = rect.width + 'px';
        thumb.style.height = rect.height + 'px';
        thumb.style.opacity = '1';
    };

    const moveThumb = (li) => {
        if (li === currentLi) return;
        currentLi = li;

        const rect = li.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();

        clearTimeout(timer);

        thumb.style.left = (rect.left - navRect.left) + 'px';
        thumb.style.width = rect.width + 'px';
        thumb.style.height = rect.height * 0.6 + 'px';
        thumb.style.opacity = '.6';

        timer = setTimeout(() => {
            thumb.style.height = rect.height + 'px';
            thumb.style.opacity = '1';
        }, 150);
    };

    const resetThumb = () => {
        clearTimeout(timer);
        currentLi = null;
        thumb.style.width = '0px';
        thumb.style.opacity = '0';
        activeLi = null;
    };

    const initActive = () => {
        nav.querySelectorAll('a').forEach(a => {
            const linkPath = new URL(a.href).pathname;
            if (linkPath === currentPath) {
                activeLi = a.closest('li');
                setThumbInstant(activeLi);
                currentLi = activeLi;
            }
        });
    };

    initActive();

    nav.querySelectorAll('li').forEach(li => {
        li.addEventListener('mouseenter', () => moveThumb(li));
    });

    navWrapper.addEventListener('mouseleave', () => {
        clearTimeout(timer);
        const wasOnActive = activeLi === currentLi;

        if (activeLi) {
            wasOnActive ? setThumbInstant(activeLi) : moveThumb(activeLi);
        } else {
            thumb.style.width = '0px';
        }
    });

    // Resize
    let resizeTimer = null;
    let wasDesktop = window.innerWidth > 1024;

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const isDesktop = window.innerWidth > 1024;

            if (isDesktop) {
                if (!wasDesktop) {
                    resetThumb();
                    initActive();
                } else {
                    if (activeLi) setThumbInstant(activeLi);
                }
            } else {
                resetThumb();
            }

            wasDesktop = isDesktop;
        }, 50);
    });
}

// init burger
function initBurger(header) {
    if (!header) return;
    const burger = header.find('.burger-toggler');
    const mobileMenu = header.find('.mobile-menu');
    const body = $('body');

    const closeMenu = () => {
        burger.removeClass('active');
        mobileMenu.removeClass('active');
        body.removeClass('no-scroll');
    };

    burger.on('click', function (e) {
        e.stopPropagation();
        $(this).toggleClass('active');
        mobileMenu.toggleClass('active');
        body.toggleClass('no-scroll');
    });

    mobileMenu.find('a').on('click', function () {
        mobileMenu.css('transition', 'all .2s');
        closeMenu();
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('header').length) {
            closeMenu();
        }
    });

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 1024) {
                closeMenu();
            }
        }, 50);
    });
}

// show tracking
function initTracking(el) {
    if (!el) return;

    const domEl = el[0];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-show');
            } else {
                entry.target.classList.remove('is-show');
            }
        });
    }, {
        threshold: [0.1, 0.3]
    });

    observer.observe(domEl);
}

function initCardSlider(el) {
    if (!el) return;

    const wrapper = el.find('.swiper')[0];
    const pagination = el.find('.swiper-pagination')[0];
    const next = el.find('.swiper-button-next')[0];
    const prev = el.find('.swiper-button-prev')[0];
    const slideCount = el.find('.swiper-slide').length;

    if (!wrapper) return;

    const intervalAttr = el.attr('data-interval');
    const interval = intervalAttr ? parseInt(intervalAttr, 10) : null;

    const swiper = new Swiper(wrapper, {
        loop: true,
        initialSlide: 2,
        loopAdditionalSlides: slideCount,
        watchSlidesProgress: true,

        pagination: {
            el: pagination,
            clickable: true,
            dynamicBullets: true,
        },

        navigation: {
            nextEl: next,
            prevEl: prev,
            enabled: false,
        },

        breakpoints: {
            390: {
                slidesPerView: 2,
                spaceBetween: 16,
                centeredSlides: true,
                navigation: { enabled: false },
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
                centeredSlides: true,
                navigation: { enabled: false },
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 32,
                centeredSlides: true,
                navigation: { enabled: true },
            },
        },

        ...(interval ? {
            autoplay: {
                delay: interval * 1000,
                disableOnInteraction: false,
            }
        } : {})
    });

    // Остановка при наведении
    el.on('mouseenter', function() {
        if (swiper.autoplay) swiper.autoplay.stop();
    });

    // Возобновление при уходе
    el.on('mouseleave', function() {
        if (swiper.autoplay) swiper.autoplay.start();
    });
}