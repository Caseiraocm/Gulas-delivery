
(()=>{
  const regularOpenProduct=openProduct;
  const pastelCount=p=>{const m=String(p?.name||'').match(/^Pastel\s+([123])\s+Recheio/i);return m?Number(m[1]):0};
  const optionLabel=(name,prefix)=>String(name||'').slice(prefix.length).trim();
  openProduct=function(id){
    const p=data.products.find(x=>x.id===id),required=pastelCount(p);
    if(!p||!required)return regularOpenProduct(id);
    const available=allowedAddons(p),fillPrefix='Recheio:',freePrefix='Acréscimo gratuito:';
    const fillings=available.filter(a=>String(a.name||'').startsWith(fillPrefix));
    const freeExtras=available.filter(a=>String(a.name||'').startsWith(freePrefix));
    modal(`<div class="sheeth"><div><h2>${esc(p.name)}</h2><div class="adminSub">Monte seu pastel</div></div><button class="x" data-close>×</button></div>
      <div class="pastelBuilderIntro">Escolha exatamente <b>${required} recheio${required===1?'':'s'}</b>. Os acréscimos gratuitos são opcionais.</div>
      <section class="pastelGroup"><div class="pastelGroupHead"><b>Escolha seu recheio</b><span id="pastelFillingCount">0 de ${required}</span></div>${fillings.map(a=>`<label class="pastelOption"><input type="checkbox" data-pastel-filling="${a.id}"><span>${esc(optionLabel(a.name,fillPrefix))}</span><small>Grátis</small></label>`).join('')}</section>
      <section class="pastelGroup"><div class="pastelGroupHead"><b>Acréscimos gratuitos</b><span id="pastelFreeCount">0 de 5</span></div>${freeExtras.map(a=>`<label class="pastelOption"><input type="checkbox" data-pastel-free="${a.id}"><span>${esc(optionLabel(a.name,freePrefix))}</span><small>Opcional</small></label>`).join('')}</section>
      <div class="field"><label>Observação do item</label><textarea id="itemNote" class="ta" placeholder="Ex.: retirar cebola, caprichar no recheio..."></textarea></div>
      <button id="confirmAdd" class="primary" disabled>Escolha ${required} recheio${required===1?'':'s'}</button>`);
    bindClose();
    const fillingInputs=[...document.querySelectorAll('[data-pastel-filling]')],freeInputs=[...document.querySelectorAll('[data-pastel-free]')],button=$('#confirmAdd');
    const update=()=>{const fc=fillingInputs.filter(i=>i.checked).length,xc=freeInputs.filter(i=>i.checked).length;$('#pastelFillingCount').textContent=`${fc} de ${required}`;$('#pastelFreeCount').textContent=`${xc} de 5`;button.disabled=fc!==required;button.textContent=fc===required?`Adicionar ao carrinho • ${fmt(priceOf(p))}`:`Escolha ${required-fc} recheio${required-fc===1?'':'s'}`};
    fillingInputs.forEach(input=>input.onchange=()=>{if(input.checked&&fillingInputs.filter(i=>i.checked).length>required){input.checked=false;showAppToast(`Este pastel permite ${required} recheio${required===1?'':'s'}.`,'err')}update()});
    freeInputs.forEach(input=>input.onchange=()=>{if(input.checked&&freeInputs.filter(i=>i.checked).length>5){input.checked=false;showAppToast('Escolha no máximo 5 acréscimos gratuitos.','err')}update()});
    button.onclick=()=>{const chosenFillings=fillingInputs.filter(i=>i.checked);if(chosenFillings.length!==required){showAppToast(`Escolha exatamente ${required} recheio${required===1?'':'s'}.`,'err');return}const selected=[...chosenFillings,...freeInputs.filter(i=>i.checked)].map(i=>data.addons.find(a=>a.id===(i.dataset.pastelFilling||i.dataset.pastelFree))).filter(Boolean);cart.push({key:crypto.randomUUID(),product:p,addons:selected,note:$('#itemNote').value.trim(),qty:1});closeModal();updateCartBar()};
    update();
  };
})();
