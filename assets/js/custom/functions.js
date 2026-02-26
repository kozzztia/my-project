function startHeaderNavigation(header) {
    if (!header) return;

    const nav = document.querySelector('nav ul');
    const navWrapper = document.querySelector('nav');
    const ball = document.createElement('div');
    ball.classList.add('nav-ball');
    nav.appendChild(ball);

    let activeLi = null;
    const currentPath = window.location.pathname.replace(/\/$/, '');

    const moveBall = (li) => {
        const rect = li.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();

        ball.style.left = (rect.left - navRect.left) + 'px';
        ball.style.width = rect.width + 'px';
        ball.style.height = rect.height * 0.6  + 'px';
        ball.style.opacity = '.6'

        setTimeout(() => {
            ball.style.height = rect.height + 'px';
            ball.style.opacity = '1';
        }, 150);

    };

    nav.querySelectorAll('a').forEach(a => {
        if (a.getAttribute('href') === currentPath) {
            activeLi = a.closest('li');
            moveBall(activeLi);
        }
    });

    nav.querySelectorAll('li').forEach(li => {
        li.addEventListener('mouseenter', () => moveBall(li));
    });

    navWrapper.addEventListener('mouseleave', () => {
        activeLi ? moveBall(activeLi) : ball.style.width = '0px';
    });
}






