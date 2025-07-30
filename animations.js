// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Only initialize critical animations immediately
    initNavbarAnimations();
    initHeroAnimations();
    initButtonAnimations();
    initMobileMenu();
    
    // Initialize IntersectionObserver for lazy loading section animations
    initLazyLoadAnimations();
    
    // Navbar slide-in animation on page load
    function initNavbarAnimations() {
        const navbar = document.querySelector('.navbar');
        const navItems = document.querySelectorAll('.nav-item');
        const navCta = document.querySelector('.nav-cta');
        const logo = document.querySelector('.nav-logo');

        // Create timeline for navbar entrance
        const navTimeline = gsap.timeline();

        // Navbar slides down from top
        navTimeline.to(navbar, {
            duration: 1,
            y: 0,
            ease: "power3.out",
            delay: 0.5
        });

        // Logo animation
        navTimeline.from(logo, {
            duration: 0.8,
            scale: 0.5,
            rotation: -10,
            opacity: 0,
            ease: "back.out(1.7)"
        }, "-=0.5");

        // Nav items stagger in
        navTimeline.from(navItems, {
            duration: 0.6,
            x: 20,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.4");

        // CTA button comes in last with glow
        navTimeline.from(navCta, {
            duration: 0.6,
            scale: 0.7,
            opacity: 0,
            ease: "back.out(1.7)"
        }, "-=0.2");
    }

    // Hero section animations
    function initHeroAnimations() {
        const glitchText = document.querySelector('.glitch-text');
        const tagline = document.querySelector('.tagline');
        const subtitle = document.querySelector('.subtitle');
        const description = document.querySelector('.description');
        const features = document.querySelectorAll('.feature');
        const ctaButton = document.querySelector('.cta-button');
        
        // Create timeline for hero section
        const heroTimeline = gsap.timeline();

        // Animate glitch text
        if (glitchText) {
            heroTimeline.from(glitchText, {
                duration: 1.2,
                opacity: 0,
                y: 30,
                ease: "power3.out",
                delay: 1.0
            });
        }
        
        // Animate tagline
        if (tagline) {
            heroTimeline.from(tagline, {
                duration: 0.8,
                opacity: 0,
                y: 20,
                ease: "power3.out"
            }, "-=0.6");
        }
        
        // Animate subtitle
        if (subtitle) {
            heroTimeline.from(subtitle, {
                duration: 0.8,
                opacity: 0,
                y: 20,
                ease: "power3.out"
            }, "-=0.4");
        }
        
        // Animate description
        if (description) {
            heroTimeline.from(description, {
                duration: 0.8,
                opacity: 0,
                y: 20,
                ease: "power3.out"
            }, "-=0.6");
        }
        
        // Animate feature cards with stagger
        if (features.length > 0) {
            heroTimeline.from(features, {
                duration: 0.8,
                opacity: 0,
                y: 30,
                stagger: 0.15,
                ease: "back.out(1.4)"
            }, "-=0.4");
        }
        
        // Animate CTA button
        if (ctaButton) {
            heroTimeline.from(ctaButton, {
                duration: 0.8,
                opacity: 0,
                scale: 0.5,
                ease: "back.out(1.7)"
            }, "-=0.2");
        }
    }
    
    // Button hover animations
    function initButtonAnimations() {
        const featureCards = document.querySelectorAll('.feature');
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    duration: 0.3,
                    y: -10,
                    rotationY: 5,
                    scale: 1.02,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    duration: 0.3,
                    y: 0,
                    rotationY: 0,
                    scale: 1,
                    ease: "power2.out"
                });
            });
        });
        
        // Add pulse animation to buttons
        const buttons = document.querySelectorAll('button, .cta-button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    duration: 0.3,
                    scale: 1.05,
                    boxShadow: '0 0 15px rgba(0, 255, 170, 0.7)',
                    ease: "power1.out"
                });
            });
            
            button.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    duration: 0.3,
                    scale: 1,
                    boxShadow: '0 0 0px rgba(0, 255, 170, 0)',
                    ease: "power1.in"
                });
            });
            
            button.addEventListener('mousedown', function() {
                gsap.to(this, {
                    duration: 0.1,
                    scale: 0.95,
                    ease: "power2.in"
                });
            });
            
            button.addEventListener('mouseup', function() {
                gsap.to(this, {
                    duration: 0.2,
                    scale: 1.05,
                    ease: "power2.out"
                });
            });
        });
    }

    // Mobile menu functionality
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                if (navMenu.classList.contains('active')) {
                    gsap.to(navMenu, {
                        duration: 0.5,
                        height: 'auto',
                        opacity: 1,
                        ease: "power3.out"
                    });
                    
                    gsap.from('.nav-menu .nav-item', {
                        duration: 0.4,
                        opacity: 0,
                        y: 20,
                        stagger: 0.1,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(navMenu, {
                        duration: 0.5,
                        height: 0,
                        opacity: 0,
                        ease: "power3.in"
                    });
                }
            });
        }
    }

    // Lazy load all section animations using IntersectionObserver
    function initLazyLoadAnimations() {
        // Options for the observer
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% of section must be visible
        };
        
        // Create an observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If section is in view
                if (entry.isIntersecting) {
                    const section = entry.target;
                    const sectionId = section.id || section.className;
                    
                    // Initialize specific section animations based on section id/class
                    if (section.classList.contains('how-it-works')) {
                        initHowItWorksAnimations();
                    } 
                    else if (section.classList.contains('demo')) {
                        initDemoAnimations();
                    }
                    else if (section.classList.contains('stats')) {
                        initCounterAnimations();
                    }
                    else if (section.classList.contains('testimonials')) {
                        initTestimonialsAnimations();
                    }
                    else if (section.classList.contains('pricing')) {
                        initPricingAnimations();
                    }
                    else if (section.classList.contains('faq')) {
                        initFaqAnimations();
                    }
                    
                    // Once animations are initialized, stop observing this section
                    observer.unobserve(section);
                }
            });
        }, observerOptions);
        
        // Start observing all sections
        document.querySelectorAll('section').forEach(section => {
            if (!section.classList.contains('hero-section')) { // Skip hero section
                observer.observe(section);
            }
        });
    }

    // How It Works section animations
    function initHowItWorksAnimations() {
        console.log('Loading How It Works animations');
        
        const title = document.querySelector('.how-it-works .section-title');
        const steps = document.querySelectorAll('.how-it-works .step');
        
        // Animate title
        gsap.from(title, {
            duration: 0.8,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: title,
                start: "top 80%"
            }
        });
        
        // Animate steps with staggered timing
        gsap.from(steps, {
            duration: 0.6,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: steps[0],
                start: "top 80%"
            }
        });
    }
    
    // Demo/Predictor section animations
    function initDemoAnimations() {
        console.log('Loading Demo animations');
        
        const title = document.querySelector('.demo .section-title');
        const demoContent = document.querySelector('.demo-content');
        const demoPanels = document.querySelectorAll('.demo-panel');
        const progressBars = document.querySelectorAll('.progress-bar');
        
        // Animate title
        gsap.from(title, {
            duration: 0.8,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: title,
                start: "top 80%"
            }
        });
        
        // Animate content
        gsap.from(demoContent, {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: demoContent,
                start: "top 80%"
            }
        });
        
        // Animate panels with direction-based movement
        gsap.from(demoPanels[0], {
            duration: 0.8,
            x: -50,
            opacity: 0,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: demoPanels[0],
                start: "top 80%"
            }
        });
        
        if (demoPanels[1]) {
            gsap.from(demoPanels[1], {
                duration: 0.8,
                y: 50,
                opacity: 0,
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: demoPanels[1],
                    start: "top 80%"
                }
            });
        }
        
        if (demoPanels[2]) {
            gsap.from(demoPanels[2], {
                duration: 0.8,
                x: 50,
                opacity: 0,
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: demoPanels[2],
                    start: "top 80%"
                }
            });
        }
        
        // Initialize progress bars
        initProgressBars();
    }
    
    // Animate progress bars
    function initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const percentage = bar.dataset.percentage || '75%';
            
            gsap.to(bar, {
                width: percentage,
                duration: 1.5,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: bar,
                    start: "top 85%"
                }
            });
        });
    }
    
    // Statistics counter animations
    function initCounterAnimations() {
        console.log('Loading Statistics animations');
        
        const title = document.querySelector('.stats .section-title');
        const statCards = document.querySelectorAll('.stat-card');
        const counters = document.querySelectorAll('.counter');
        
        // Animate title
        gsap.from(title, {
            duration: 0.8,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: title,
                start: "top 80%"
            }
        });
        
        // Animate cards
        gsap.from(statCards, {
            duration: 0.8,
            y: 50,
            opacity: 0,
            scale: 0.9,
            stagger: 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: statCards[0],
                start: "top 80%"
            }
        });
        
        // Animate counters
        counters.forEach(counter => {
            const targetValue = parseInt(counter.getAttribute('data-target'));
            const duration = 2;
            
            gsap.to(counter, {
                innerHTML: targetValue,
                duration: duration,
                ease: "power2.inOut",
                snap: { innerHTML: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: "top 85%"
                }
            });
        });
    }
    
    // Testimonials animations
    function initTestimonialsAnimations() {
        console.log('Loading Testimonials animations');
        
        const title = document.querySelector('.testimonials .section-title');
        const testimonialsGrid = document.querySelector('.testimonials-grid');
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        // Animate title
        gsap.from(title, {
            duration: 0.8,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: title,
                start: "top 80%"
            }
        });
        
        // Animate testimonial grid
        gsap.from(testimonialsGrid, {
            duration: 1,
            opacity: 0,
            y: 30,
            ease: "power3.out",
            scrollTrigger: {
                trigger: testimonialsGrid,
                start: "top 80%"
            }
        });
        
        // Animate individual testimonials with staggered timing
        gsap.from(testimonialCards, {
            duration: 0.8,
            y: 50,
            opacity: 0,
            rotationX: 45,
            stagger: 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: testimonialCards[0],
                start: "top 80%"
            }
        });
        
        // Add hover effect to testimonial cards
        testimonialCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    duration: 0.3,
                    y: -10,
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    duration: 0.3,
                    y: 0,
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                    ease: "power2.out"
                });
            });
        });
    }
    
    // Pricing section animations
    function initPricingAnimations() {
        console.log('Loading Pricing animations');
        
        const title = document.querySelector('.pricing .section-title');
        const pricingCards = document.querySelectorAll('.price-card');
        
        // Animate title
        gsap.from(title, {
            duration: 0.8,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: title,
                start: "top 80%"
            }
        });
        
        // Animate pricing cards
        gsap.from(pricingCards, {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: pricingCards[0],
                start: "top 80%"
            }
        });
        
        // Add animation for the featured card
        const featuredCard = document.querySelector('.price-card.featured');
        if (featuredCard) {
            gsap.fromTo(featuredCard, 
                {
                    boxShadow: '0 5px 20px rgba(0, 255, 170, 0.3)'
                },
                {
                    boxShadow: '0 5px 20px rgba(0, 255, 170, 0.7)',
                    repeat: -1,
                    yoyo: true,
                    duration: 1.5,
                    ease: "sine.inOut",
                    scrollTrigger: {
                        trigger: featuredCard,
                        start: "top 80%"
                    }
                }
            );
        }
    }
    
    // FAQ section animations
    function initFaqAnimations() {
        console.log('Loading FAQ animations');
        
        const title = document.querySelector('.faq .section-title');
        const faqItems = document.querySelectorAll('.faq-item');
        
        // Animate title
        gsap.from(title, {
            duration: 0.8,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: title,
                start: "top 80%"
            }
        });
        
        // Animate FAQ items with staggered timing
        gsap.from(faqItems, {
            duration: 0.6,
            x: -50,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: faqItems[0],
                start: "top 85%"
            }
        });
        
        // Add toggle functionality for FAQ items
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        gsap.to(otherItem.querySelector('.faq-answer'), {
                            height: 0,
                            opacity: 0,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    }
                });
                
                // Toggle current FAQ item
                if (!isOpen) {
                    item.classList.add('active');
                    gsap.fromTo(answer,
                        { height: 0, opacity: 0 },
                        { 
                            height: 'auto', 
                            opacity: 1, 
                            duration: 0.5, 
                            ease: "power2.out"
                        }
                    );
                } else {
                    item.classList.remove('active');
                    gsap.to(answer, {
                        height: 0,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.in"
                    });
                }
            });
        });
    }
    
    // Initialize floating elements
    function initFloatingElements() {
        // Don't initialize on mobile to improve performance
        if (window.innerWidth < 768) return;
        
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            const xMovement = Math.random() * 40 - 20; // -20 to 20
            const yMovement = Math.random() * 40 - 20; // -20 to 20
            const duration = 3 + Math.random() * 5; // 3 to 8 seconds
            const delay = Math.random() * 2; // 0 to 2 seconds
            
            gsap.to(element, {
                x: xMovement,
                y: yMovement,
                rotation: Math.random() * 360,
                duration: duration,
                delay: delay,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
    }
    
    // Initialize parallax effects
    function initParallaxEffects() {
        // Don't initialize on mobile to improve performance
        if (window.innerWidth < 768) return;
        
        const parallaxLayers = document.querySelectorAll('[data-parallax]');
        
        parallaxLayers.forEach(layer => {
            const depth = layer.getAttribute('data-depth') || 0.2;
            
            window.addEventListener('mousemove', function(e) {
                const moveX = (e.clientX - window.innerWidth / 2) * depth;
                const moveY = (e.clientY - window.innerHeight / 2) * depth;
                
                gsap.to(layer, {
                    x: moveX,
                    y: moveY,
                    duration: 1,
                    ease: "power1.out"
                });
            });
        });
    }
});
