// Load shared navigation
fetch('nav.html')
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const navContent = doc.querySelector('nav.navbar').outerHTML;
        document.querySelectorAll('#nav-placeholder').forEach(placeholder => {
            placeholder.outerHTML = navContent;
            // Set active link based on current page (e.g., / or index.html -> nav-home, /about -> nav-about)
            const page = location.pathname.split('/').pop();
            const linkClass = `nav-${page === '' || page === 'index.html' ? 'home' : page}`;
            document.querySelector(`.${linkClass}`)?.classList.add('active');

            // Hamburger menu toggle
            const navToggle = document.querySelector('.nav-toggle');
            const navLinks = document.querySelector('.nav-links');
            if (navToggle && navLinks) {
                console.log('Hamburger menu elements found:', { navToggle, navLinks });
                navToggle.addEventListener('click', handleToggle);
                navToggle.addEventListener('touchstart', handleToggle);
                function handleToggle() {
                    console.log('Hamburger menu toggled');
                    const isActive = navLinks.classList.toggle('active');
                    navToggle.setAttribute('aria-expanded', isActive);
                }
            } else {
                console.error('Hamburger menu elements not found:', { navToggle, navLinks });
            }
        });
    })
    .catch(error => console.error('Failed to load navigation:', error));

// Scroll effect for navbar
let isScrolling;
window.addEventListener('scroll', () => {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    }, 100);
});

// Counter animation
const counters = document.querySelectorAll('.counter');
if (counters.length) {
    const animateCounters = () => {
        let allDone = true;
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const prefix = counter.getAttribute('data-prefix') || '';
            const suffix = counter.getAttribute('data-suffix') || '';
            const decimals = parseInt(counter.getAttribute('data-decimals') || (suffix === '%' ? 1 : 0));
            const valueElement = counter.querySelector('.counter-value');
            let value = parseFloat(valueElement.dataset.value || 0);
            const increment = target / 100;
            if (value < target) {
                value = Math.min(value + increment, target);
                valueElement.dataset.value = value;
                valueElement.textContent = prefix + value.toFixed(decimals) + suffix;
                allDone = false;
            }
        });
        if (!allDone) {
            requestAnimationFrame(animateCounters);
        }
    };
    requestAnimationFrame(animateCounters);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}