// Google Analytics 4 (GA4) Configuration
// Replace 'G-XXXXXXXXXX' with your actual GA4 Measurement ID

(function() {
  // Check if GA4 Measurement ID is configured
  const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with your GA4 Measurement ID
  
  if (GA4_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('Google Analytics: Measurement ID not configured. Please update public/analytics.js');
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', GA4_MEASUREMENT_ID, {
    'send_page_view': true,
    'anonymize_ip': true, // GDPR compliance
  });

  // Track page views on route changes (for SPA)
  let lastPath = location.pathname;
  const observer = new MutationObserver(() => {
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      gtag('event', 'page_view', {
        page_path: location.pathname,
        page_title: document.title,
      });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Custom event tracking helpers
  window.trackEvent = function(eventName, eventParams = {}) {
    gtag('event', eventName, eventParams);
  };

  // Track outbound links
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.hostname !== location.hostname) {
      gtag('event', 'click', {
        event_category: 'outbound',
        event_label: link.href,
      });
    }
  });

  // Track form submissions
  document.addEventListener('submit', function(e) {
    const form = e.target;
    if (form.tagName === 'FORM') {
      gtag('event', 'form_submit', {
        event_category: 'engagement',
        event_label: form.id || form.name || 'unnamed_form',
      });
    }
  });

  // Track WhatsApp clicks
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href.includes('wa.me')) {
      gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'WhatsApp Contact',
      });
    }
  });

  // Track phone clicks
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href.startsWith('tel:')) {
      gtag('event', 'phone_click', {
        event_category: 'engagement',
        event_label: 'Phone Call',
      });
    }
  });

  console.log('Google Analytics initialized:', GA4_MEASUREMENT_ID);
})();
