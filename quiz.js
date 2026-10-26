const sh=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function quiz(c){
const app=document.getElementById('app'),P=Object.keys(c.pools);let n=10,p=P[0];
const btn=(t,k,v,cur)=>`<button class="${cur==v?'on':''}" data-k="${k}" data-v="${v}">${t}</button>`;
function setup(){
app.innerHTML=(P.length>1?`<p>Tipo: ${P.map(x=>btn(x,'p',x,p)).join('')}</p>`:'')+`<p>Numero di domande: ${[10,15,20].map(x=>btn(x,'n',x,n)).join('')}</p><p><button class="go" id="go">Inizia</button></p>`;
app.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.id=='go')return start();if(b.dataset.k=='n')n=+b.dataset.v;else p=b.dataset.v;setup()}}
function start(){
const qs=sh(c.pools[p]).slice(0,n).map(c.make);
app.innerHTML=qs.map((q,i)=>`<section class="card" id="c${i}"><p class="q">${i+1}. ${q.q}</p>${q.g.map((g,j)=>`<div class="g">${g.o.map(o=>`<label><input type="radio" name="r${i}_${j}" value="${o}"><span>${o}</span></label>`).join('')}</div>`).join('')}<p class="fb"></p></section>`).join('')+`<p><button class="go" id="ck">Verifica</button><button id="rs">Ricomincia</button></p><p id="sc" class="sc"></p>`;
app.onclick=e=>{const b=e.target.closest('button');if(!b)return;if(b.id=='rs'){scrollTo(0,0);return setup()}if(b.id!='ck')return;
let ok=0;qs.forEach((q,i)=>{const r=q.g.every((g,j)=>{const s=app.querySelector(`input[name=r${i}_${j}]:checked`);return(s?s.value:'')===g.a});
const d=document.getElementById('c'+i);d.className='card '+(r?'ok':'ko');
d.querySelector('.fb').innerHTML=r?'✔ Esatto!'+(q.n?' <small>'+q.n+'</small>':''):'✘ Risposta corretta: <b>'+q.g.map(g=>g.a).filter(Boolean).join(' · ')+'</b>'+(q.n?'<br><small>'+q.n+'</small>':'');ok+=r});
document.getElementById('sc').textContent=`Punteggio: ${ok} su ${qs.length}`}}
setup()}
