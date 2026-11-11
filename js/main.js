/* ============================================================
   FN TRADUCTION — scripts
   ============================================================ */
(function(){
  // ---- Menu mobile ----
  var burger=document.getElementById('burger');
  var nav=document.getElementById('mainnav');
  if(burger&&nav){
    burger.addEventListener('click',function(){nav.classList.toggle('open');});
  }

  // ---- Bascule de langue FR / BN ----
  function applyLang(lang){
    document.querySelectorAll('[data-fr]').forEach(function(el){
      var target=(lang==='bn'&&el.getAttribute('data-bn'))?el.getAttribute('data-bn'):el.getAttribute('data-fr');
      el.innerHTML=target;
    });
    document.querySelectorAll('[data-fr-placeholder]').forEach(function(el){
      var t=(lang==='bn'&&el.getAttribute('data-bn-placeholder'))?el.getAttribute('data-bn-placeholder'):el.getAttribute('data-fr-placeholder');
      el.setAttribute('placeholder',t);
    });
    document.documentElement.setAttribute('lang',lang==='bn'?'bn':'fr');
    document.querySelectorAll('.lang-switch button').forEach(function(b){
      b.classList.toggle('on',b.getAttribute('data-lang')===lang);
    });
    try{localStorage.setItem('fn-lang',lang);}catch(e){}
  }
  document.querySelectorAll('.lang-switch button').forEach(function(b){
    b.addEventListener('click',function(){applyLang(b.getAttribute('data-lang'));});
  });
  var saved=null;
  try{saved=localStorage.getItem('fn-lang');}catch(e){}
  applyLang(saved==='bn'?'bn':'fr');

  // ---- Formulaire devis (envoi par e-mail) ----
  var form=document.getElementById('devis-form');
  if(form){
    form.addEventListener('submit',function(ev){
      ev.preventDefault();
      var d=new FormData(form);
      var lines=[
        'Nom / নাম: '+d.get('nom'),
        'E-mail: '+d.get('email'),
        'Téléphone / ফোন: '+d.get('tel'),
        'Service: '+d.get('service'),
        'Langues: '+(d.get('source')||'')+' -> '+(d.get('cible')||''),
        'Délai / সময়সীমা: '+(d.get('delai')||'-'),
        '',
        'Message:',d.get('message')||'-'
      ];
      var subject='Demande de devis — '+d.get('service')+' — '+d.get('nom');
      window.location.href='mailto:contact@fntraduction.fr?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines.join('
'));
      var ok=document.getElementById('form-success');
      if(ok){ok.style.display='block';}
    });
  }
})();
