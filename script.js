document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        });
    });

    // 2. Animate Statistics Count on Load
    const stats = document.querySelectorAll('.stat-item h3');
    let animated = false;

    const runCounter = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            let count = 0;
            const speed = target / 50; // Adjust speed

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    stat.innerText = Math.ceil(count).toLocaleString() + '+';
                    setTimeout(updateCount, 30);
                } else {
                    stat.innerText = target.toLocaleString() + '+';
                }
            };
            updateCount();
        });
    };

    // Trigger counter when hero section is visible or immediately
    const heroSection = document.getElementById('hero');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                runCounter();
                animated = true;
            }
        });
    }, { threshold: 0.5 });

    observer.observe(heroSection);

    // 3. Event Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            eventCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. Newsletter Form Submission Handling
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const formMessage = document.getElementById('formMessage');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailVal = newsletterEmail.value.trim();

        if (emailVal) {
            formMessage.style.color = 'var(--success)';
            formMessage.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thanks for joining! Check your inbox for confirmation.`;
            newsletterEmail.value = '';

            setTimeout(() => {
                formMessage.innerHTML = '';
            }, 5000);
        }
    });

    // 5. Active Navbar Link Highlighter on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
