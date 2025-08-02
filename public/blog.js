// Blog functionality
document.addEventListener("DOMContentLoaded", function () {
  loadAllBlogPosts();
  setupCategoryFilters();
});

// Extended blog post data
const allBlogPosts = [
  {
    id: 1,
    title: "The Art of Cryptic Clue Construction",
    excerpt:
      "Learn the fundamental techniques for creating engaging and fair cryptic clues that challenge and delight solvers. We'll explore the building blocks of cryptic clues including anagrams, hidden words, charades, and reversals.",
    content:
      "Creating compelling cryptic clues is both an art and a science. The best clues are fair, elegant, and provide that satisfying 'aha!' moment when solved...",
    date: "2025-01-25",
    author: "Sarah Johnson",
    icon: "🎨",
    category: "techniques",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "Common Crossword Patterns and How to Use Them",
    excerpt:
      "Explore the most effective grid patterns and learn when and how to implement them in your puzzles. From standard 15x15 grids to innovative themed layouts.",
    content:
      "Grid construction is the foundation of every great crossword. Understanding common patterns helps you create puzzles that are both solvable and elegant...",
    date: "2025-01-20",
    author: "Mike Chen",
    icon: "🧩",
    category: "tutorials",
    readTime: "12 min read",
  },
  {
    id: 3,
    title: "Building Your First Cryptic Crossword",
    excerpt:
      "A step-by-step guide for beginners to create their first professional-quality cryptic crossword puzzle. From theme selection to final clue polishing.",
    content:
      "Ready to create your first cryptic crossword? This comprehensive guide will walk you through every step of the process...",
    date: "2025-01-15",
    author: "Emma Thompson",
    icon: "🚀",
    category: "tutorials",
    readTime: "15 min read",
  },
  {
    id: 4,
    title: "Advanced Anagram Techniques",
    excerpt:
      "Master the art of creating clever anagram clues that surprise and delight solvers. Learn about fair play rules and creative indicator words.",
    content:
      "Anagrams are the bread and butter of cryptic crosswords, but creating truly memorable anagram clues requires skill and creativity...",
    date: "2025-01-10",
    author: "David Wilson",
    icon: "🔄",
    category: "techniques",
    readTime: "10 min read",
  },
  {
    id: 5,
    title: "Using Digital Tools for Crossword Creation",
    excerpt:
      "A comprehensive review of software and online tools that can streamline your crossword setting process. From grid fillers to clue databases.",
    content:
      "Modern crossword setters have access to powerful digital tools that can significantly speed up the creation process...",
    date: "2025-01-05",
    author: "Lisa Rodriguez",
    icon: "💻",
    category: "tools",
    readTime: "7 min read",
  },
  {
    id: 6,
    title: "The Psychology of Puzzle Solving",
    excerpt:
      "Understanding how solvers think can help you create better puzzles. Explore cognitive patterns and difficulty curves in crossword construction.",
    content:
      "Great puzzle setters understand their audience. By learning how solvers approach puzzles, you can create more engaging experiences...",
    date: "2024-12-30",
    author: "Dr. Jennifer Park",
    icon: "🧠",
    category: "inspiration",
    readTime: "11 min read",
  },
  {
    id: 7,
    title: "Themed Crosswords: From Concept to Completion",
    excerpt:
      "Learn how to develop compelling themes and integrate them seamlessly into your crossword grids. Tips for maintaining theme consistency.",
    content:
      "Themed crosswords offer an extra layer of satisfaction for solvers. Here's how to create themes that enhance rather than hinder the solving experience...",
    date: "2024-12-25",
    author: "Robert Chen",
    icon: "🎭",
    category: "tutorials",
    readTime: "14 min read",
  },
  {
    id: 8,
    title: "The Evolution of Crossword Conventions",
    excerpt:
      "A historical look at how crossword construction rules and conventions have evolved over the decades. What's changed and what hasn't.",
    content:
      "Crosswords have come a long way since their inception. Understanding this evolution helps modern setters appreciate current conventions...",
    date: "2024-12-20",
    author: "Margaret Foster",
    icon: "📚",
    category: "inspiration",
    readTime: "9 min read",
  },
  {
    id: 9,
    title: "Debugging Difficult Clues",
    excerpt:
      "When clues aren't working, here's how to identify and fix common problems. Techniques for testing clue clarity and fairness.",
    content:
      "Even experienced setters sometimes write clues that don't quite work. Here's a systematic approach to identifying and fixing problematic clues...",
    date: "2024-12-15",
    author: "Alex Thompson",
    icon: "🔧",
    category: "techniques",
    readTime: "6 min read",
  },
  {
    id: 10,
    title: "Building a Crossword Setting Community",
    excerpt:
      "Tips for connecting with other setters, getting feedback on your work, and contributing to the crossword community.",
    content:
      "Crossword setting doesn't have to be a solitary pursuit. Building connections with other setters can greatly improve your skills...",
    date: "2024-12-10",
    author: "Sam Rodriguez",
    icon: "🤝",
    category: "inspiration",
    readTime: "8 min read",
  },
];

