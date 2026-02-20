/**
 * VSC - Visa Success Connect
 * Mobile menu + Visa Checker + Accordion + Tabs
 */
(function() {
  'use strict';

  function initMobileMenu() {
    var toggle = document.getElementById('mobile-menu-toggle');
    var menu = document.getElementById('mobile-menu');
    var overlay = menu && menu.querySelector('.mobile-menu-overlay');
    var closeBtn = menu && menu.querySelector('.mobile-menu-close');
    if (!toggle || !menu) return;

    function openMenu() {
      menu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    toggle.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
    menu.querySelectorAll('.mobile-menu-links a').forEach(function(a) {
      a.addEventListener('click', closeMenu);
    });
  }

  function computeVisaScore(formData) {
    var score = 50;
    var gpa = parseFloat(formData.gpa) || 0;
    if (gpa >= 3.5) score += 25; else if (gpa >= 3.0) score += 15; else if (gpa >= 2.5) score += 5; else score -= 10;
    var engScore = parseFloat(formData.englishScore) || 0;
    var engType = (formData.englishTest || '').toUpperCase();
    var engNorm = engType === 'IELTS' ? engScore * 13.33 : engScore;
    if (engNorm >= 100) score += 15; else if (engNorm >= 80) score += 8; else if (engNorm < 60) score -= 10;
    var gap = parseInt(formData.gapYears, 10) || 0;
    if (gap === 0) score += 5; else if (gap > 5) score -= 20; else if (gap > 2) score -= 10;
    var fin = (formData.finance || '').toUpperCase();
    if (fin === 'STRONG' || fin === 'VERY STRONG') score += 15; else if (fin === 'MODERATE') score += 5; else score -= 10;
    score = Math.max(0, Math.min(100, score));
    return { score: score, band: score >= 70 ? 'HIGH' : score >= 45 ? 'MODERATE' : 'LOW' };
  }

  function initVisaChecker() {
    var form = document.getElementById('visa-checker-form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var fd = new FormData(form);
      var data = { name: fd.get('name')||'', email: fd.get('email')||'', country: fd.get('country')||'USA', level: fd.get('level')||'', gpa: fd.get('gpa')||'0', englishTest: fd.get('englishTest')||'', englishScore: fd.get('englishScore')||'0', gapYears: fd.get('gapYears')||'0', finance: fd.get('finance')||'' };
      var r = computeVisaScore(data);
      var q = new URLSearchParams({ score: r.score, band: r.band, country: data.country, gpa: data.gpa, finance: data.finance, name: data.name, email: data.email });
      window.location.href = 'result.html?' + q.toString();
    });
  }

  window.VSC_CONSULTANCIES = {
    kiec: { name: 'KIEC - Kathmandu International Education Center', slug: 'kiec', verified: true, rating: 4.8, reviews: 1247, country: 'Nepal', city: 'Kathmandu', services: ['USA Visa', 'UK Visa', 'Australia Visa', 'Canada Visa', 'Document Preparation', 'Scholarship Guidance'], description: 'Leading education consultancy with over 15 years of experience.', established: '2008', whatsapp: '9779800000000', bookingUrl: '#' },
    ace: { name: 'ACE Education Consultancy', slug: 'ace', verified: true, rating: 4.6, reviews: 892, country: 'Nepal', city: 'Kathmandu', services: ['USA Visa', 'UK Visa', 'Australia Visa', 'Document Review'], description: 'Personalized visa guidance and end-to-end support.', established: '2012', whatsapp: '9779800000000', bookingUrl: '#' },
    global: { name: 'Global Study Abroad', slug: 'global', verified: true, rating: 4.7, reviews: 654, country: 'Nepal', city: 'Lalitpur', services: ['USA Visa', 'Canada Visa', 'Europe Visa'], description: 'Trusted partner for study abroad.', established: '2015', whatsapp: '9779800000000', bookingUrl: '#' },
    edwise: { name: 'EdWise International', slug: 'edwise', verified: true, rating: 4.5, reviews: 523, country: 'Nepal', city: 'Kathmandu', services: ['UK Visa', 'Australia Visa', 'New Zealand Visa'], description: 'Expert consultants for UK and Australia.', established: '2010', whatsapp: '9779800000000', bookingUrl: '#' },
    horizon: { name: 'Horizon Education', slug: 'horizon', verified: true, rating: 4.9, reviews: 1102, country: 'Nepal', city: 'Kathmandu', services: ['USA Visa', 'UK Visa', 'Canada Visa', 'Japan Visa', 'Korea Visa'], description: 'Premium consultancy with exceptional success rates.', established: '2006', whatsapp: '9779800000000', bookingUrl: '#' },
    aspire: { name: 'Aspire Overseas', slug: 'aspire', verified: true, rating: 4.4, reviews: 387, country: 'Nepal', city: 'Pokhara', services: ['Australia Visa', 'Canada Visa'], description: 'Regional leader in western Nepal.', established: '2014', whatsapp: '9779800000000', bookingUrl: '#' },
    nexus: { name: 'Nexus Education Consultants', slug: 'nexus', verified: true, rating: 4.7, reviews: 756, country: 'Nepal', city: 'Kathmandu', services: ['USA Visa', 'UK Visa', 'Europe Visa', 'Scholarship'], description: 'Comprehensive visa support.', established: '2011', whatsapp: '9779800000000', bookingUrl: '#' },
    pioneer: { name: 'Pioneer Study Abroad', slug: 'pioneer', verified: true, rating: 4.6, reviews: 445, country: 'Nepal', city: 'Kathmandu', services: ['USA Visa', 'Australia Visa', 'Canada Visa'], description: 'Student-first approach.', established: '2013', whatsapp: '9779800000000', bookingUrl: '#' }
  };

  function initAccordion() {
    document.querySelectorAll('.accordion-trigger').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var item = this.closest('.accordion-item');
        var open = item.classList.contains('open');
        item.parentElement.querySelectorAll('.accordion-item').forEach(function(i) { i.classList.remove('open'); });
        if (!open) item.classList.add('open');
      });
    });
  }

  function initTabs() {
    document.querySelectorAll('.tab').forEach(function(t) {
      t.addEventListener('click', function() {
        var c = this.closest('.tabs');
        if (c) { c.querySelectorAll('.tab').forEach(function(x) { x.classList.remove('active'); }); this.classList.add('active'); }
      });
    });
  }

  function initBlogFilter() {
    var tabs = document.getElementById('blog-tabs');
    var searchInput = document.getElementById('blog-search');
    var cards = document.querySelectorAll('.blog-card');
    var noResults = document.getElementById('blog-no-results');
    if (!cards.length) return;

    function getActiveCategory() {
      var activeTab = tabs && tabs.querySelector('.tab.active');
      return activeTab ? activeTab.textContent.trim() : 'All';
    }

    function filterCards() {
      var category = getActiveCategory();
      var query = (searchInput && searchInput.value || '').toLowerCase().trim();
      var visibleCount = 0;
      cards.forEach(function(card) {
        var cardCategory = card.getAttribute('data-category') || '';
        var title = (card.querySelector('.card-title') || {}).textContent || '';
        var text = (card.querySelector('.card-text') || {}).textContent || '';
        var matchCategory = category === 'All' || cardCategory === category;
        var matchSearch = !query || title.toLowerCase().indexOf(query) >= 0 || text.toLowerCase().indexOf(query) >= 0;
        var show = matchCategory && matchSearch;
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });
      if (noResults) noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    if (tabs) {
      tabs.querySelectorAll('.tab').forEach(function(tab) {
        tab.addEventListener('click', filterCards);
      });
    }
    if (searchInput) {
      searchInput.addEventListener('input', filterCards);
    }
  }

  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We\'ll get back to you soon.');
      form.reset();
    });
  }

  function initConsultancyFilter() {
    var fc = document.getElementById('fc');
    var fcity = document.getElementById('fcity');
    var fverified = document.getElementById('fverified');
    var fapply = document.getElementById('fapply');
    var cards = document.querySelectorAll('.consultancy-card');
    if (!cards.length) return;

    var params = new URLSearchParams(window.location.search);
    if (fc && params.get('country')) fc.value = params.get('country');
    if (fcity && params.get('city')) fcity.value = params.get('city');

    function filter() {
      var country = (fc && fc.value) || '';
      var city = (fcity && fcity.value) || '';
      var verifiedOnly = fverified && fverified.checked;
      cards.forEach(function(card) {
        var cardCountry = (card.getAttribute('data-country') || '').toLowerCase();
        var cardCity = (card.getAttribute('data-city') || '').toLowerCase();
        var cardVerified = card.getAttribute('data-verified') === 'true';
        var matchCountry = !country || cardCountry.indexOf(country.toLowerCase()) >= 0;
        var matchCity = !city || cardCity === city.toLowerCase();
        var matchVerified = !verifiedOnly || cardVerified;
        card.style.display = (matchCountry && matchCity && matchVerified) ? '' : 'none';
      });
    }
    if (fc) fc.addEventListener('change', filter);
    if (fcity) fcity.addEventListener('change', filter);
    if (fverified) fverified.addEventListener('change', filter);
    if (fapply) fapply.addEventListener('click', filter);
    filter();
  }

  function initChatbase() {
    var id = window.VSC_CHATBOT_ID || '';
    if (!id || id === 'YOUR_CHATBOT_ID') return;
    var s = document.createElement('script');
    s.src = 'https://www.chatbase.co/embed.min.js';
    s.setAttribute('data-id', id);
    s.defer = true;
    document.body.appendChild(s);
  }

  function init() {
    initMobileMenu();
    initVisaChecker();
    initAccordion();
    initTabs();
    initBlogFilter();
    initContactForm();
    initConsultancyFilter();
    initChatbase();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
