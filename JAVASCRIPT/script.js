// Chalo Chale Travel App - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Animated Team Member Rotation
const teamMembers = [
    { name: "Rahul Sharma", role: "Founder & CEO", img: "imgp1.avif" },
    { name: "Priya Patel", role: "Head of Operations", img: "imgp2.jfif" }, // Add your actual filenames
    { name: "Amit Singh", role: "Travel Consultant", img: "imgp3.avif" },
    { name: "Sneha Reddy", role: "Customer Experience Lead", img: "imgp4.jpeg" }
];
let currentIndex = 0;
const nameEl = document.getElementById('team-name');
const roleEl = document.getElementById('team-role');
const dots = document.querySelectorAll('.dot');
const imgEl = document.getElementById('team-img');

function updateCarousel() {
    // Increment index and loop back to 0
    currentIndex = (currentIndex + 1) % teamMembers.length;

    // Update Text
    nameEl.innerText = teamMembers[currentIndex].name;
    roleEl.innerText = teamMembers[currentIndex].role;

    // Update Active Dot
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Set interval to 2 seconds
setInterval(updateCarousel, 2000);

    
    const teamNameElement = document.getElementById('team-name');
    const teamRoleElement = document.getElementById('team-role');
    const teamDots = document.querySelectorAll('.team-dots .dot');
    
    let currentTeamIndex = 0;
    let teamRotationInterval;
    
    function rotateTeamMember(index) {
        if (!teamNameElement || !teamRoleElement) return;
        
        // Fade out
        teamNameElement.classList.add('fade-out');
        teamRoleElement.classList.add('fade-out');
        
        setTimeout(() => {
            // Update content
            teamNameElement.textContent = teamMembers[index].name;
            teamRoleElement.textContent = teamMembers[index].role;
            
            // Update dots
            teamDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            // Fade in
            teamNameElement.classList.remove('fade-out');
            teamNameElement.classList.add('fade-in');
            teamRoleElement.classList.remove('fade-out');
            teamRoleElement.classList.add('fade-in');
            
            setTimeout(() => {
                teamNameElement.classList.remove('fade-in');
                teamRoleElement.classList.remove('fade-in');
            }, 500);
        }, 500);
        
        currentTeamIndex = index;
    }
    
    // Auto-rotate team members
    function startTeamRotation() {
        teamRotationInterval = setInterval(() => {
            const nextIndex = (currentTeamIndex + 1) % teamMembers.length;
            rotateTeamMember(nextIndex);
        }, 4000);
    }
    
    function stopTeamRotation() {
        clearInterval(teamRotationInterval);
    }
    
    // Initialize team rotation if elements exist
    if (teamNameElement && teamRoleElement && teamDots.length > 0) {
        startTeamRotation();
        
        // Manual navigation via dots
        teamDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopTeamRotation();
                rotateTeamMember(index);
                setTimeout(startTeamRotation, 6000); // Resume after 6 seconds
            });
        });
        
        // Pause on hover
        const teamDisplay = document.querySelector('.animated-team-display');
        if (teamDisplay) {
            teamDisplay.addEventListener('mouseenter', stopTeamRotation);
            teamDisplay.addEventListener('mouseleave', startTeamRotation);
        }
    }
    
    // Destination Filter Functionality
    const filterButtons = document.querySelectorAll('.btn-filter');
    const destinationCards = document.querySelectorAll('.destination-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            destinationCards.forEach(card => {
                const badge = card.querySelector('.destination-badge');
                const cardCategory = badge ? badge.textContent.toLowerCase() : '';
                
                if (filterValue === 'all' || cardCategory.includes(filterValue.toLowerCase())) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                    
                    // Remove error class on input
                    field.addEventListener('input', function() {
                        this.classList.remove('is-invalid');
                    }, { once: true });
                } else {
                    field.classList.remove('is-invalid');
                    field.classList.add('is-valid');
                }
            });
            
            // Email validation
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(email => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (email.value && !emailRegex.test(email.value)) {
                    isValid = false;
                    email.classList.add('is-invalid');
                }
            });
            
            // Password validation (for signup)
            const passwordFields = form.querySelectorAll('input[type="password"]');
            if (passwordFields.length >= 2) {
                const password = passwordFields[0].value;
                const confirmPassword = passwordFields[1].value;
                
                if (password !== confirmPassword) {
                    isValid = false;
                    passwordFields[1].classList.add('is-invalid');
                    alert('Passwords do not match!');
                }
            }
            
            if (isValid) {
                // Show success message
                showSuccessMessage(form);
                form.reset();
                form.querySelectorAll('.is-valid').forEach(field => {
                    field.classList.remove('is-valid');
                });
            }
        });
    });
    
    // Success Message Function
    function showSuccessMessage(form) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success';
        successDiv.style.position = 'fixed';
        successDiv.style.top = '100px';
        successDiv.style.right = '20px';
        successDiv.style.zIndex = '9999';
        successDiv.style.animation = 'slideIn 0.5s ease';
        successDiv.innerHTML = `
            <strong>Success!</strong> Your ${form.closest('.auth-form') ? 'account has been ' : 'form has been '}submitted successfully.
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => {
                successDiv.remove();
            }, 500);
        }, 3000);
    }
    
    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(33, 37, 41, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(33, 37, 41, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Card Hover Effects Enhancement
    const cards = document.querySelectorAll('.destination-card, .feature-card, .package-card, .team-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Search Form Validation
    const searchForm = document.querySelector('.search-box form');
    if (searchForm) {
        const searchBtn = searchForm.querySelector('button');
        if (searchBtn) {
            searchBtn.addEventListener('click', function(e) {
                const destination = searchForm.querySelector('input[type="text"]').value;
                const date = searchForm.querySelector('input[type="date"]').value;
                const travelers = searchForm.querySelector('select').value;
                
                if (!destination || !date || travelers === 'Travelers') {
                    e.preventDefault();
                    alert('Please fill in all search fields');
                } else {
                    alert(`Searching for: ${destination}, Date: ${date}, Travelers: ${travelers}`);
                }
            });
        }
    }
    
    // Booking Form Special Handling
    const bookingForm = document.querySelector('.booking-form form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const destination = this.querySelector('select[name="destination"]')?.value || this.querySelector('select:nth-of-type(1)')?.value;
            const travelDate = this.querySelector('input[type="date"]:nth-of-type(1)')?.value;
            const returnDate = this.querySelector('input[type="date"]:nth-of-type(2)')?.value;
            const travelers = this.querySelector('select:nth-of-type(2)')?.value;
            const packageType = this.querySelector('select:nth-of-type(3)')?.value;
            
            if (travelDate && returnDate && new Date(travelDate) > new Date(returnDate)) {
                alert('Travel date cannot be after return date');
                return;
            }
            
            alert(`Booking Request Submitted!\n\nDestination: ${destination}\nTravel Date: ${travelDate}\nReturn Date: ${returnDate}\nTravelers: ${travelers}\nPackage: ${packageType}\n\nWe will contact you shortly to confirm your booking.`);
        });
    }
    
    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const subject = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            if (message.length < 10) {
                alert('Please enter a message with at least 10 characters');
                return;
            }
            
            alert(`Thank you for your ${subject} inquiry! We will get back to you within 24 hours.`);
        });
    }
    
    // Forgot Password Modal Handling
    const forgotPasswordForm = document.querySelector('#forgotPasswordModal form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            alert(`Password reset link has been sent to ${email}. Please check your email inbox.`);
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
            if (modal) {
                modal.hide();
            }
            
            this.reset();
        });
    }
    
    // Dynamic Year in Footer
    const copyrightElements = document.querySelectorAll('.copyright');
    const currentYear = new Date().getFullYear();
    copyrightElements.forEach(element => {
        element.innerHTML = element.innerHTML.replace('2024', currentYear);
    });
    
    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .is-invalid {
            border-color: #dc3545 !important;
        }
        
        .is-valid {
            border-color: #28a745 !important;
        }
    `;
    document.head.appendChild(style);
});

// Mobile Menu Toggle Enhancement
const navbarToggler = document.querySelector('.navbar-toggler');
if (navbarToggler) {
    navbarToggler.addEventListener('click', function() {
        setTimeout(() => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }, 300);
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (navbarCollapse && navbarCollapse.classList.contains('show') && 
        !navbarCollapse.contains(e.target) && 
        !navbarToggler.contains(e.target)) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
            bsCollapse.hide();
        }
        document.body.style.overflow = 'auto';
    }
});

console.log('Chalo Chale Travel App - JavaScript Loaded Successfully');