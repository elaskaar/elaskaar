(function(){
  function createEl(tag, cls){
    const el = document.createElement(tag);
    if(cls) el.className = cls;
    return el;
  }

  function getPlacement(targetRect, tooltipRect, dir){
    const vw = window.innerWidth, vh = window.innerHeight;
    // Try bottom, top, end/start according to space and dir (rtl -> start is right)
    if (targetRect.bottom + 12 + tooltipRect.height < vh) return 'bottom';
    if (targetRect.top - 12 - tooltipRect.height > 0) return 'top';
    const preferStart = dir === 'rtl';
    if (preferStart){
      if (targetRect.left - 12 - tooltipRect.width > 0) return 'start';
      if (targetRect.right + 12 + tooltipRect.width < vw) return 'end';
    } else {
      if (targetRect.right + 12 + tooltipRect.width < vw) return 'end';
      if (targetRect.left - 12 - tooltipRect.width > 0) return 'start';
    }
    return 'bottom';
  }

  function positionTooltip(tt, arrow, rect, placement, dir){
    const pad = 10;
    const ttRect = tt.getBoundingClientRect();
    let top = 0, left = 0;

    tt.setAttribute('data-placement', placement);

    if (placement === 'bottom'){
      top = rect.bottom + 12;
      left = Math.max(8, Math.min(rect.left, window.innerWidth - ttRect.width - 8));
    } else if (placement === 'top'){
      top = rect.top - ttRect.height - 12;
      left = Math.max(8, Math.min(rect.left, window.innerWidth - ttRect.width - 8));
    } else if (placement === 'end'){
      top = rect.top;
      left = rect.right + 12;
    } else { // start
      top = rect.top;
      left = rect.left - ttRect.width - 12;
    }

    // Keep inside viewport
    top = Math.max(8, Math.min(top, window.innerHeight - ttRect.height - 8));
    left = Math.max(8, Math.min(left, window.innerWidth - ttRect.width - 8));

    tt.style.top = `${top}px`;
    tt.style.left = `${left}px`;

    // Arrow reset (CSS handles orientation)
    arrow.style.left = '';
    arrow.style.right = '';
    arrow.style.top = '';
    arrow.style.bottom = '';
  }

  function positionSpotlight(spot, rect){
    const padding = 8;
    const r = {
      top: Math.max(0, rect.top - padding),
      left: Math.max(0, rect.left - padding),
      width: Math.min(window.innerWidth, rect.width + padding*2),
      height: Math.min(window.innerHeight, rect.height + padding*2)
    };
    spot.style.top = `${r.top}px`;
    spot.style.left = `${r.left}px`;
    spot.style.width = `${r.width}px`;
    spot.style.height = `${r.height}px`;
  }

  function scrollIntoViewIfNeeded(el){
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const inView = rect.top >= 0 && rect.bottom <= window.innerHeight && rect.left >= 0 && rect.right <= window.innerWidth;
    if (!inView){
      el.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }

  function buildUI(){
    const overlay = createEl('div','tour-overlay');
    const spotlight = createEl('div','tour-spotlight');
    const tooltip = createEl('div','tour-tooltip');
    const arrow = createEl('div','tour-arrow');
    const title = createEl('div','tour-title');
    const content = createEl('div','tour-content');
    const actions = createEl('div','tour-actions');

    const btnPrev = createEl('button','tour-btn ghost'); btnPrev.type='button';
    const btnNext = createEl('button','tour-btn primary'); btnNext.type='button';
    const btnSkip = createEl('button','tour-btn ghost'); btnSkip.type='button';

    tooltip.appendChild(arrow);
    tooltip.appendChild(title);
    tooltip.appendChild(content);
    actions.appendChild(btnSkip);
    actions.appendChild(btnPrev);
    actions.appendChild(btnNext);
    tooltip.appendChild(actions);

    document.body.appendChild(overlay);
    document.body.appendChild(spotlight);
    document.body.appendChild(tooltip);

    return { overlay, spotlight, tooltip, arrow, title, content, btnPrev, btnNext, btnSkip };
  }

  function getText(key, lang){
    const dict = {
      ar: { next: 'التالي', prev: 'السابق', skip: 'تخطي', done: 'إنهاء' },
      en: { next: 'Next', prev: 'Back', skip: 'Skip', done: 'Done' }
    };
    return (dict[lang]||dict.ar)[key];
  }

  window.startTour = function(steps, options){
    const lang = document.documentElement.lang || 'ar';
    const dir = document.documentElement.dir || (lang === 'ar' ? 'rtl' : 'ltr');
    const opts = Object.assign({ onFinish: null }, options||{});

    const ui = buildUI();
    let idx = 0;

    function cleanup(){
      ui.overlay.remove();
      ui.spotlight.remove();
      ui.tooltip.remove();
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize, true);
      if (typeof opts.onFinish === 'function') opts.onFinish();
    }

    function setTexts(){
      ui.btnNext.textContent = idx === steps.length - 1 ? getText('done', lang) : getText('next', lang);
      ui.btnPrev.textContent = getText('prev', lang);
      ui.btnSkip.textContent = getText('skip', lang);
    }

    function showStep(i){
      // Find next existing element
      let s = steps[i];
      let target = s && document.querySelector(s.selector);
      while (s && !target){
        i += 1; s = steps[i];
        target = s && document.querySelector(s.selector);
      }
      if (!s || !target){ cleanup(); return; }
      idx = i;

      scrollIntoViewIfNeeded(target);

      // Small delay to let scroll settle
      requestAnimationFrame(()=>{
        const rect = target.getBoundingClientRect();
        positionSpotlight(ui.spotlight, rect);

        ui.title.textContent = s.title || '';
        ui.content.textContent = s.content || '';

        // temp place to calc placement
        ui.tooltip.style.top = '0px';
        ui.tooltip.style.left = '0px';
        const ttRect = ui.tooltip.getBoundingClientRect();
        const placement = s.placement || getPlacement(rect, ttRect, dir);
        positionTooltip(ui.tooltip, ui.arrow, rect, placement, dir);

        setTexts();
        ui.btnPrev.style.visibility = idx === 0 ? 'hidden' : 'visible';
      });
    }

    function next(){
      if (idx >= steps.length - 1) { cleanup(); return; }
      showStep(idx + 1);
    }
    function prev(){
      if (idx <= 0) return; showStep(idx - 1);
    }

    function onKey(e){
      if (e.key === 'Escape') { cleanup(); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { next(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { prev(); }
    }

    function onResize(){
      // Reposition current step
      const s = steps[idx];
      const target = s && document.querySelector(s.selector);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      positionSpotlight(ui.spotlight, rect);
      const ttRect = ui.tooltip.getBoundingClientRect();
      const placement = s.placement || getPlacement(rect, ttRect, dir);
      positionTooltip(ui.tooltip, ui.arrow, rect, placement, dir);
    }

    ui.btnNext.addEventListener('click', next);
    ui.btnPrev.addEventListener('click', prev);
    ui.btnSkip.addEventListener('click', cleanup);
    ui.overlay.addEventListener('click', cleanup);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize, true);

    showStep(0);
  };
})();
