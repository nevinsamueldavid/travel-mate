/**
 * Shared header & footer for multi-page Travel Mate site.
 * Each page sets <body data-page="home|destinations|services|process|about|faq|book"> before scripts.
 */
(function () {
  var active = document.body.getAttribute("data-page") || "";

  var href = {
    home: "index.html",
    destinations: "destinations.html",
    services: "services.html",
    process: "process.html",
    about: "about.html",
    faq: "faq.html",
    book: "book.html",
  };

  var headerEl = document.getElementById("site-header");
  var footerEl = document.getElementById("site-footer");
  if (!headerEl || !footerEl) return;

  headerEl.innerHTML =
    '<header class="site-header">' +
    '<div class="container nav-bar">' +
    '<a class="brand" href="' +
    href.home +
    '" aria-label="Travel Mate Home">' +
    '<span class="brand-mark" aria-hidden="true">✈️</span>' +
    '<span class="brand-name">Travel Mate</span>' +
    "</a>" +
    '<nav class="nav-links" aria-label="Primary navigation">' +
    '<a class="nav-link" data-nav="home" href="' +
    href.home +
    '">Home</a>' +
    '<a class="nav-link" data-nav="destinations" href="' +
    href.destinations +
    '">Destinations</a>' +
    '<a class="nav-link" data-nav="services" href="' +
    href.services +
    '">Services</a>' +
    '<a class="nav-link" data-nav="process" href="' +
    href.process +
    '">Process</a>' +
    '<a class="nav-link" data-nav="about" href="' +
    href.about +
    '">About</a>' +
    '<a class="nav-link" data-nav="faq" href="' +
    href.faq +
    '">FAQ</a>' +
    '<a class="nav-link" data-nav="book" href="' +
    href.book +
    '">Book</a>' +
    "</nav>" +
    '<button class="menu-btn" type="button" aria-label="Open menu" aria-controls="mobileMenu" aria-expanded="false">' +
    '<span class="menu-icon" aria-hidden="true"></span>' +
    "</button>" +
    "</div>" +
    '<div id="mobileMenu" class="mobile-menu" hidden>' +
    '<div class="container mobile-menu-inner">' +
    '<nav class="mobile-nav" aria-label="Mobile navigation">' +
    '<a class="mobile-nav-link" data-nav="home" href="' +
    href.home +
    '">Home</a>' +
    '<a class="mobile-nav-link" data-nav="destinations" href="' +
    href.destinations +
    '">Destinations</a>' +
    '<a class="mobile-nav-link" data-nav="services" href="' +
    href.services +
    '">Services</a>' +
    '<a class="mobile-nav-link" data-nav="process" href="' +
    href.process +
    '">Process</a>' +
    '<a class="mobile-nav-link" data-nav="about" href="' +
    href.about +
    '">About</a>' +
    '<a class="mobile-nav-link" data-nav="faq" href="' +
    href.faq +
    '">FAQ</a>' +
    '<a class="mobile-nav-link" data-nav="book" href="' +
    href.book +
    '">Book</a>' +
    "</nav>" +
    '<button class="mobile-close" type="button" aria-label="Close menu">Close</button>' +
    "</div>" +
    "</div>" +
    "</header>";

  footerEl.innerHTML =
    '<footer class="site-footer">' +
    '<div class="container footer-cols">' +
    '<div class="footer-col footer-brand-block">' +
    '<div class="footer-brand">Travel Mate</div>' +
    '<p class="footer-tagline">Professional trip planning for individuals, families, and small teams.</p>' +
    '<form id="newsletterForm" class="newsletter-form" novalidate>' +
    '<label class="visually-hidden" for="newsletterEmail">Email for updates</label>' +
    '<input id="newsletterEmail" name="email" type="email" autocomplete="email" placeholder="Email for travel tips" />' +
    '<button class="btn btn-primary newsletter-btn" type="submit">Subscribe</button>' +
    "</form>" +
    '<p id="newsletterThanks" class="newsletter-thanks" hidden>Thanks — we’ll send updates (demo only).</p>' +
    "</div>" +
    '<div class="footer-col">' +
    '<div class="footer-heading">Explore</div>' +
    "<a href=\"" +
    href.destinations +
    '">Destinations</a>' +
    "<a href=\"" +
    href.services +
    '">Services</a>' +
    "<a href=\"" +
    href.process +
    '">Process</a>' +
    "</div>" +
    '<div class="footer-col">' +
    '<div class="footer-heading">Company</div>' +
    "<a href=\"" +
    href.about +
    '">About</a>' +
    "<a href=\"" +
    href.faq +
    '">FAQ</a>' +
    "<a href=\"" +
    href.book +
    '">Book</a>' +
    "</div>" +
    '<div class="footer-col">' +
    '<div class="footer-heading">Legal</div>' +
    '<a href="#">Privacy (demo)</a>' +
    '<a href="#">Terms (demo)</a>' +
    "</div>" +
    "</div>" +
    '<div class="container footer-bottom">' +
    '<span>© <span id="year"></span> Travel Mate. All rights reserved.</span>' +
    "</div>" +
    "</footer>";

  headerEl.querySelectorAll("[data-nav]").forEach(function (a) {
    if (a.getAttribute("data-nav") === active) {
      a.setAttribute("aria-current", "page");
    }
  });
})();
