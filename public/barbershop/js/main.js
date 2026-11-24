//===============================
// File: js/main.js
// Vintage Barbershop Project
//===============================

// ----- DOM Elements -----
const yearE1 = document.getElementById("year");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const ctaBtn = document.getElementById("ctaBtn");
const callBtn = document.getElementById("callBtn");
const phoneLink = document.getElementById("phoneLink");
const heading = document.getElementById("heroHeading");
const featuresGrid = document.getElementById("featuresGrid");
const nav = document.getElementById("nav"); // Add in nav DOM selector
const siteHeader = document.querySelector(".site-header"); // Add siteHeader
const serviceModal = document.getElementById("serviceModal");
const serviceModalTitle = document.getElementById("serviceModalTitle");
const serviceModalDescription = document.getElementById(
  "serviceModalDescription",
);
const heroSubtext = document.getElementById("heroSubtext");
const ctaText = document.getElementById("ctaText");
const serviceModalPrice = document.getElementById("serviceModalPrice");
const serviceModalList = document.getElementById("serviceModalList");
const serviceModalClose = document.getElementById("serviceModalClose");
const serviceModalOverlay = document.getElementById("serviceModalOverlay");
// Add in Services Data Section
// ------ Services Data Array ------
const services = [
  {
    title: "Classic Haircut",
    description: "Timeless cuts with modern precision-tailored to your style",
    image: "assets/images/feature-1.jpg",
    price: "$25.00",
    details: [
      "Consultation with your barber before the cut begins.",
      "Hair is sectioned and shaped to match your preferred style.",
      "Professional clippers, trimmers, and shears are used for precision.",
      "Neckline cleanup and finishing touches are included.",
      "Styling product is applied for a clean final look.",
    ],
  },
  {
    title: "Beard Trim",
    description: "Shape and line-up your beard for a clean, sharp finish",
    image: "assets/images/feature-2.jpg",
  },
  {
    title: "Straight Razor Shave",
    description: "Hot towel treatment with a smooth traditional shave.",
    image: "assets/images/feature-3.jpg",
  },
];

// ----- Navigation Data (Array of Objects) -----
// Add Navigation Data Section
const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#features" },
  { label: "Book", href: "#cta" },
  { label: "Contact", href: "#footer" },
];
// ----- Helpers / Functions -----
// Update footer year automatically
const setCurrentYear = () => {
  const now = new Date();
  yearE1.textContent = now.getFullYear();
};
// Header Scroll
// Add scroll handling for scroll effects
const handleHeaderOnScroll = () => {
  if (!siteHeader) return;

  if (window.scrollY > 10) {
    siteHeader.classList.add("is-scrolled");
  } else {
    siteHeader.classList.remove("is-scrolled");
  }
};

// Toggle mobile menu open/close
let isMenuOpen = false;
const toggleMobileMenu = () => {
  if (!mobileMenu) return;
  if (isMenuOpen === false) {
    mobileMenu.classList.add("is-open");
    isMenuOpen = true;
  } else {
    mobileMenu.classList.remove("is-open");
    isMenuOpen = false;
  }
};
// Close mobile menu (used when a link is clicked)
const closeMobileMenu = () => {
  if (!mobileMenu) return;
  mobileMenu.classList.remove("is-open");
  isMenuOpen = false;
};
// Reusable function with parameters (practice pattern)
const updateHeadingText = (newText) => {
  if (!heading) return;
  heading.textContent = newText;
};
let serviceModalTrigger = null;
const openServiceModal = (service, trigger) => {
  if (!serviceModal || !serviceModalTitle || !serviceModalDescription) return;
  serviceModalTitle.textContent = service.title;
  serviceModalDescription.textContent = service.description;
  if (serviceModalPrice) {
    serviceModalPrice.textContent = service.price || "";
    serviceModalPrice.hidden = !service.price;
  }
  if (serviceModalList) {
    serviceModalList.replaceChildren();
    for (const detail of service.details || []) {
      const item = document.createElement("li");
      item.textContent = detail;
      serviceModalList.appendChild(item);
    }
    serviceModalList.hidden = !service.details?.length;
  }
  serviceModal.setAttribute("aria-hidden", "false");
  serviceModal.classList.add("is-open");
  serviceModalTrigger = trigger;
  serviceModalClose?.focus();
};
const closeServiceModal = () => {
  if (!serviceModal) return;
  serviceModal.setAttribute("aria-hidden", "true");
  serviceModal.classList.remove("is-open");
  serviceModalTrigger?.focus();
  serviceModalTrigger = null;
};
// ---- Event Listeners -----
// 1) Set year on page load
setCurrentYear();
// 2) Hamburger menu toggle
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    toggleMobileMenu();
  });
}
// 3) Close mobile menu when a link is clicked
if (mobileMenu) {
  mobileMenu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      closeMobileMenu();
    }
  });
}
// 4) CTA Button: "Book Now" (placeholder behavior)
if (ctaBtn) {
  ctaBtn.addEventListener("click", () => {
    updateHeadingText("Booking coming next - great choice!");
  });
}
// 5) Call Button: try to use the phone number in the footer
if (callBtn) {
  callBtn.addEventListener("click", () => {
    if (phoneLink) {
      updateHeadingText("Call us at " + phoneLink.textContent);
    } else {
      updateHeadingText("Call feature coming next!");
    }
  });
}
if (featuresGrid) {
  featuresGrid.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const detailsButton = event.target.closest(".feature-details-btn");
    if (!detailsButton) return;
    const service = services[Number(detailsButton.dataset.serviceIndex)];
    if (service) openServiceModal(service, detailsButton);
  });
}
serviceModalClose?.addEventListener("click", closeServiceModal);
serviceModalOverlay?.addEventListener("click", closeServiceModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && serviceModal?.classList.contains("is-open")) {
    closeServiceModal();
  }
});
// 6) Window listens for scroll
window.addEventListener("scroll", handleHeaderOnScroll);
// Run once on page load in case user refreshes mid-scroll
handleHeaderOnScroll();

// ------ Render Features using forEach ------
// Add render features function
const renderFeatures = () => {
  if (!featuresGrid) return;
  services.forEach((service, index) => {
    const card = document.createElement("article");
    card.classList.add("feature-card");
    card.innerHTML = `
      <img src="${service.image}" alt="${service.title}" class="feature-img" />
      <h3 class="feature-title">${service.title}</h3>
      <p class="feature-text">${service.description}</p>
      <button type="button" class="feature-details-btn" data-service-index="${index}">
        View details
      </button>
    `;
    featuresGrid.appendChild(card);
  });
};

const renderNavigation = () => {
  // Desktop Nav
  if (nav) {
    const navHTML = navLinks
      .map((link) => {
        return ` <a href="${link.href}" class="nav-link"> ${link.label} </a> `;
      })
      .join("");

    nav.innerHTML = navHTML;
  }

  // Mobile Nav
  if (mobileMenu) {
    const mobileHTML = navLinks
      .map((link) => {
        return ` <a href="${link.href}" class="mobile-link"> ${link.label} </a> `;
      })
      .join("");

    mobileMenu.innerHTML = mobileHTML;
  }
};

 

// Initial render of features using forEach
renderFeatures();
renderNavigation(); // Call navigation render