function loadAllBlogPosts() {
  const blogList = document.getElementById("blog-list");
  if (!blogList) return;

  displayPosts(allBlogPosts);
}

function displayPosts(posts) {
  const blogList = document.getElementById("blog-list");

  blogList.innerHTML = posts
    .map(
      (post) => `
        <article class="blog-post">
            <div class="blog-post-icon">
                ${post.icon}
            </div>
            <div class="blog-post-content">
                <h2>${post.title}</h2>
                <div class="blog-post-meta">
                    <span class="blog-author">By ${post.author}</span>
                    <span class="blog-date">${formatDate(post.date)}</span>
                    <span class="blog-read-time">${post.readTime}</span>
                    <span class="blog-category">${capitalizeFirst(
                      post.category
                    )}</span>
                </div>
                <p>${post.excerpt}</p>
                <a href="#" class="btn btn-outline" onclick="openPost(${
                  post.id
                })">Read More</a>
            </div>
        </article>
    `
    )
    .join("");

  // Animate posts
  const posts = document.querySelectorAll(".blog-post");
  posts.forEach((post, index) => {
    post.style.opacity = "0";
    post.style.transform = "translateY(30px)";
    setTimeout(() => {
      post.style.transition = "all 0.6s ease";
      post.style.opacity = "1";
      post.style.transform = "translateY(0)";
    }, index * 100);
  });
}

