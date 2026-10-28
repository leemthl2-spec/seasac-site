/* CookPick GA4 interaction tracking. Never send form field values or other PII. */
(function () {
  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  function text(el) {
    return (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 100);
  }

  document.querySelectorAll('.site-header nav a, footer nav a, .site-header .brand, footer .brand').forEach(function (link) {
    link.addEventListener('click', function () {
      var href = link.getAttribute('href') || '';
      track('navigation_click', {
        navigation_type: link.classList.contains('brand') ? 'logo' : 'anchor',
        link_text: text(link),
        link_url: href,
        destination_section: href.charAt(0) === '#' ? href.slice(1) : '',
        link_location: link.closest('footer') ? 'footer' : 'header'
      });
    });
  });

  var headerCta = document.querySelector('.nav-cta');
  if (headerCta) headerCta.addEventListener('click', function () {
    track('cta_click', {
      cta_name: 'pre_register',
      cta_text: text(headerCta),
      cta_location: 'header',
      destination_section: 'apply'
    });
  });

  var heroLink = document.querySelector('.hero-link');
  if (heroLink) heroLink.addEventListener('click', function () {
    track('select_promotion', {
      promotion_id: 'pre_register_30',
      promotion_name: '사전예약 30% 혜택',
      creative_slot: 'hero',
      destination_section: 'apply'
    });
  });

  var promo = document.querySelector('.hero');
  if (promo && 'IntersectionObserver' in window) {
    var promoSeen = false;
    new IntersectionObserver(function (entries, observer) {
      if (!promoSeen && entries[0] && entries[0].isIntersecting) {
        promoSeen = true;
        observer.disconnect();
        track('view_promotion', {
          promotion_id: 'pre_register_30',
          promotion_name: '사전예약 30% 혜택',
          creative_slot: 'hero'
        });
      }
    }, { threshold: 0.5 }).observe(promo);
  }

  var menuItems = [
    { item_id: 'feta_tomato_pasta', item_name: '페타치즈 토마토 파스타', index: 0 },
    { item_id: 'garlic_steak_rice', item_name: '갈릭 스테이크 덮밥', index: 1 },
    { item_id: 'mushroom_risotto', item_name: '버섯 크림 리조또', index: 2 }
  ];
  var menuSection = document.getElementById('menu');
  if (menuSection && 'IntersectionObserver' in window) {
    var menuSeen = false;
    new IntersectionObserver(function (entries, observer) {
      if (!menuSeen && entries[0] && entries[0].isIntersecting) {
        menuSeen = true;
        observer.disconnect();
        track('view_item_list', { item_list_id: 'launch_menu', item_list_name: '출시 예정 메뉴', items: menuItems });
      }
    }, { threshold: 0.35 }).observe(menuSection);
  }
  document.querySelectorAll('.food-card').forEach(function (card, index) {
    card.addEventListener('click', function () {
      track('select_item', {
        item_list_id: 'launch_menu',
        item_list_name: '출시 예정 메뉴',
        items: [menuItems[index]]
      });
    });
  });

  document.querySelectorAll('.social-link').forEach(function (link) {
    link.addEventListener('click', function () {
      track('social_click', {
        platform: link.classList.contains('youtube') ? 'youtube' : 'instagram',
        link_location: 'floating_rail',
        link_url: link.href
      });
    });
  });

  var form = document.getElementById('lead-form');
  if (form) {
    var started = false;
    form.querySelectorAll('input').forEach(function (field) {
      field.addEventListener('input', function () {
        if (started) return;
        started = true;
        track('lead_form_start', {
          form_id: 'lead-form',
          form_name: '사전예약',
          first_field: field.id === 'f-name' ? 'name' : 'contact'
        });
      });
    });
    form.addEventListener('submit', function () {
      track('form_submit_attempt', {
        form_id: 'lead-form',
        form_name: '사전예약',
        validation_status: form.checkValidity() ? 'valid' : 'invalid'
      });
    });
  }

  var privacyOpen = document.querySelector('[data-privacy-open]');
  if (privacyOpen) privacyOpen.addEventListener('click', function () {
    track('privacy_notice_open', { form_id: 'lead-form', notice_type: 'no_data_storage' });
  });
  var privacyAgree = document.getElementById('privacy-agree');
  if (privacyAgree) privacyAgree.addEventListener('change', function () {
    track('privacy_consent_update', {
      form_id: 'lead-form',
      consent_status: privacyAgree.checked ? 'granted' : 'denied'
    });
  });
  document.addEventListener('cookpick:form-abandon', function (event) {
    track('form_abandon', {
      form_id: 'lead-form',
      abandon_step: 'privacy_modal',
      close_method: event.detail.close_method
    });
  });
  document.addEventListener('cookpick:privacy-confirm', function () {
    track('privacy_notice_confirm', { form_id: 'lead-form', notice_type: 'no_data_storage' });
  });

  var returnHome = document.querySelector('.result .btn');
  if (returnHome) {
    track('lead_complete_view', { form_id: 'lead-form', lead_source: 'website_pre_register' });
    returnHome.addEventListener('click', function () {
      track('navigation_click', {
        navigation_type: 'return_home',
        link_text: text(returnHome),
        link_location: 'lead_complete',
        link_url: returnHome.getAttribute('href')
      });
    });
  }
})();
