// Mobile Menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Sticky Header and Back to Top Button
window.addEventListener("scroll", () => {
    // Sticky header functionality
    const header = document.querySelector("header");
    if (header) {
        header.classList.toggle("header-scrolled", window.scrollY > 50);
    }
    
    // Back to Top button visibility
    const backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
        backToTop.classList.toggle("active", window.scrollY > 300);
    }
});

// Back to Top button click functionality
document.addEventListener("DOMContentLoaded", () => {
    const backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
        backToTop.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});

// Scroll Animation
window.addEventListener("load", () => {
    const fadeElements = document.querySelectorAll(".fade-in");
    
    const fadeIn = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add("active");
            }
        });
    };
    
    fadeIn();
    
    window.addEventListener("scroll", fadeIn);
});

// Testimonial Slider
const testimonials = [
    document.getElementById("testimonial-1"),
    document.getElementById("testimonial-2"),
    document.getElementById("testimonial-3"),
    document.getElementById("testimonial-4"),
    document.getElementById("testimonial-5")
];

let currentTestimonial = 0;

document.querySelector(".next-testimonial").addEventListener("click", () => {
    testimonials[currentTestimonial].style.display = "none";
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].style.display = "block";
});

document.querySelector(".prev-testimonial").addEventListener("click", () => {
    testimonials[currentTestimonial].style.display = "none";
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].style.display = "block";
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission (placeholder)
document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thanks for your message! We'll get back to you soon.");
    this.reset();
});

document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.getElementById('loading-progress');
    const loadingScreen = document.getElementById('loading-screen');
    
    // Loading simulation that lasts exactly 4 seconds
    let progress = 0;
    const totalTime = 3000; // 4 seconds in milliseconds
    const interval = 100; // Update progress every 100ms
    const increment = 100 / (totalTime / interval);
    
    const loadingTimer = setInterval(() => {
        progress += increment;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(loadingTimer);
            loadingScreen.style.display = 'none';
        }
    }, interval);
    
    // Backup timer - ensure loading screen disappears after exactly 4 seconds
    setTimeout(() => {
        clearInterval(loadingTimer);
        progressBar.style.width = '100%';
        loadingScreen.style.display = 'none';
    }, totalTime);
});

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle the current FAQ item
            item.classList.toggle('active');
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    startSwipeEffect();
  });
  
  const names = [
    " Custom Themes",
    " Inbox Automation",
    " Facebook Ads",
    " Apps Integration",
    " Chat-Bot Integration",
    " Instagram Ads",
  ];
  
  const swipeInSpeed = 30;      // Lower = faster
  const swipeOutSpeed = 30;
  const delayBetweenNames = 2000;
  let nameIndex = 0;
  
  async function startSwipeEffect() {
    const el = document.getElementById("name");
  
    while (true) {
      const text = names[nameIndex];
      await swipeIn(el, text);
      await delay(delayBetweenNames);
      await swipeOut(el, text);
      nameIndex = (nameIndex + 1) % names.length;
    }
  }
  
  async function swipeIn(el, text) {
    el.textContent = ""; // reset
    for (let i = 0; i <= text.length; i++) {
      el.textContent = text.slice(0, i);
      el.style.transform = `translateX(${(text.length - i) * 5}px)`;
      el.style.opacity = `${i / text.length}`;
      await delay(swipeInSpeed);
    }
    el.style.transform = `translateX(0)`;
    el.style.opacity = "1";
  }
  
  async function swipeOut(el, text) {
    for (let i = 0; i <= text.length; i++) {
      el.textContent = text.slice(i);
      el.style.transform = `translateX(-${i * 5}px)`;
      el.style.opacity = `${(text.length - i) / text.length}`;
      await delay(swipeOutSpeed);
    }
    el.textContent = "";
    el.style.transform = `translateX(0)`;
    el.style.opacity = "0";
  }
  
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById("loading-screen");

    // Use modern Navigation Timing Level 2 API
    const navType = performance.getEntriesByType("navigation")[0]?.type;

    const isReload = navType === "reload";

    if (isReload) {
      // Show loader by removing the hidden class
      loadingScreen.classList.remove("hidden");

      // Fade out after 4s (loader duration)
      setTimeout(() => {
        loadingScreen.classList.add("hidden");

        // Completely remove from layout after transition
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 300);
      }, 4000);
    } else {
      // Not a reload – hide immediately
      loadingScreen.style.display = "none";
    }
  });


  

