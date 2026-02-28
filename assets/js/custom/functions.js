// header init
function initHeaderNavigation(header) {
    if (!header) return;

    const nav = header.find('nav .desktop-menu')[0];
    const navWrapper = header.find('nav')[0];
    const thumb = header.find('.nav-thumb')[0];

    let activeLi = null;
    let currentLi = null;
    let timer = null;
    const currentPath = '/' + window.location.pathname.split('/').filter(Boolean)[0];

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
            thumb.style.opacity = '1'
        }, 150);
    };

    nav.querySelectorAll('a').forEach(a => {
        if (a.getAttribute('href') === currentPath) {
            activeLi = a.closest('li');
            setThumbInstant(activeLi);
            currentLi = activeLi;
        }
    });

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
}

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
}

// show tracking

function initTracking(el){
    if(!el) return;

    const domEl = el[0];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(domEl);
}