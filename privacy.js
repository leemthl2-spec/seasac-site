/*
  신청 폼 처리. 입력값은 어디로도 보내지 않습니다.
  - 폼 입력칸에는 name 속성이 없어서, 스크립트가 꺼져 있어도 값이 주소창·서버로 넘어가지 않습니다.
  - 제출 → 개인정보 안내 팝업 → 동의 → 입력값 즉시 삭제 → result.html 이동.
  - 나중에 폼을 Make·구글시트 등에 연결하면 팝업 문구(index.html의 #privacy-modal)를 반드시 고쳐야 합니다.
*/
(function () {
  var form = document.getElementById('lead-form');
  var modal = document.getElementById('privacy-modal');
  if (!modal) return;
  var agree = document.getElementById('privacy-agree');
  var ok = document.getElementById('privacy-ok');
  var cancel = document.getElementById('privacy-cancel');
  var mode = 'info';

  function wipe() {
    if (!form) return;
    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      if (el.type === 'checkbox' || el.type === 'radio') el.checked = false;
      else el.value = '';
    });
    form.reset();
  }

  function open(m) {
    mode = m;
    agree.checked = false;
    ok.disabled = true;
    ok.textContent = m === 'submit' ? '동의하고 완료하기' : '확인했습니다';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    agree.focus();
  }

  function close(method) {
    if (mode === 'submit' && method) {
      document.dispatchEvent(new CustomEvent('cookpick:form-abandon', { detail: { close_method: method } }));
    }
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  agree.addEventListener('change', function () { ok.disabled = !agree.checked; });
  cancel.addEventListener('click', function () { close('button'); });
  modal.addEventListener('click', function (e) { if (e.target === modal) close('backdrop'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close('escape'); });

  ok.addEventListener('click', function () {
    if (mode !== 'submit') {
      document.dispatchEvent(new CustomEvent('cookpick:privacy-confirm'));
      close();
      return;
    }
    wipe();
    // 이름·연락처 값은 보내지 않고 신청 완료 사실만 측정합니다.
    if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', {
      lead_source: 'website_pre_register',
      form_id: 'lead-form',
      form_name: '사전예약'
    });
    if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
    location.replace('result.html');
  });

  document.querySelectorAll('[data-privacy-open]').forEach(function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); open('info'); });
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      open('submit');
    });
  }

  // 검토 메모 패널 닫기 (검토용 빌드에만 있음)
  var rp = document.querySelector('.review-panel button');
  if (rp) rp.addEventListener('click', function () { rp.parentNode.remove(); });
})();
