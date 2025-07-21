// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navCta = document.querySelector(".nav-cta");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  navCta.classList.toggle("active");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Pricing toggle functionality
const pricingToggle = document.getElementById("pricing-toggle");
const monthlyPrices = document.querySelectorAll(".amount.monthly");
const annualPrices = document.querySelectorAll(".amount.annual");

pricingToggle.addEventListener("change", () => {
  if (pricingToggle.checked) {
    // Show annual prices
    monthlyPrices.forEach((price) => (price.style.display = "none"));
    annualPrices.forEach((price) => (price.style.display = "inline"));
  } else {
    // Show monthly prices
    monthlyPrices.forEach((price) => (price.style.display = "inline"));
    annualPrices.forEach((price) => (price.style.display = "none"));
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".feature-card, .pricing-card, .testimonial-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Floating cards animation enhancement
const floatingCards = document.querySelectorAll(".floating-card");
floatingCards.forEach((card, index) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.05)";
    card.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
    card.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
  });
});

// Stats counter animation
const stats = document.querySelectorAll(".stat-number");
const animateStats = () => {
  stats.forEach((stat) => {
    const target = stat.textContent;
    const isPercentage = target.includes("%");
    const isRating = target.includes("/");
    let finalValue;

    if (isPercentage) {
      finalValue = Number.parseFloat(target);
    } else if (isRating) {
      finalValue = Number.parseFloat(target);
    } else {
      finalValue = Number.parseInt(target.replace(/[^\d]/g, ""));
    }

    let current = 0;
    const increment = finalValue / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= finalValue) {
        current = finalValue;
        clearInterval(timer);
      }

      if (isPercentage) {
        stat.textContent = current.toFixed(1) + "%";
      } else if (isRating) {
        stat.textContent = current.toFixed(1) + "/5";
      } else {
        stat.textContent = Math.floor(current).toLocaleString() + "+";
      }
    }, 50);
  });
};

// Trigger stats animation when hero section is visible
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats();
        heroObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const heroSection = document.querySelector(".hero");
if (heroSection) {
  heroObserver.observe(heroSection);
}

// Button click effects
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple effect styles
const style = document.createElement("style");
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu.active, .nav-cta.active {
        display: flex;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        background: white;
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Form validation (if forms are added later)
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Lazy loading for images (if images are added)
const lazyImages = document.querySelectorAll("img[data-src]");
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach((img) => imageObserver.observe(img));

// Performance optimization: Debounce scroll events
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(() => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);
