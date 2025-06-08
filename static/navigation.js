// Navigation functionality for responsive hamburger menu
document.addEventListener('DOMContentLoaded', function() {
    // Create hamburger menu button
    const nav = document.querySelector('header nav');
    const navList = document.querySelector('header nav ul');
    
    // Create hamburger button
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.className = 'hamburger-btn';
    hamburgerBtn.setAttribute('aria-label', 'Toggle navigation menu');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.innerHTML = `
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
    `;
    
    // Insert hamburger button before the nav list
    nav.insertBefore(hamburgerBtn, navList);
    
    // Toggle mobile menu
    hamburgerBtn.addEventListener('click', function() {
        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
        
        // Toggle aria-expanded attribute
        hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle classes for animation
        hamburgerBtn.classList.toggle('active');
        navList.classList.toggle('mobile-open');
        
        // Prevent body scroll when menu is open
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on nav links (mobile)
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburgerBtn.classList.remove('active');
                navList.classList.remove('mobile-open');
                document.body.classList.remove('menu-open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Close menu when clicking outside (mobile)
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            const isClickInsideNav = nav.contains(event.target);
            const isMenuOpen = navList.classList.contains('mobile-open');
            
            if (!isClickInsideNav && isMenuOpen) {
                hamburgerBtn.classList.remove('active');
                navList.classList.remove('mobile-open');
                document.body.classList.remove('menu-open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset mobile menu state on desktop
            hamburgerBtn.classList.remove('active');
            navList.classList.remove('mobile-open');
            document.body.classList.remove('menu-open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Add keyboard navigation support
    hamburgerBtn.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            hamburgerBtn.click();
        }
    });
}); 