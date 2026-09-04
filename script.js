/* ======================================== */
/* 1. GLOBAL STATE                         */
/* ======================================== */
let currentLang = 'en';

/* ======================================== */
/* 2. LANGUAGE TOGGLE                      */
/* ======================================== */
function toggleLanguage() {
    const htmlTag = document.documentElement;
    const elements = document.querySelectorAll('[data-en]');
    const placeholders = document.querySelectorAll('[data-en-placeholder]');

    if (currentLang === 'en') {
        currentLang = 'ar';
        htmlTag.setAttribute('dir', 'rtl');
        htmlTag.setAttribute('lang', 'ar');
    } else {
        currentLang = 'en';
        htmlTag.setAttribute('dir', 'ltr');
        htmlTag.setAttribute('lang', 'en');
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

    updateLanguageButtons();
}

/* ======================================== */
/* 3. THEME TOGGLE                         */
/* ======================================== */
function toggleTheme() {
    const htmlTag = document.documentElement;
    const currentTheme = htmlTag.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        htmlTag.setAttribute('data-theme', 'light');
    } else {
        htmlTag.setAttribute('data-theme', 'dark');
    }

    updateThemeButtons();
}

/* ======================================== */
/* 4. UPDATE UI BUTTONS                    */
/* ======================================== */
function updateLanguageButtons() {
    const langBtns = document.querySelectorAll('#langToggle, #langToggleMobile');
    langBtns.forEach(btn => {
        btn.textContent = currentLang === 'en' ? 'العربية' : 'English';
    });
}

function updateThemeButtons() {
    const themeBtns = document.querySelectorAll('#themeToggle, #themeToggleMobile');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const icon = currentTheme === 'dark' ? 'moon' : 'sun';
    themeBtns.forEach(btn => {
        btn.innerHTML = `<i class="fa-solid fa-${icon}"></i>`;
    });
}

/* ======================================== */
/* 5. DOM CONTENT LOADED HANDLER           */
/* ======================================== */
document.addEventListener("DOMContentLoaded", () => {

    /* ---- 5a. Remove inline onclick handlers to avoid conflicts ---- */
    const allLangBtns = document.querySelectorAll('#langToggle, #langToggleMobile');
    const allThemeBtns = document.querySelectorAll('#themeToggle, #themeToggleMobile');

    allLangBtns.forEach(btn => {
        btn.onclick = null; // Remove inline onclick
        btn.addEventListener('click', toggleLanguage);
    });

    allThemeBtns.forEach(btn => {
        btn.onclick = null; // Remove inline onclick
        btn.addEventListener('click', toggleTheme);
    });

    // Set initial button states
    updateLanguageButtons();
    updateThemeButtons();

    /* ---- 5b. Skills Progress Animation ---- */
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

    /* ---- 5c. Active Navigation Links on Scroll ---- */
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

    /* ---- 5d. Combined Scroll Listener ---- */
    function handleScroll() {
        showProgress();
        activeMenu();
    }
    window.addEventListener('scroll', handleScroll);

    /* ---- 5e. Mobile Navigation Menu Toggle ---- */
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