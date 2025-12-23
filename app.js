// Personal single-user editor with simple lock (passcode) and localStorage persistence
(function(){
  const IDS = {
    lockToggle:'#lock-toggle',
    title:'#post-title', date:'#post-date', company:'#post-company', body:'#post-body', transcript:'#post-transcript',
    save:'#save', clear:'#clear', exportTxt:'#export-txt', exportJson:'#export-json', print:'#print'
  };

  function $(s){return document.querySelector(s)}

  // State stored in localStorage under 'personal_post'
  const storageKey = 'personal_post_v1';
  const lockKey = 'personal_post_lock_v1';

  function load(){
    try{
      const raw = localStorage.getItem(storageKey);
      if(raw){
        const data = JSON.parse(raw);
        $(IDS.title).value = data.title || '';
        $(IDS.date).value = data.date || '';
        $(IDS.company).value = data.company || 'Discover';
        $(IDS.body).value = data.body || '';
        $(IDS.transcript).value = data.transcript || '';
      }
    }catch(e){console.warn('load failed',e)}
  }
  function save(){
    const data = {
      title: $(IDS.title).value.trim(),
      date: $(IDS.date).value || new Date().toISOString().slice(0,10),
      company: $(IDS.company).value.trim(),
      body: $(IDS.body).value,
      transcript: $(IDS.transcript).value
    };
    try{ localStorage.setItem(storageKey, JSON.stringify(data)); alert('Saved locally'); }catch(e){alert('Save failed: '+e.message)}
  }
  function clearAll(){
    if(!confirm('Clear all fields and local copy? This cannot be undone.')) return;
    $(IDS.title).value=''; $(IDS.date).value=''; $(IDS.body).value=''; $(IDS.transcript).value='';
    localStorage.removeItem(storageKey);
  }

  function exportTxt(){
    const title = $(IDS.title).value || 'My experience';
    const date = $(IDS.date).value || new Date().toISOString().slice(0,10);
    const body = $(IDS.body).value || '';
    const transcript = $(IDS.transcript).value || '';
    const content = `Title: ${title}\nDate: ${date}\nCompany: Discover\n\nStory:\n${body}\n\nTranscripts/Notes:\n${transcript}`;
    downloadFile(content, sanitizeFileName(title)+'.txt','text/plain');
  }
  function exportJson(){
    const raw = localStorage.getItem(storageKey) || '{}';
    const obj = JSON.parse(raw);
    downloadFile(JSON.stringify(obj, null, 2), (sanitizeFileName(obj.title||'experience')||'experience')+'.json','application/json');
  }
  function sanitizeFileName(name){
    return name.replace(/[^a-z0-9\-\_ ]/gi,'').replace(/\s+/g,'_').slice(0,80);
  }
  function downloadFile(content, filename, mime){
    const blob = new Blob([content],{type:mime});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download=filename; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  // Simple passcode lock stored in localStorage (not secure, just prevents casual edits)
  function isLocked(){
    return localStorage.getItem(lockKey) === 'locked';
  }
  function setLocked(val){
    if(val) localStorage.setItem(lockKey,'locked'); else localStorage.removeItem(lockKey);
    updateLockUI();
  }
  function promptUnlock(){
    // If no passcode set, ask to create one
    const pass = localStorage.getItem('personal_post_pass_v1');
    if(!pass){
      if(confirm('No edit passcode set. Create one now to protect this page from casual edits?')){
        const p = prompt('Enter a short passcode (you will need this to unlock):');
        if(p && p.trim().length>=3){ localStorage.setItem('personal_post_pass_v1',p); setLocked(false); alert('Passcode saved. Page unlocked for editing.'); return true; }
        alert('Passcode not set.'); return false;
      }
      return false;
    }
    const attempt = prompt('Enter your passcode to unlock:');
    if(attempt === pass){ setLocked(false); return true; }
    alert('Incorrect passcode'); return false;
  }
  function updateLockUI(){
    const locked = isLocked();
    const btn = $(IDS.lockToggle) || document.getElementById('lock-toggle');
    btn.textContent = locked? 'Unlock to Edit' : 'Lock Editing';
    // enable/disable fields
    [IDS.title, IDS.date, IDS.body, IDS.transcript, IDS.save, IDS.clear, IDS.exportTxt, IDS.exportJson, IDS.print].forEach(id=>{
      const el = $(id);
      if(!el) return;
      el.disabled = locked;
    });
  }

  // Public banner hide state (so visitors can dismiss the notice)
  const bannerKey = 'public_banner_hidden_v1';
  function isBannerHidden(){ return localStorage.getItem(bannerKey) === '1'; }
  function setBannerHidden(val){ if(val) localStorage.setItem(bannerKey,'1'); else localStorage.removeItem(bannerKey); updateBannerUI(); }
  function updateBannerUI(){ const el = document.getElementById('public-banner'); if(!el) return; el.style.display = isBannerHidden() ? 'none' : 'flex'; }

  function init(){
    // Ensure company field always shows Discover and disabled
    $(IDS.company).value = 'Discover';
    load();
    if(localStorage.getItem('personal_post_pass_v1') && !localStorage.getItem(lockKey)){
      // If a passcode exists but lockKey not set, set locked by default
      setLocked(true);
    }
    updateLockUI();

    $(IDS.save).addEventListener('click', save);
    $(IDS.clear).addEventListener('click', clearAll);
    $(IDS.exportTxt).addEventListener('click', exportTxt);
    $(IDS.exportJson).addEventListener('click', exportJson);
    $(IDS.print).addEventListener('click', ()=>{ window.print(); });

    $(IDS.lockToggle).addEventListener('click', ()=>{
      if(isLocked()){
        // try to unlock
        const ok = promptUnlock(); if(ok) setLocked(false);
      } else {
        // lock
        setLocked(true); alert('Page locked — editing disabled.');
      }
    });

    // Banner hide / show
    const bannerHide = document.getElementById('banner-hide');
    if(bannerHide){
      bannerHide.addEventListener('click', ()=>{ setBannerHidden(true); });
    }
    updateBannerUI();

    // autosave every 10s if unlocked
    setInterval(()=>{ if(!isLocked()) save(); },10000);
  }

  window.addEventListener('DOMContentLoaded', init);
})();
