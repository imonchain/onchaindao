window.addEventListener('scroll', () => {
    try {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    } catch (error) {
        console.error('Navbar scroll effect failed:', error);
    }
});

document.querySelector('.nav-toggle')?.addEventListener('click', () => {
    try {
        document.querySelector('.nav-links')?.classList.toggle('active');
    } catch (error) {
        console.error('Hamburger menu toggle failed:', error);
    }
});

document.querySelectorAll('.counter').forEach(counter => {
    try {
        const target = parseFloat(counter.getAttribute('data-target'));
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        const valueElement = counter.querySelector('.counter-value');
        let value = 0;
        const increment = target / 100;
        const updateCounter = () => {
            if (value < target) {
                value += increment;
                valueElement.textContent = prefix + Math.min(value, target).toFixed(suffix === '%' ? 1 : 0) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                valueElement.textContent = prefix + target.toFixed(suffix === '%' ? 1 : 0) + suffix;
            }
        };
        updateCounter();
    } catch (error) {
        console.error('Counter animation failed:', error);
    }
});