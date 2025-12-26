// شريط إشعار ملفات تعريف الارتباط يظهر مرة واحدة ويُحفظ محليًا
(function(){
  const key = 'cookieConsent';
  if (localStorage.getItem(key) === 'accepted') {
    return;
  }

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-live', 'polite');

  const message = document.createElement('p');
  message.textContent = 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل الأداء. بالاستمرار في التصفح أو الضغط على "موافق" فأنت توافق على استخدام الكوكيز.';

  const actions = document.createElement('div');
  actions.className = 'cookie-actions';

  const accept = document.createElement('button');
  accept.className = 'cookie-accept';
  accept.type = 'button';
  accept.textContent = 'موافق';

  accept.addEventListener('click', function(){
    localStorage.setItem(key, 'accepted');
    banner.remove();
  });

  actions.appendChild(accept);
  banner.appendChild(message);
  banner.appendChild(actions);
  document.body.appendChild(banner);
})();
