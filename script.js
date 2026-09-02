/* ======================================== */
/* 1. GLOBAL STATE                         */
/* ======================================== */
let currentLang = 'en';

/* ======================================== */
/* 2. LANGUAGE TOGGLE                      */
/* ======================================== */
function toggleLanguage() {
    const htmlTag = document.documentElement;
    const langBtn = document.getElementById('langToggle');
    const elements = document.querySelectorAll('[data-en]');
    const placeholders = document.querySelectorAll('[data-en-placeholder]');

    if (currentLang === 'en') {
        currentLang = 'ar';
        htmlTag.setAttribute('dir', 'rtl');
        htmlTag.setAttribute('lang', 'ar');
        if (langBtn) langBtn.textContent = 'English';
    } else {
        currentLang = 'en';
        htmlTag.setAttribute('dir', 'ltr');
        htmlTag.setAttribute('lang', 'en');
        if (langBtn) langBtn.textContent = 'العربية';
    }

    elements.forEach(el => {
        const translation = el.getAttribute(`data-${currentLang}`);
        if (translation) {
            el.textContent = translation;
        }
    });

    placeholders.forEach(el => {
        const placeholderText = el.getAttribute(`data-${currentLang}-placeholder`);
        if (placeholderText) {
            el.placeholder = placeholderText;
        }
    });
}

/* ======================================== */
/* 3. THEME TOGGLE                         */
/* ======================================== */
function toggleTheme() {
    const htmlTag = document.documentElement;
    const themeBtn = document.getElementById('themeToggle');
    const currentTheme = htmlTag.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        htmlTag.setAttribute('data-theme', 'light');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        htmlTag.setAttribute('data-theme', 'dark');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

/* ======================================== */
/* 4. DOM CONTENT LOADED HANDLER           */
/* ======================================== */
document.addEventListener("DOMContentLoaded", () => {

    /* ---- 4a. Skills Progress Animation ---- */
    const progressSection = document.querySelector('.skills-bars');
    const progressBars = document.querySelectorAll('.progress');
    let animated = false;

    function showProgress() {
        if (!progressSection) return;
        const sectionPosition = progressSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (sectionPosition < screenPosition && !animated) {
            progressBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth + '%';
            });
            animated = true;
        }
    }

    /* ---- 4b. Active Navigation Links on Scroll ---- */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function activeMenu() {
        let scrollY = window.scrollY;

        sections.forEach(sec => {
            let sectionHeight = sec.offsetHeight;
            let sectionTop = sec.offsetTop - 150;
            let sectionId = sec.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* ---- 4c. Combined Scroll Listener (to avoid redundancy) ---- */
    function handleScroll() {
        showProgress();
        activeMenu();
    }
    window.addEventListener('scroll', handleScroll);

    /* ---- 4d. Mobile Navigation Menu Toggle ---- */
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        const mobileNavLinks = navMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
});