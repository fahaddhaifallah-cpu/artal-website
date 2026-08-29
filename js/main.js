(function(){
  var htmlRoot = document.documentElement;
  var langBtn = document.getElementById('langBtn');
  var menuBtn = document.querySelector('.menu-btn');
  var navLinks = document.querySelector('nav.links');
  var STORAGE_KEY = 'artal-lang';
  var current = 'ar';

  function setLanguage(lang, skipSave){
    current = lang;
    htmlRoot.setAttribute('lang', lang);
    htmlRoot.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');

    document.querySelectorAll('[data-en]').forEach(function(el){
      if(el.dataset.arOriginal === undefined){
        el.dataset.arOriginal = el.textContent;
      }
      el.textContent = lang === 'en' ? el.dataset.en : el.dataset.arOriginal;
    });

    document.querySelectorAll('[data-en-aria]').forEach(function(el){
      if(el.dataset.arAriaOriginal === undefined){
        el.dataset.arAriaOriginal = el.getAttribute('aria-label') || '';
      }
      el.setAttribute('aria-label', lang === 'en' ? el.dataset.enAria : el.dataset.arAriaOriginal);
    });

    document.querySelectorAll('[data-en-ph]').forEach(function(el){
      el.setAttribute('placeholder', lang === 'en' ? el.dataset.enPh : el.dataset.arPh);
    });

    var body = document.body;
    if(body.dataset.titleEn && body.dataset.titleAr){
      document.title = lang === 'en' ? body.dataset.titleEn : body.dataset.titleAr;
    }

    if(!skipSave){
      try{ localStorage.setItem(STORAGE_KEY, lang); }catch(e){}
    }
  }

  try{
    var saved = localStorage.getItem(STORAGE_KEY);
    if(saved === 'en' || saved === 'ar'){
      setLanguage(saved, true);
    }
  }catch(e){}

  if(langBtn){
    langBtn.addEventListener('click', function(){
      setLanguage(current === 'ar' ? 'en' : 'ar');
    });
  }

  if(menuBtn && navLinks){
    menuBtn.addEventListener('click', function(){
      navLinks.classList.toggle('open');
    });
  }
})();
