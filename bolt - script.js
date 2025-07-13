// Smooth navigation and section switching
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    
    // Create scroll progress indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = '<div class="scroll-progress"></div>';
    document.body.appendChild(scrollIndicator);
    
    const scrollProgress = document.querySelector('.scroll-progress');
    
    // Update scroll progress
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
    
    // Update active navigation based on scroll position
    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section's nav link
                const activeNavLink = document.querySelector(`[data-section="${sectionId}"]`);
                if (activeNavLink) {
                    activeNavLink.classList.add('active');
                }
            }
        });
    }
    
    // Smooth scroll to section
    function scrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            scrollToSection(targetSection);
        });
    });
    
    // Handle hero button clicks
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const targetSection = href.substring(1);
                scrollToSection(targetSection);
            }
        });
    });
    
    // Smooth hover effects for navigation
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(0)';
            }
        });
    });
    
    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateScrollProgress();
        updateActiveNavigation();
        
        // Add scroll-based animations
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionVisible = sectionTop < window.innerHeight * 0.75;
            
            if (sectionVisible) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Initialize on page load
    updateScrollProgress();
    updateActiveNavigation();
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    // Resume button handlers
    const downloadResumeBtn = document.getElementById('download-resume');
    const viewResumeBtn = document.getElementById('view-resume');
    
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would download the actual resume file
            alert('Resume download would start here. Please add your actual resume file.');
        });
    }
    
    if (viewResumeBtn) {
        viewResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would open the resume in a new tab
            alert('Resume viewer would open here. Please add your actual resume file or link.');
        });
    }
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe animated elements
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .contact-method');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add parallax effect to sections
    function addParallaxEffect() {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-content');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // Initialize parallax effect
    addParallaxEffect();
    
    // Add smooth reveal animations for sections
    function addSectionRevealAnimations() {
        const revealElements = document.querySelectorAll('.section-content > *');
        
        revealElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        });
        
        const revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const children = entry.target.querySelectorAll('*');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.2 });
        
        sections.forEach(section => {
            revealObserver.observe(section);
        });
    }
    
    // Initialize section reveal animations
    addSectionRevealAnimations();
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const currentSection = document.querySelector('.nav-link.active');
        if (!currentSection) return;
        
        const currentIndex = Array.from(navLinks).indexOf(currentSection);
        let targetIndex;
        
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                targetIndex = Math.min(currentIndex + 1, navLinks.length - 1);
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                targetIndex = Math.max(currentIndex - 1, 0);
                break;
            case 'Home':
                e.preventDefault();
                targetIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                targetIndex = navLinks.length - 1;
                break;
            default:
                return;
        }
        
        if (targetIndex !== undefined) {
            const targetSection = navLinks[targetIndex].getAttribute('data-section');
            scrollToSection(targetSection);
        }
    });
    
    // Add smooth transitions between sections
    let isScrolling = false;
    
    window.addEventListener('wheel', function(e) {
        if (isScrolling) return;
        
        const delta = e.deltaY;
        const currentSection = document.querySelector('.nav-link.active');
        if (!currentSection) return;
        
        const currentIndex = Array.from(navLinks).indexOf(currentSection);
        let targetIndex;
        
        if (delta > 0 && currentIndex < navLinks.length - 1) {
            // Scrolling down
            targetIndex = currentIndex + 1;
        } else if (delta < 0 && currentIndex > 0) {
            // Scrolling up
            targetIndex = currentIndex - 1;
        }
        
        if (targetIndex !== undefined) {
            e.preventDefault();
            isScrolling = true;
            
            const targetSection = navLinks[targetIndex].getAttribute('data-section');
            scrollToSection(targetSection);
            
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }, { passive: false });
});