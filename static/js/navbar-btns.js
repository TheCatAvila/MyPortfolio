document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const arrowSection = document.getElementById('arrow');

    let current = '';

    window.addEventListener('scroll', function () {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        if (window.scrollY === 0) {
            arrowSection.style.display = 'block';
        } else {
            arrowSection.style.display = 'none';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('mouseover', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });

        link.addEventListener('mouseout', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            const currentLink = document.querySelector('.nav-link[href="#' + current + '"]');
            if (currentLink) {
                currentLink.classList.add('active');
            }
        });
    });
});