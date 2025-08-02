// Main site functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for anchor links (starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    updateActiveLink(this);
                }
            }
            // For external links (like index.html, anagram.html, blog.html), 
            // let the browser handle navigation normally
        });
    });
    
    // Update active navigation link based on scroll position
    function updateActiveLink(activeLink = null) {
        if (activeLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            activeLink.classList.add('active');
        } else {
            let current = '';
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', () => updateActiveLink());
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Load blog posts
    loadBlogPosts();
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.tool-card, .blog-card, .resource-category, .feature-highlight');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
});

// Blog post data and loading functionality
const blogPosts = [
    {
        id: 1,
        title: "The Art of Cryptic Clue Construction",
        excerpt: "Learn the fundamental techniques for creating engaging and fair cryptic clues that challenge and delight solvers.",
        date: "2025-01-25",
        author: "Sarah Johnson",
        icon: "🎨"
    },
    {
        id: 2,
        title: "Common Crossword Patterns and How to Use Them",
        excerpt: "Explore the most effective grid patterns and learn when and how to implement them in your puzzles.",
        date: "2025-01-20",
        author: "Mike Chen",
        icon: "🧩"
    },
    {
        id: 3,
        title: "Building Your First Cryptic Crossword",
        excerpt: "A step-by-step guide for beginners to create their first professional-quality cryptic crossword puzzle.",
        date: "2025-01-15",
        author: "Emma Thompson",
        icon: "🚀"
    }
];

function loadBlogPosts() {
    const blogGrid = document.getElementById('blog-posts');
    if (!blogGrid) return;
    
    const postsToShow = blogPosts.slice(0, 3); // Show first 3 posts on homepage
    
    blogGrid.innerHTML = postsToShow.map(post => `
        <article class="blog-card">
            <div class="blog-image">
                ${post.icon}
            </div>
            <div class="blog-content">
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-meta">
                    <span class="blog-author">By ${post.author}</span>
                    <span class="blog-date">${formatDate(post.date)}</span>
                </div>
            </div>
        </article>
    `).join('');
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Crossword grid animation
function animateCrosswordGrid() {
    const cells = document.querySelectorAll('.grid-cell.filled');
    cells.forEach((cell, index) => {
        setTimeout(() => {
            cell.style.transform = 'scale(1.1)';
            setTimeout(() => {
                cell.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

// Start crossword animation when hero section is visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCrosswordGrid, 1000);
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    heroObserver.observe(heroSection);
}

// Add loading state for tools
function handleToolClick(event) {
    const button = event.target;
    if (button.classList.contains('disabled')) {
        event.preventDefault();
        return;
    }
    
    if (button.textContent === 'Launch Tool') {
        button.textContent = 'Loading...';
        button.style.opacity = '0.7';
        
        // Simulate loading delay
        setTimeout(() => {
            window.location.href = button.href;
        }, 500);
    }
}

// Add click handlers to tool buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') && e.target.textContent === 'Launch Tool') {
        handleToolClick(e);
    }
});

// Add hover effects for interactive elements
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('tool-card')) {
        e.target.style.transform = 'translateY(-8px) scale(1.02)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('tool-card')) {
        e.target.style.transform = 'translateY(0) scale(1)';
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Debounced scroll handler
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(function() {
        // Update header background opacity based on scroll
        const header = document.querySelector('.header');
        const scrollY = window.scrollY;
        const opacity = Math.min(scrollY / 100, 1);
        
        header.style.backgroundColor = `rgba(255, 255, 255, ${0.95 + (opacity * 0.05)})`;
    }, 10);
});
