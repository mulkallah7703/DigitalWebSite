// مبدّل قائمة التنقل على الهواتف دون التأثير على نسخة سطح المكتب
(function(){
  function initNavToggle(){
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.main-nav');
    if (!toggle || !nav) {
      return;
    }

    function setState(isOpen){
      document.body.classList.toggle('nav-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'إغلاق القائمة' : 'فتح القائمة');
    }

    toggle.addEventListener('click', function(){
      var isOpen = document.body.classList.contains('nav-open');
      setState(!isOpen);
    });

    nav.addEventListener('click', function(event){
      var target = event.target;
      if (target && target.tagName === 'A' && window.matchMedia('(max-width: 800px)').matches) {
        setState(false);
      }
    });

    window.addEventListener('resize', function(){
      if (!window.matchMedia('(max-width: 800px)').matches) {
        setState(false);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavToggle);
  } else {
    initNavToggle();
  }
})();