function setupCategoryFilters() {
  const categoryFilters = document.querySelectorAll(".category-filter");

  categoryFilters.forEach((filter) => {
    filter.addEventListener("click", function (e) {
      e.preventDefault();

      // Update active filter
      categoryFilters.forEach((f) => f.classList.remove("active"));
      this.classList.add("active");

      // Filter posts
      const category = this.getAttribute("data-category");
      let filteredPosts;

      if (category === "all") {
        filteredPosts = allBlogPosts;
      } else {
        filteredPosts = allBlogPosts.filter(
          (post) => post.category === category
        );
      }

      displayPosts(filteredPosts);
    });
  });
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function openPost(postId) {
  const post = allBlogPosts.find((p) => p.id === postId);
  if (!post) return;

  // Create modal overlay
  const modal = document.createElement("div");
  modal.className = "blog-modal";
  modal.innerHTML = `
        <div class="blog-modal-content">
            <div class="blog-modal-header">
                <span class="blog-modal-close">&times;</span>
                <div class="blog-modal-icon">${post.icon}</div>
                <h2>${post.title}</h2>
                <div class="blog-modal-meta">
                    <span>By ${post.author}</span>
                    <span>${formatDate(post.date)}</span>
                    <span>${post.readTime}</span>
                </div>
            </div>
            <div class="blog-modal-body">
                <p>${post.content}</p>
                <p>This is a preview of the blog post. In a full implementation, this would contain the complete article content with proper formatting, images, and interactive elements.</p>
                <h3>Key Takeaways:</h3>
                <ul>
                    <li>Understanding the fundamentals is crucial for success</li>
                    <li>Practice makes perfect in crossword construction</li>
                    <li>Community feedback helps improve your skills</li>
                    <li>Modern tools can streamline the creation process</li>
                </ul>
                <p><strong>Want to learn more?</strong> This article is part of our comprehensive crossword setting course. Join our community to access the full content and connect with other puzzle creators.</p>
            </div>
        </div>
    `;

  // Add modal styles
  const modalStyles = document.createElement("style");
  modalStyles.textContent = `
        .blog-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }
        
        .blog-modal-content {
            background: white;
            border-radius: 1rem;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            margin: 2rem;
            animation: slideIn 0.3s ease;
        }
        
        .blog-modal-header {
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid var(--border-color);
            position: relative;
        }
        
        .blog-modal-close {
            position: absolute;
            top: 1rem;
            right: 1.5rem;
            font-size: 2rem;
            cursor: pointer;
            color: var(--text-secondary);
            line-height: 1;
        }
        
        .blog-modal-close:hover {
            color: var(--text-primary);
        }
        
        .blog-modal-icon {
            font-size: 3rem;
            text-align: center;
            margin-bottom: 1rem;
        }
        
        .blog-modal-header h2 {
            text-align: center;
            margin-bottom: 1rem;
            color: var(--text-primary);
        }
        
        .blog-modal-meta {
            display: flex;
            justify-content: center;
            gap: 2rem;
            color: var(--text-secondary);
            font-size: 0.9rem;
        }
        
        .blog-modal-body {
            padding: 2rem;
            line-height: 1.7;
            color: var(--text-secondary);
        }
        
        .blog-modal-body h3 {
            color: var(--text-primary);
            margin: 2rem 0 1rem;
        }
        
        .blog-modal-body ul {
            margin: 1rem 0;
            padding-left: 2rem;
        }
        
        .blog-modal-body li {
            margin: 0.5rem 0;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .blog-modal-content {
                margin: 1rem;
                max-height: 95vh;
            }
            
            .blog-modal-meta {
                flex-direction: column;
                gap: 0.5rem;
            }
        }
    `;

  document.head.appendChild(modalStyles);
  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  // Close modal functionality
  const closeModal = () => {
    document.body.removeChild(modal);
    document.head.removeChild(modalStyles);
    document.body.style.overflow = "";
  };

  modal
    .querySelector(".blog-modal-close")
    .addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on escape key
  const escapeHandler = (e) => {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", escapeHandler);
    }
  };
  document.addEventListener("keydown", escapeHandler);
}

// Search functionality
function setupBlogSearch() {
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search blog posts...";
  searchInput.className = "blog-search";

  // Add search styles
  const searchStyles = `
        .blog-search {
            width: 100%;
            max-width: 400px;
            padding: 1rem;
            border: 2px solid var(--border-color);
            border-radius: 0.5rem;
            font-size: 1rem;
            margin-bottom: 2rem;
            transition: border-color 0.3s ease;
        }
        
        .blog-search:focus {
            outline: none;
            border-color: var(--primary-color);
        }
    `;

  const styleSheet = document.createElement("style");
  styleSheet.textContent = searchStyles;
  document.head.appendChild(styleSheet);

  // Insert search input
  const container = document.querySelector(".container");
  const categories = document.getElementById("categories");
  container.insertBefore(searchInput, categories);

  // Search functionality
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    let filteredPosts;

    if (searchTerm === "") {
      filteredPosts = allBlogPosts;
    } else {
      filteredPosts = allBlogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.author.toLowerCase().includes(searchTerm) ||
          post.category.toLowerCase().includes(searchTerm)
      );
    }

    displayPosts(filteredPosts);

    // Update category filter to show "all"
    document
      .querySelectorAll(".category-filter")
      .forEach((f) => f.classList.remove("active"));
    document.querySelector('[data-category="all"]').classList.add("active");
  });
}

// Initialize search
setupBlogSearch();
