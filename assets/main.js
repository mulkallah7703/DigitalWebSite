// مساعد ذكي خفيف (غير معتمد على خادم) — يعطي اقتراحات بسيطة ويعرض نصائح
(function(){
  const bubble = document.getElementById('assistant-bubble');
  const suggestBtn = document.getElementById('suggest-btn');
  const tipsBtn = document.getElementById('tips-btn');

  function typeText(el, text, speed=30){
    el.textContent = '';
    let i=0;
    return new Promise(resolve=>{
      const t = setInterval(()=>{
        el.textContent += text[i++] || '';
        if(i>text.length){ clearInterval(t); resolve(); }
      }, speed);
    });
  }

  function pickRandomProduct(){
    const productTitles = Array.from(document.querySelectorAll('.product h3'))
      .map(h=>h.innerText.trim())
      .filter(Boolean);
    if(!productTitles.length) return 'قائمة منتجاتنا الجذابة — تفضّل بزيارة صفحة المنتجات.';
    return productTitles[Math.floor(Math.random()*productTitles.length)];
  }

  suggestBtn && suggestBtn.addEventListener('click', async ()=>{
    const p = pickRandomProduct();
    suggestBtn.disabled = true; tipsBtn.disabled = true;
    await typeText(bubble, 'أقترح لك: ' + p);
    setTimeout(()=>{ suggestBtn.disabled = false; tipsBtn.disabled = false; }, 1200);
  });

  tipsBtn && tipsBtn.addEventListener('click', async ()=>{
    tipsBtn.disabled = true; suggestBtn.disabled = true;
    await typeText(bubble, 'نصيحة SEO سريعة: استخدم عناوين وصفية، وصف ميتا موجز، وروابط داخلية منطقية. اكتب محتوى أصلي مفيد للزائر.');
    setTimeout(()=>{ tipsBtn.disabled = false; suggestBtn.disabled = false; }, 1600);
  });

  // ترحيب تلقائي بسيط بعد تحميل الصفحة
  window.addEventListener('load', ()=>{
    setTimeout(()=>{ typeText(bubble, 'مرحبًا بك في ديجيتال كين — اضغط "اقترح منتج" للحصول على فكرة سريعة.'); }, 800);
  });
})();
