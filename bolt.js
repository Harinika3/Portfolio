// Smooth navigation and section switching
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    
    // Function to show a specific section
    function showSection(targetId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Add active class to corresponding nav link
        const activeNavLink = document.querySelector(`[data-section="${targetId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
    }
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
        });
    });
    
    // Handle hero button clicks
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const targetSection = href.substring(1);
                showSection(targetSection);
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
    
    // Add scroll-based animations
    function addScrollAnimations() {
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
        
        // Observe project cards and skill categories
        const animatedElements = document.querySelectorAll('.project-card, .skill-category, .contact-method');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Initialize scroll animations
    addScrollAnimations();
    
    // Add typing effect to hero title (optional enhancement)
    function addTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.innerHTML;
            heroTitle.innerHTML = '';
            let i = 0;
            
            function typeWriter() {
                if (i < text.length) {
                    heroTitle.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            }
            
            // Start typing effect after a short delay
            setTimeout(typeWriter, 500);
        }
    }
    
    // Uncomment the line below to enable typing effect
    // addTypingEffect();
    
    // Add particle background effect (optional)
    function createParticleBackground() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        
        document.body.appendChild(canvas);
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        const particles = [];
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = '#667eea';
                ctx.fill();
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
    }
    
    // Uncomment the line below to enable particle background
    // createParticleBackground();
});

// Add smooth transitions when switching sections
function addSectionTransitions() {
    const style = document.createElement('style');
    style.textContent = `
        .section {
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .section:not(.active) {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .section.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Initialize section transitions
addSectionTransitions();

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});