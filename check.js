if('serviceWorker' in navigator){
 const had=!!navigator.serviceWorker.controller;let rl=0,pend=false;
 const safe=()=>{const c=document.getElementById('cinematic');return !(c&&c.classList.contains('show'))&&(typeof mode==='undefined'||['title','settings','achievements','controls'].includes(mode))};
 const go=()=>{if(!rl++)location.reload()};
 navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!had)return;if(safe())go();else{pend=true;window.__netToast&&window.__netToast('UPDATE READY · APPLIES WHEN YOU RETURN TO MENU','ok',5000)}});
 setInterval(()=>{if(pend&&safe())go()},1500);
 addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').catch(()=>{});navigator.serviceWorker.ready.then(()=>{if(!had&&navigator.onLine&&window.__netToast)window.__netToast('READY TO PLAY OFFLINE ✓','ok',3500)}).catch(()=>{})})}