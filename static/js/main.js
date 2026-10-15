// Reemplaza navbar-btns.js, fade-in.js y loader.js
(() => {
    const loader = document.getElementById('loader');
    const hideLoader = () => { loader.classList.add('done'); setTimeout(() => loader.remove(), 400); };
    window.addEventListener('load', hideLoader);
    setTimeout(hideLoader, 3000); // respaldo si alguna imagen tarda

    // Aparición al hacer scroll
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

    // Enlace activo del menú según la sección visible
    const links = [...document.querySelectorAll('.vertical-nav .nav-link')];
    const spy = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            links.forEach(l => {
                const on = l.getAttribute('href') === '#' + e.target.id;
                l.classList.toggle('active', on);
                on ? l.setAttribute('aria-current', 'page') : l.removeAttribute('aria-current');
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

    // Menú móvil
    const nav = document.getElementById('sidebar');
    const btn = document.querySelector('.nav-toggle');
    const setOpen = (open) => {
        nav.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open);
        btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        btn.firstElementChild.className = open ? 'bi bi-x-lg' : 'bi bi-list';
    };
    btn.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
})();