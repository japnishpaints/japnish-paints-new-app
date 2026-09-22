/* JAPNISH MOBILE APP v46 FINAL — flat international UI, single transparent logo */

/* JAPNISH MOBILE APP v31 — Helper dashboard parity + full web slider */
const C=window.JP_CONFIG||{};const A=document.getElementById("app");
const names={painter:"Painter",helper:"Helper",retailer:"Retailer",distributor:"Distributor"};
let state={role:"",token:localStorage.getItem("jp_token")||"",user:null,permissions:null,screen:"home",scanner:null,cameraStream:null,cameraTimer:null,branding:null,pendingRedeemCode:""};

function brandImageUrl(value){
  const v=String(value||'').trim();
  if(!v)return '';
  if(/^https?:\/\//i.test(v) || v.startsWith('data:') || v.startsWith('/')) return v;
  return '/uploads/'+v.replace(/^\/+/, '');
}
function applyBranding(b){
  const x=b||{};
  x.company_name=x.company_name||x.brand_name||'Japnish Paints';
  x.welcome_text=x.welcome_text||'Welcome to '+x.company_name;
  x.primary_color=x.primary_color||'#06245C';
  x.secondary_color=x.secondary_color||'#1677FF';
  x.announcement=x.announcement||'';
  x.splash_background_url=brandImageUrl(x.splash_background_url||x.splash_background||'');
  x.login_background_url=brandImageUrl(x.login_background_url||x.login_background||'')||'assets/jp-japanese-glass-bg.jpg';
  x.dashboard_background_url=brandImageUrl(x.dashboard_background_url||x.dashboard_background||'')||'assets/jp-japanese-clean-scenic-portrait.jpg';
  x.app_logo_url=brandImageUrl(x.app_logo_url||x.app_logo||x.logo_url);
  x.splash_logo_url=brandImageUrl(x.splash_logo_url||x.splash_logo||x.app_logo_url);
  x.login_logo_url=brandImageUrl(x.login_logo_url||x.login_logo||x.app_logo_url);
  x.dashboard_logo_url=brandImageUrl(x.dashboard_logo_url||x.dashboard_logo||x.app_logo_url);
  x.splash_logo_shape=x.splash_logo_shape||'circle';
  x.login_logo_shape=x.login_logo_shape||'circle';
  x.dashboard_logo_shape=x.dashboard_logo_shape||'circle';
  x.splash_logo_size=Number(x.splash_logo_size||150);
  x.login_logo_size=Number(x.login_logo_size||92);
  x.dashboard_logo_size=Number(x.dashboard_logo_size||52);
  x.splash_logo_x=Number(x.splash_logo_x||0); x.splash_logo_y=Number(x.splash_logo_y||0);
  x.login_logo_x=Number(x.login_logo_x||0); x.login_logo_y=Number(x.login_logo_y||0);
  x.dashboard_logo_x=Number(x.dashboard_logo_x||0); x.dashboard_logo_y=Number(x.dashboard_logo_y||0);
  document.documentElement.style.setProperty('--primary-color',x.primary_color);
  document.documentElement.style.setProperty('--secondary-color',x.secondary_color);
  document.documentElement.style.setProperty('--jp-primary',x.primary_color);
  document.documentElement.style.setProperty('--jp-secondary',x.secondary_color);
  document.documentElement.style.setProperty('--jp-company',JSON.stringify(x.company_name));
  document.documentElement.style.setProperty('--jp-splash-bg',x.splash_background_url?`url(\"${x.splash_background_url}\")`:'none');
  document.documentElement.style.setProperty('--jp-login-bg',x.login_background_url?`url(\"${x.login_background_url}\")`:'none');
  document.documentElement.style.setProperty('--jp-dashboard-bg',x.dashboard_background_url?`url(\"${x.dashboard_background_url}\")`:'none');
  document.documentElement.style.setProperty('--jp-splash-logo-radius',x.splash_logo_shape==='square'?'14px':'50%');
  document.documentElement.style.setProperty('--jp-login-logo-radius',x.login_logo_shape==='square'?'14px':'50%');
  document.documentElement.style.setProperty('--jp-dashboard-logo-radius',x.dashboard_logo_shape==='square'?'10px':'50%');
  document.documentElement.style.setProperty('--jp-splash-logo-size',x.splash_logo_size+'px');
  document.documentElement.style.setProperty('--jp-login-logo-size',x.login_logo_size+'px');
  document.documentElement.style.setProperty('--jp-dashboard-logo-size',x.dashboard_logo_size+'px');
  document.documentElement.style.setProperty('--jp-splash-logo-x',x.splash_logo_x+'px'); document.documentElement.style.setProperty('--jp-splash-logo-y',x.splash_logo_y+'px');
  document.documentElement.style.setProperty('--jp-login-logo-x',x.login_logo_x+'px'); document.documentElement.style.setProperty('--jp-login-logo-y',x.login_logo_y+'px');
  document.documentElement.style.setProperty('--jp-dashboard-logo-x',x.dashboard_logo_x+'px'); document.documentElement.style.setProperty('--jp-dashboard-logo-y',x.dashboard_logo_y+'px');
  document.documentElement.style.setProperty('--jp-bg-overlay',String(Number(x.background_overlay ?? 4)/100));
  let st=document.getElementById('jpDynamicBrandingStyle');
  if(!st){st=document.createElement('style');st.id='jpDynamicBrandingStyle';document.head.appendChild(st)}
  st.textContent=`
    .app .btn,.app .login-main-btn,.app button.btn{background:linear-gradient(135deg,var(--jp-primary),var(--jp-secondary)) !important;}
    .app .active,.app .selected{border-color:var(--jp-secondary) !important;}
    .app .jp-flat-header,.app .topbar{border-color:color-mix(in srgb,var(--jp-secondary) 35%,transparent);}
    .app .modern-nav button.active{color:var(--jp-secondary) !important;}
    .app .announcement-bar{background:linear-gradient(135deg,var(--jp-primary),var(--jp-secondary));}
    #splash{background-image:var(--jp-splash-bg,none)!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important;}
    .app.login-app{background-image:var(--jp-login-bg,none)!important;background-size:cover!important;background-position:center!important;background-attachment:scroll!important;}
    .app.home-app{background-image:var(--jp-dashboard-bg,none)!important;background-size:cover!important;background-position:center!important;background-attachment:scroll!important;}
    .jp-splash-logo{width:var(--jp-splash-logo-size,150px)!important;height:var(--jp-splash-logo-size,150px)!important;object-fit:contain!important;border-radius:var(--jp-splash-logo-radius,50%)!important;transform:translate(var(--jp-splash-logo-x,0px),var(--jp-splash-logo-y,0px))!important;}
    .login-logo-box img{width:var(--jp-login-logo-size,92px)!important;height:var(--jp-login-logo-size,92px)!important;object-fit:contain!important;border-radius:var(--jp-login-logo-radius,50%)!important;transform:translate(var(--jp-login-logo-x,0px),var(--jp-login-logo-y,0px))!important;}
    .home-logo img,.brand-logo-shell img,.jp-menu-brand img{width:var(--jp-dashboard-logo-size,52px)!important;height:var(--jp-dashboard-logo-size,52px)!important;object-fit:contain!important;border-radius:var(--jp-dashboard-logo-radius,50%)!important;transform:translate(var(--jp-dashboard-logo-x,0px),var(--jp-dashboard-logo-y,0px))!important;}
    .jp-splash-inner,.login-page-shell{position:relative;z-index:1;}
    .app.login-app:before,.app.home-app:before{content:"";position:fixed;inset:0;background:rgba(255,255,255,var(--jp-bg-overlay,0));pointer-events:none;z-index:0;}
    .jp-redeem-card{padding-bottom:120px!important;}
    .jp-scan-actions{display:flex;gap:8px;flex-wrap:wrap;}
    .jp-code-row{display:flex;gap:8px;align-items:stretch;margin-top:8px;position:relative;z-index:5;}
    .jp-code-row .input{flex:1;min-width:0;}
    .jp-continue-btn{flex:0 0 auto;min-width:105px;position:relative;z-index:6;}
    @media(max-width:520px){.jp-code-row{flex-direction:column}.jp-continue-btn{width:100%;}.jp-redeem-card{padding-bottom:135px!important;}}
    .app.login-app>*,.app.home-app>*{position:relative;z-index:1;}
    .app .product-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:14px;}
    .app .product-card{background:#fff;border:1px solid rgba(6,36,92,.10);border-radius:16px;padding:12px;box-shadow:0 6px 18px rgba(0,0,0,.06);overflow:hidden;}
    .app .product-card img{width:100%;height:auto;max-height:280px;object-fit:contain;border-radius:12px;background:#f4f6fa;display:block;margin:0 auto 10px;}
    .app .product-card h3{margin:5px 0 6px;font-size:15px;}
    .app .product-card b{display:block;color:var(--jp-primary);font-size:16px;margin-bottom:5px;}
    .app .product-card small{display:block;opacity:.65;margin-bottom:6px;}
    .app .product-card p{margin:0;font-size:12px;line-height:1.45;opacity:.75;}
    @media(max-width:380px){.app .product-grid{grid-template-columns:1fr;}}
  `;
  return x;
}
async function loadPublicBranding(){
  let branding={};
  try{
    const r=await fetch('https://japnishpaints.store/api/public-settings.php',{cache:'no-store'});
    const d=await r.json();
    if(d && d.data) branding=Object.assign(branding,d.data);
    else if(d && d.branding) branding=Object.assign(branding,d.branding);
  }catch(e){}
  try{
    const d=await dataApi('?action=public_branding');
    if(d.branding) branding=Object.assign(branding,d.branding);
  }catch(e){}
  if(!Object.keys(branding).length){
    try{
      const r=await fetch('https://japnishpaints.store/api/public-branding.php',{cache:'no-store'});
      const d=await r.json();
      if(d.branding) branding=Object.assign(branding,d.branding);
    }catch(e){}
  }
  return applyBranding(branding);
}
function showSplash(b){
  const s=document.getElementById('splash'); if(!s)return;
  const x=applyBranding(b||{});
  const logo=x.splash_logo_url||x.login_logo_url||x.app_logo_url||'japnish-logo.png';
  const company=x.company_name||'Japnish Paints';
  const welcome=x.welcome_text||('Welcome to '+company);
  s.innerHTML=`<div class="jp-splash-inner">
    <div class="jp-splash-logo-shell">${logo?`<img class="jp-splash-logo" src="${esc(logo)}" alt="${esc(company)}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">`:''}<div class="jp-splash-fallback" style="${logo?'display:none':''}">JP<small>${esc(company)}</small></div></div>
    <div class="jp-splash-tagline">${esc(welcome)}</div>
    <div class="jp-splash-tricolor"><i></i><i></i><i></i></div>
    <div class="jp-splash-loader"></div><div class="jp-splash-loading">Loading...</div>
  </div><div class="jp-splash-footer">${esc(company)}&nbsp; | &nbsp;${esc(x.announcement||'COLOURS THAT BUILD A BRIGHTER TOMORROW')}</div>`;
  s.classList.remove('hide');
}
function hideSplash(){const s=document.getElementById('splash');if(!s)return;setTimeout(()=>s.classList.add('hide'),250)}

function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function jpIcon(name, cls="") {
  const paths={
    home:'<path d="M3 11.5 12 4l9 7.5v8a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 19.5z"/><path d="M9 21v-6h6v6"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    user:'<circle cx="12" cy="8" r="3.5"/><path d="M5 21c.7-4 3-6 7-6s6.3 2 7 6"/>',
    scan:'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M8 8h8v8H8z"/>',
    gift:'<path d="M3 10h18v10H3z"/><path d="M12 10v10M2 10h20v-3H2z"/><path d="M12 7H8.5A2.5 2.5 0 1 1 11 4.5C11 6 12 7 12 7ZM12 7h3.5A2.5 2.5 0 1 0 13 4.5C13 6 12 7 12 7Z"/>',
    history:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2M3.5 8.5 5 6.5l2 1"/>',
    wallet:'<path d="M3 6.5A2.5 2.5 0 0 1 5.5 4H19a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5.5A2.5 2.5 0 0 1 3 17.5z"/><path d="M3 7h15a3 3 0 0 1 3 3v2h-5a2 2 0 0 1 0-4h5"/>',
    points:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/>',
    close:'<path d="m5 5 14 14M19 5 5 19"/>',
    back:'<path d="m15 18-6-6 6-6"/>',
    logout:'<path d="M10 5H5v14h5M14 8l4 4-4 4M18 12H9"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.4v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.7-1.7.1-.1A1.7 1.7 0 0 0 8.4 15a1.7 1.7 0 0 0-1.5-1H6.7v-2.4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L8 8.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h2.4v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.5 1z"/>',
    camera:'<path d="M4 7h3l1.5-2h7L17 7h3v12H4z"/><circle cx="12" cy="13" r="3.5"/>',
    support:'<path d="M4 13a8 8 0 0 1 16 0v3a2 2 0 0 1-2 2h-2v-6h4M4 12h4v6H6a2 2 0 0 1-2-2z"/><path d="M12 21h3"/>',
    chart:'<path d="M5 20V10M12 20V5M19 20v-8"/>',
    bank:'<path d="M3 9h18L12 4zM5 10v7M9 10v7M15 10v7M19 10v7M3 19h18"/>',
    lock:'<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  };
  return `<svg class="jp-icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${paths[name]||paths.user}</svg>`;
}
function getProfilePhoto(){return localStorage.getItem('jp_profile_photo')||''}
function profileAvatar(size='md'){const p=getProfilePhoto();return p?`<img class="jp-avatar-img ${size}" src="${esc(p)}" alt="Profile">`:`<span class="jp-avatar-fallback ${size}">${jpIcon('user')}</span>`}
function openMenu(){document.getElementById('jpMenuDrawer')?.classList.add('open');document.getElementById('jpMenuBackdrop')?.classList.add('open')}
function closeMenu(){document.getElementById('jpMenuDrawer')?.classList.remove('open');document.getElementById('jpMenuBackdrop')?.classList.remove('open')}
function handleProfilePhoto(input){const f=input?.files?.[0];if(!f)return;if(!f.type.startsWith('image/'))return alert('Please select an image file.');if(f.size>2*1024*1024)return alert('Profile photo must be under 2 MB.');const r=new FileReader();r.onload=()=>{localStorage.setItem('jp_profile_photo',r.result);closeMenu();render(state.screen||'profile')};r.readAsDataURL(f)}
function removeProfilePhoto(){localStorage.removeItem('jp_profile_photo');closeMenu();render('profile')}
function api(path,opts={}){let url=(C.API_BASE_URL||"").replace(/\/$/,"")+path;let h={"Content-Type":"application/json",...(opts.headers||{})};if(state.token)h.Authorization="Bearer "+state.token;return fetch(url,{...opts,headers:h}).then(async r=>{const text=await r.text();let d={};try{d=text?JSON.parse(text):{}}catch{d={message:text||"Request failed"}}if(!r.ok){let e=new Error(d.message||"Request failed");Object.assign(e,d);throw e}return d})}
function redeemApi(body){
  const url="/mobile/redeem-api.php";
  const h={"Content-Type":"application/json","Accept":"application/json"};
  if(state.token)h.Authorization="Bearer "+state.token;
  return fetch(url,{method:"POST",cache:"no-store",headers:h,body:JSON.stringify(body)}).then(async r=>{
    const text=await r.text(); let d={};
    try{d=text?JSON.parse(text):{}}catch{d={message:text||"Request failed"}}
    if(!r.ok){let e=new Error(d.message||"Request failed");Object.assign(e,d);throw e}
    return d;
  });
}
function dataApi(path,opts={}){
  let base=(C.DATA_API_BASE_URL||"/mobile/mobile-api.php").replace(/\/$/,"");
  let url=base+path;
  let h={"Content-Type":"application/json","Accept":"application/json",...(opts.headers||{})};
  if(state.token)h.Authorization="Bearer "+state.token;
  return fetch(url,{...opts,cache:"no-store",headers:h}).then(async r=>{
    const text=await r.text(); let d={};
    try{d=text?JSON.parse(text):{}}catch{d={message:text||"Invalid API response"}}
    if(!r.ok){let e=new Error(d.message||("HTTP "+r.status));e.status=r.status;Object.assign(e,d);throw e}
    return d;
  })
}
function roleCanRedeem(){
  return (state.role==="painter"||state.role==="helper") &&
    (Object.keys(state.permissions||{}).length===0 ||
     can("redeem") || can("coupon_redeem") || can("qr_redeem"));
}
function welcomeView(){
  const b=applyBranding(state.branding||{});
  const company=b.company_name||"Japnish Paints";
  A.innerHTML=`<div class="app welcome-app">
    <div class="welcome-page-shell">
      <section class="welcome-hero welcome-hero-login-inside">
        <div class="welcome-brand"><img src="${esc((state.branding||{}).dashboard_logo_url||(state.branding||{}).app_logo_url||"japnish-logo.png")}" alt="${esc(company)}"></div>
        <div class="welcome-tagline">${esc(b.brand_tagline||b.welcome_text||"COLOURS THAT BUILD A BRIGHTER TOMORROW")}</div>
        <div class="welcome-main-slider login-admin-slider login-main-slider" id="welcomeSlider">
          <div class="login-slide-track" id="welcomeSlideTrack"><div class="login-slide-loading">Loading brand highlights…</div></div>
          <button type="button" onclick="welcomeSliderPrev()" aria-label="Previous">‹</button>
          <button type="button" onclick="welcomeSliderNext()" aria-label="Next">›</button>
          <div class="login-slide-dots" id="welcomeSlideDots"></div>
        </div>
        <div class="welcome-benefits">
          <div><i>🎁</i><b>Earn<br>Points</b></div>
          <div><i>★</i><b>Get<br>Rewards</b></div>
          <div><i>👥</i><b>Grow<br>Together</b></div>
        </div>
        <div class="welcome-login-inside" id="welcomeLoginBox">
          <div class="welcome-login-title"><span>👤</span><b>Login to Continue</b></div>
          <div class="welcome-role-pills">
            <button type="button" id="welcomeDistributorBtn" class="selected" onclick="welcomeSelectLoginType('distributor')">🚚 Distributor</button>
            <button type="button" id="welcomePartnerBtn" onclick="welcomeSelectLoginType('partner')">🤝 Partner</button>
          </div>
          <div class="welcome-login-fields">
            <input id="welcomeEmail" type="email" placeholder="Email">
            <input id="welcomePassword" type="password" placeholder="Password">
            <button type="button" class="welcome-login-submit" onclick="welcomeDoLogin()">Login →</button>
          </div>
          <div class="welcome-login-options">
            <button type="button" onclick="welcomeForgotPassword()">Forgot Password?</button>
          </div>
        </div>
        <div class="welcome-hint">${esc(b.announcement||("Welcome to "+company))}</div>
        <div class="welcome-progress"><span></span></div>
      </section>
      <footer class="welcome-footer">${esc(company)}&nbsp; | &nbsp;FOR A COLORFUL TOMORROW</footer>
    </div>
  </div>`;
  state.welcomeLoginType='distributor';
  loadWelcomeSliders();
}
function welcomeSelectLoginType(t){
  state.welcomeLoginType=t;
  document.getElementById('welcomeEmail')?.focus();
  document.getElementById('welcomeDistributorBtn')?.classList.toggle('selected',t==='distributor');
  document.getElementById('welcomePartnerBtn')?.classList.toggle('selected',t==='partner');
}
async function welcomeForgotPassword(){
  const type=state.welcomeLoginType||'distributor';
  const url=type==='distributor'
    ? 'https://japnishpaints.store/distributor/forgot-password.php'
    : 'https://japnishpaints.store/partner/forgot-password.php';
  try{
    const a=document.createElement('a');
    a.href=url; a.target='_blank'; a.rel='noopener noreferrer';
    document.body.appendChild(a); a.click(); a.remove();
  }catch(e){ location.href=url; }
}
async function welcomeDoLogin(){
  const email=document.getElementById('welcomeEmail')?.value.trim()||'';
  const password=document.getElementById('welcomePassword')?.value||'';
  const loginType=state.welcomeLoginType||'distributor';
  if(!email||!password)return alert('Email and password required.');
  try{
    const d=await api(C.ENDPOINTS.login,{method:'POST',body:JSON.stringify({email,password,account_type:loginType,login_type:loginType})});
    state.token=d.token||''; state.user=d.user||null;
    localStorage.setItem('jp_token',state.token);
    let p=await api(C.ENDPOINTS.permissions); state.permissions=p.functions||{};
    let detected=String((p.user&&p.user.role)||d.role||'').toLowerCase();
    state.role=detected; localStorage.setItem('jp_role',detected);
    await render('home');
  }catch(e){
    const box=document.getElementById('welcomeLoginBox');
    if(box){let n=box.querySelector('.welcome-login-error');if(!n){n=document.createElement('div');n.className='welcome-login-error';box.prepend(n)}n.textContent=e?.message||'Login failed';}
  }
}
let welcomeSlides=[],welcomeSlideIndex=0,welcomeSlideTimer=null;

async function loadWelcomeSliders(){try{const d=await dataApi('?action=public_sliders');welcomeSlides=(d.slides||[]).map(x=>({...x,image_url:x.id?('/mobile/slider-image.php?id='+encodeURIComponent(x.id)):x.image_url}))}catch(e){welcomeSlides=[]}const track=document.getElementById('welcomeSlideTrack'),dots=document.getElementById('welcomeSlideDots');if(!track)return;if(!welcomeSlides.length){track.innerHTML='<div class="login-slide-fallback-art"><b>Japnish Paints</b><span>Colours That Build A Brighter Tomorrow</span></div>';return;}track.innerHTML=welcomeSlides.map((x,i)=>`<div class="login-slide"><img src="${esc(x.image_url)}" alt="Japnish Paints highlight" ${i?'loading="lazy"':''}></div>`).join('');if(dots)dots.innerHTML=welcomeSlides.map((_,i)=>`<i class="${i===0?'on':''}"></i>`).join('');welcomeSlideIndex=0;welcomeSliderApply();clearInterval(welcomeSlideTimer);if(welcomeSlides.length>1)welcomeSlideTimer=setInterval(welcomeSliderNext,5000);}
function welcomeSliderApply(){const t=document.getElementById('welcomeSlideTrack');if(!t)return;t.style.transform=`translateX(${-welcomeSlideIndex*100}%)`;document.querySelectorAll('#welcomeSlideDots i').forEach((d,i)=>d.classList.toggle('on',i===welcomeSlideIndex))}
function welcomeSliderNext(){if(!welcomeSlides.length)return;welcomeSlideIndex=(welcomeSlideIndex+1)%welcomeSlides.length;welcomeSliderApply()}
function welcomeSliderPrev(){if(!welcomeSlides.length)return;welcomeSlideIndex=(welcomeSlideIndex-1+welcomeSlides.length)%welcomeSlides.length;welcomeSliderApply()}

function loginView(msg=""){
  const b=applyBranding(state.branding||{});
  const company=b.company_name||'Japnish Paints';
  A.innerHTML=`<div class="app login-app">
    <div class="login-page-shell">
      <section class="login-hero">
        <div class="login-brand-row">
          <div class="login-logo-box login-logo-single"><img src="${esc((state.branding||{}).login_logo_url||(state.branding||{}).app_logo_url||"japnish-logo.png")}" alt="${esc((state.branding||{}).company_name||"Japnish Paints")}"></div>
          <div class="login-tagline-only">${esc(b.brand_tagline||"COLOURS THAT BUILD A BRIGHTER TOMORROW")}</div>
        </div>
        <div class="login-admin-slider login-main-slider" id="loginAdminSlider">
          <div class="login-slide-track" id="loginSlideTrack"><div class="login-slide-loading">Loading brand highlights…</div></div>
          <button type="button" onclick="loginSliderPrev()" aria-label="Previous">‹</button><button type="button" onclick="loginSliderNext()" aria-label="Next">›</button>
          <div class="login-slide-dots" id="loginSlideDots"></div>
        </div>
        <div class="login-benefits login-benefits-main">
          <div><i>🎁</i><b>Earn<br>Points</b></div>
          <div><i>★</i><b>Get<br>Rewards</b></div>
          <div><i>👥</i><b>Grow<br>Together</b></div>
        </div>
        ${b.announcement?`<div class="announcement-bar">${esc(b.announcement)}</div>`:''}
      </section>
      <main class="login-card">
        <div class="login-card-title"><span>👤</span><div><h2>Login to Continue</h2><p>${esc(b.welcome_text||("Access your account with "+company))}</p></div></div>
        <div id="loginBox">${msg?`<div class="notice err">${esc(msg)}</div>`:""}<div class="muted login-select-note">Select your role above.</div></div>
        <div class="login-trust"><span>✓ Trusted Quality</span><span>◒ Safe & Eco Friendly</span><span>♧ Stronger Communities</span></div>
      </main>
      <footer class="login-footer">MADE IN INDIA &nbsp; | &nbsp; FOR A BRIGHTER TOMORROW</footer>
    </div>
  </div>`;
  loadLoginSliders();
  setTimeout(function(){ if(document.getElementById("loginBox")) showLogin(); }, 0);
}
function showLogin(){
  state.role="";
  const box=document.getElementById("loginBox"); if(!box)return;
  box.innerHTML=`<div class="login-role-label">SELECT ACCOUNT TYPE</div>
    <div class="role-pills"><button class="selected" id="distributorBtn" type="button" onclick="selectLoginType('distributor')">🚚 Distributor</button><button type="button" id="partnerBtn" onclick="selectLoginType('partner')">🤝 Partner</button></div>
    <label class="login-field"><span>✉</span><input id="email" class="input" placeholder="Enter your email"></label>
    <label class="login-field"><span>🔒</span><input id="password" class="input" type="password" placeholder="Enter your password"><button type="button" class="eye" onclick="toggleLoginPassword()">◉</button></label>
    <input type="hidden" id="loginType" value="distributor">
    <div class="login-options"><button type="button" onclick="forgotPassword()">Forgot Password?</button></div>
    <button class="btn login-main-btn" onclick="doLogin()">Login <b>→</b></button>`;
}
function selectLoginType(t){
 document.getElementById("loginType").value=t;
 document.getElementById("partnerBtn")?.classList.toggle("selected",t==="partner");
 document.getElementById("distributorBtn")?.classList.toggle("selected",t==="distributor");
}

function toggleLoginPassword(){const x=document.getElementById('password');if(x)x.type=x.type==='password'?'text':'password'}
function forgotPassword(){
  const type = document.getElementById("loginType")?.value || "distributor";

  const url = type === "distributor"
    ? "https://japnishpaints.store/distributor/forgot-password.php"
    : "https://japnishpaints.store/partner/forgot-password.php";

  try{
    const a=document.createElement('a');
    a.href=url;
    a.target='_blank';
    a.rel='noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }catch(e){
    location.href=url;
  }
}
function loginQrNotice(){alert('QR Login is not enabled for this account yet.')}
function registerNotice(){alert('Please contact your Admin to create your account.')}
let loginSlides=[],loginSlideIndex=0,loginSlideTimer=null;
async function loadLoginSliders(){
  try{const d=await dataApi('?action=public_sliders');loginSlides=(d.slides||[]).map(x=>({...x,image_url:x.id?('/mobile/slider-image.php?id='+encodeURIComponent(x.id)):x.image_url}));}catch(e){loginSlides=[]}
  const track=document.getElementById('loginSlideTrack'),dots=document.getElementById('loginSlideDots');
  if(!track)return;
  if(!loginSlides.length){track.innerHTML='<div class="login-slide-fallback-art"><b>Japnish Paints</b><span>Colours That Build A Brighter Tomorrow</span></div>';return;}
  track.innerHTML=loginSlides.map((s,i)=>`<div class="login-slide"><img src="${esc(s.image_url)}" alt="Japnish Paints highlight" ${i?'loading="lazy"':''}></div>`).join('');
  dots.innerHTML=loginSlides.map((_,i)=>`<i class="${i===0?'on':''}"></i>`).join('');
  loginSlideIndex=0; loginSliderApply(); clearInterval(loginSlideTimer);
  if(loginSlides.length>1)loginSlideTimer=setInterval(loginSliderNext,5000);
}
function loginSliderApply(){const t=document.getElementById('loginSlideTrack');if(!t)return;t.style.transform=`translateX(${-loginSlideIndex*100}%)`;document.querySelectorAll('#loginSlideDots i').forEach((d,i)=>d.classList.toggle('on',i===loginSlideIndex))}
function loginSliderNext(){if(!loginSlides.length)return;loginSlideIndex=(loginSlideIndex+1)%loginSlides.length;loginSliderApply()}
function loginSliderPrev(){if(!loginSlides.length)return;loginSlideIndex=(loginSlideIndex-1+loginSlides.length)%loginSlides.length;loginSliderApply()}
async function doLogin(){try{
let email=document.getElementById("email").value.trim(),password=document.getElementById("password").value,loginType=document.getElementById("loginType").value;
if(!email||!password)return alert("Email and password required.");
let d=await api(C.ENDPOINTS.login,{method:"POST",body:JSON.stringify({email,password,account_type:loginType,login_type:loginType})});
state.token=d.token||""; state.user=d.user||null;
localStorage.setItem("jp_token",state.token);
let p=await api(C.ENDPOINTS.permissions); state.permissions=p.functions||{};
let detected=String((p.user&&p.user.role)||d.role||"").toLowerCase();
state.role=detected; localStorage.setItem("jp_role",detected); render("home");
}catch(e){
  const box=document.getElementById("loginBox");
  if(box){let n=box.querySelector(".notice.err");if(!n){n=document.createElement("div");n.className="notice err";box.prepend(n)}n.textContent=e?.message||"Login failed";}
}}

function header(){
  const role=names[state.role]||"Partner";
  const b=state.branding||{};
  const logo=b.login_logo_url||b.app_logo_url||"japnish-logo.png";
  const company=b.company_name||"Japnish Paints";
  return `<header class="topbar jp-flat-header">
    <div class="brand-wrap">
      <button class="jp-menu-btn" onclick="openMenu()" aria-label="Menu">${jpIcon('menu')}</button>
      <div class="brand-logo-shell brand-logo-single"><img class="brand-logo" src="${esc(logo)}" alt="${esc(company)}"></div>
    </div>
    <div class="header-actions"><button class="icon-btn jp-flat-icon" onclick="notifications()" aria-label="Notifications">${jpIcon('bell')}<i></i></button><button class="avatar jp-avatar-button" onclick="render('profile')" aria-label="Profile">${profileAvatar('sm')}</button></div>
  </header>`;
}
function nav(){
  const scanOrPoints=roleCanRedeem()
    ? `<button class="home-scan-nav" onclick="render('redeem')">${jpIcon('scan')}<span>Scan</span></button>`
    : `<button onclick="pointHistory()">${jpIcon('points')}<span>Points</span></button>`;
  return `<nav class="modern-nav home-modern-nav app-universal-nav">
    <button class="${state.screen==="home"?"active":""}" onclick="render('home')">${jpIcon('home')}<span>Home</span></button>
    ${scanOrPoints}
    <button onclick="giftNetwork()">${jpIcon('gift')}<span>Gifts</span></button>
    <button class="${state.screen==="history"?"active":""}" onclick="render('history')">${jpIcon('history')}<span>History</span></button>
    <button class="${state.screen==="profile"?"active":""}" onclick="render('profile')">${jpIcon('user')}<span>Profile</span></button>
  </nav>`;
}
function homeNav(){
  return `<nav class="modern-nav home-modern-nav app-universal-nav">
    <button class="active" onclick="render('home')">${jpIcon('home')}<span>Home</span></button>
    ${roleCanRedeem()?`<button class="home-scan-nav" onclick="render('redeem')">${jpIcon('scan')}<span>Scan</span></button>`:`<button onclick="pointHistory()">${jpIcon('points')}<span>Points</span></button>`}
    <button onclick="giftNetwork()">${jpIcon('gift')}<span>Gifts</span></button>
    <button onclick="render('history')">${jpIcon('history')}<span>History</span></button>
    <button onclick="render('profile')">${jpIcon('user')}<span>Profile</span></button>
  </nav>`;
}
function menuDrawer(){
  const role=names[state.role]||'Partner';
  const p=getProfilePhoto();
  return `<div id="jpMenuBackdrop" class="jp-menu-backdrop" onclick="closeMenu()"></div><aside id="jpMenuDrawer" class="jp-menu-drawer" aria-label="App menu">
    <div class="jp-menu-top"><div class="jp-menu-brand"><img src="${esc((state.branding||{}).dashboard_logo_url||(state.branding||{}).app_logo_url||"japnish-logo.png")}" alt="${esc((state.branding||{}).company_name||"Japnish Paints")}"></div><button onclick="closeMenu()" aria-label="Close">${jpIcon('close')}</button></div>
    <div class="jp-menu-profile">${profileAvatar('lg')}<div><b>${esc(state.user?.username||state.user?.name||role)}</b><small>${esc(role)} <span>• Active</span></small></div><button onclick="render('profile');closeMenu()">›</button></div>
    <label class="jp-photo-add">${jpIcon('camera')}<span>${p?'Change Profile Photo':'Add Profile Photo'}</span><input type="file" accept="image/*" onchange="handleProfilePhoto(this)"></label>
    ${p?`<button class="jp-photo-remove" onclick="removeProfilePhoto()">Remove Profile Photo</button>`:''}
    <div class="jp-menu-list">
      <button onclick="render('home');closeMenu()">${jpIcon('home')}<span>Home</span></button>
      <button onclick="render('profile');closeMenu()">${jpIcon('user')}<span>My Profile</span></button>
      <button onclick="giftNetwork();closeMenu()">${jpIcon('gift')}<span>My Gifts</span></button>
      ${roleCanRedeem()?`<button onclick="render('redeem');closeMenu()">${jpIcon('scan')}<span>Scan QR</span></button>`:''}
      <button onclick="giftReport();closeMenu()">${jpIcon('chart')}<span>My Progress</span></button>
      <button onclick="historyView('all');closeMenu()">${jpIcon('history')}<span>History</span></button>
      <button onclick="notifications();closeMenu()">${jpIcon('bell')}<span>Notifications</span><em id="jpMenuNoticeBadge"></em></button>
      <button onclick="supportView();closeMenu()">${jpIcon('support')}<span>Support</span></button>
      <button onclick="passwordView();closeMenu()">${jpIcon('lock')}<span>Change Password</span></button>
      <button onclick="bankView();closeMenu()">${jpIcon('bank')}<span>Bank Details</span></button>
      <button class="jp-menu-logout" onclick="logout()">${jpIcon('logout')}<span>Logout</span></button>
    </div>
    <div class="jp-menu-footer">${jpIcon('points')} ${esc((state.branding||{}).company_name||"JAPNISH™ PAINTS")}<br><small>${esc((state.branding||{}).welcome_text||"COLOURS THAT BUILD A BRIGHTER TOMORROW")}</small></div>
  </aside>`;
}
async function render(s){
  state.screen=s;
  const shellClass=s==="home"?"app home-app":"app";
  const head=s==="home"?"":header();
  const bottom=s==="home"?homeNav():nav();
  A.innerHTML=`<div class="${shellClass}">${head}<main class="content"><div class="card"><div class="muted">Loading…</div></div></main>${bottom}${menuDrawer()}</div>`;
  try{
    if(s==="home")return await home();
    if(s==="wallet")return await wallet();
    if(s==="history")return await history();
    if(s==="profile")return await profile();
    if(s==="redeem")return redeem();
  }catch(e){
    document.querySelector(".content").innerHTML=`<div class="card"><div class="label">ERROR</div><div class="notice err">${esc(e?.message||"Page could not be loaded.")}</div><button class="btn" onclick="render('${esc(s)}')">Retry</button></div>`;
  }
}
function metric(label,value,sub,icon,cls=""){
  return `<div class="metric ${cls}"><div class="metric-icon">${icon}</div><div><span>${esc(label)}</span><strong>${esc(value)}</strong>${sub?`<small>${esc(sub)}</small>`:""}</div></div>`;
}
async function home(){
  let d={};try{d=await api(C.ENDPOINTS.dashboard)}catch(e){d={message:e.message}};
  let x=d.data||d, u=x.user||{};
  let wallet=u.wallet??x.wallet??x.balance??"—", points=u.points??x.points??x.gift_points??null;
  if(points===null){try{let gp=await dataApi('?action=point_history');points=gp.live_points??0}catch(e){points=0}}
  let username=u.username||u.name||state.user?.username||state.user?.name||"Partner", role=names[state.role]||"Partner";
  const redeem=roleCanRedeem();
  let rewards=Array.isArray(x.gift_rewards)?x.gift_rewards:[];
  // Dashboard fallback: use the same live Gift Network source so Next Reward never becomes a fake 0 target.
  if(!rewards.length){try{const gn=await dataApi('?action=gift_network');rewards=Array.isArray(gn.rewards)?gn.rewards:[]}catch(e){rewards=[]}}
  let next=rewards.find(r=>Number(r.target||r.target_quantity||0)>Number(points||0))||rewards[0]||null;
  let target=Number(next?.target||next?.target_quantity||0), achieved=Math.min(Number(points||0),target||Number(points||0)), remaining=Math.max(0,target-achieved);
  let rewardName=next?.gift_name||"Reward unavailable";
  let rewardImg=next?.gift_image_url||next?.gift_image||"";
  if(rewardImg && /^\/mobile\/gift-image\.php\?reward_id=/.test(String(rewardImg))){rewardImg += '&v=40'}
  let rewardDeadline=next?.deadline||next?.deadline_at||"";
  let rewardTime=rewardDeadline?formatRemaining(rewardDeadline):"";
  window.__jpDashboardPoints=Number(points||0);
  rewardSliderItems=rewards;
  rewardSliderIndex=Math.max(0,rewards.indexOf(next));
  const action=(icon,label,sub,fn,cl='')=>`<button class="paint-action ${cl}" onclick="${fn}"><span class="paint-icon">${icon}</span><b>${label}</b>${sub?`<small>${sub}</small>`:''}</button>`;
  let slides=[];try{const sd=await dataApi('?action=public_sliders');slides=(sd.slides||[]).map(sl=>({...sl,image_url:sl.id?('/mobile/slider-image.php?id='+encodeURIComponent(sl.id)):sl.image_url}));}catch(e){}
  if(!slides.length)slides=[];
  document.querySelector('.content').innerHTML=`
    <section class="intl-home-head jp-home-flat-head">
      <div class="home-head-left"><button class="home-menu jp-menu-btn" onclick="openMenu()" aria-label="Menu">${jpIcon('menu')}</button><div class="home-logo home-logo-single" aria-label="Japnish Paints"><img src="japnish-dashboard-logo.png" alt="Japnish Paints"></div></div>
      <div class="home-head-right"><button class="home-bell jp-flat-icon" onclick="notifications()" aria-label="Notifications">${jpIcon('bell')}<i></i></button><button class="home-user jp-avatar-button" onclick="render('profile')" aria-label="Profile">${profileAvatar('sm')}</button><span>Hello,<br><b>${esc(role)}</b></span><button class="home-down" onclick="openMenu()" aria-label="Open menu">⌄</button></div>
    </section>
    <section class="home-admin-slider home-admin-slider-top" id="homeAdminSlider"><div class="home-slider-track">${slides.map((s,i)=>`<div class="home-slide"><img src="${esc(s.image_url)}" data-candidates='${esc(JSON.stringify(s.image_candidates||[]))}' data-idx="0" alt="Japnish Paints promotional banner" loading="${i?'lazy':'eager'}" onerror="const a=JSON.parse(this.dataset.candidates||'[]');let n=Number(this.dataset.idx||0)+1;this.dataset.idx=n;if(n<a.length)this.src=a[n];else{this.style.display='none';this.parentElement.classList.add('slider-image-missing')}"></div>`).join('')}</div><button class="hs-prev" onclick="homeSliderPrev()" aria-label="Previous banner">‹</button><button class="hs-next" onclick="homeSliderNext()" aria-label="Next banner">›</button></section>
    <section class="next-reward-card" id="nextRewardCard">
      <div class="next-copy"><div class="next-label">🎁 &nbsp; Next Reward</div><h2 id="nextRewardName">${esc(rewardName)}</h2><p id="nextRewardDescription">Gift at ${esc(target||0)} POINTS cumulative qualifying points.</p>
        <div class="progress"><i id="nextRewardProgress" style="width:${target?Math.min(100,(achieved/target)*100):0}%"></i></div>
        <div class="target-line">Target <b id="nextRewardTarget">${esc(target)}</b> POINTS &nbsp; • &nbsp; Achieved <b id="nextRewardAchieved">${esc(achieved)}</b> POINTS</div>
        <div class="remaining-line"><span id="nextRewardRemaining">🎯 ${esc(remaining)} POINTS remaining</span><span id="nextRewardTime">⌛ ${esc(rewardTime||'—')}</span></div>
      </div>
      <button type="button" class="reward-slider-arrow reward-slider-prev" onclick="rewardSliderPrev()" aria-label="Previous reward">‹</button>
      <div class="next-reward-image" id="nextRewardImage">${rewardImg?`<img src="${esc(rewardImg)}" alt="${esc(rewardName)}" onerror="this.style.display='none';this.parentElement.classList.add('image-missing')">`:'🎁'}<small id="nextRewardLevel">LEVEL ${esc(next?.level_no||1)}</small></div>
      <button type="button" class="reward-slider-arrow reward-slider-next" onclick="rewardSliderNext()" aria-label="Next reward">›</button>
    </section>
    <section class="home-welcome-card">
      <div><span class="home-welcome-kicker">Welcome back</span><h2>Hello ${esc(role)}</h2><p>Let’s paint a brighter tomorrow together.</p></div>
      <span class="home-active-pill">✓ Active ${esc(role)}</span>
    </section>
    <section class="home-wallet-row">
      <button class="wallet-balance-card" onclick="render('wallet')">
        <span class="home-3d-icon wallet">₹</span>
        <div><small>Wallet Balance</small><b>₹${esc(Number(wallet||0).toFixed(2))}</b></div><strong>›</strong>
      </button>
      <button class="gift-points-card" onclick="pointHistory()">
        <span class="home-3d-icon star">★</span>
        <div><small>Gift Points</small><b>${esc(points)}</b><em>POINTS</em></div><strong>›</strong>
      </button>
    </section>
    <section class="home-points-row home-quick-row">
      <button onclick="giftNetwork()"><span class="home-3d-icon gift">🎁</span><small>My Gifts</small></button>
      ${redeem?`<button onclick="render('redeem')"><span class="home-3d-icon qr">▦</span><small>Scan QR</small></button>`:`<button onclick="giftNetwork()"><span class="home-3d-icon qr">▦</span><small>Rewards</small></button>`}
      <button onclick="giftReport()"><span class="home-3d-icon progress">▥</span><small>My Progress</small></button>
      <button onclick="giftNetwork()"><span class="home-3d-icon people">👥</span><small>Refer Helper</small></button>
    </section>
    <section class="dashboard-all-functions">
      <div class="dashboard-functions-title"><span>ALL SERVICES</span><h2>Everything in One Place</h2></div>
      <div class="paint-action-grid dashboard-function-grid">
        ${action('👤','Profile','Account details',"render('profile')")}
        ${action('⬇️','Withdraw','Request payment',"render('wallet')")}
        ${redeem?action('▦','Scan QR','Scan & redeem',"render('redeem')",'scan-action'):''}
        ${redeem?action('🎁','Redeem','Coupon reward',"render('redeem')",'redeem-action'):''}
        ${action('🏦','Add Bank','Bank details',"bankView()")}
        ${action('🔒','Change Password','Security',"passwordView()")}
        ${action('📚','Transaction History','Wallet activity',"historyView('transactions')")}
        ${redeem?action('🧾','Redeem History','All redeemed',"historyView('redeems')"):''}
        ${action('📊','My Gift Report','Gift points',"giftReport()")}
        ${action('🪙','POINT History','Live points',"pointHistory()")}
        ${action('🔔','Notifications','Admin updates',"notifications()")}
        ${action('🏆','LeaderBoard','Top performers',"giftReport()")}
        ${action('%','Offers','Special rewards',"giftNetwork()")}
        ${action('▤','Products','Explore range',"productsView()")}
        ${action('♧','Support','Get help',"supportView()")}
      </div>
    </section>
    <section class="home-paint-banner"><div><h2>${esc((state.branding||{}).company_name||"Japnish Paints")}</h2><p>${esc((state.branding||{}).welcome_text||"Paint a Better Tomorrow")}</p></div><button onclick="productsView()">Our Products →</button></section>
`;
  initHomeSlider(slides.length);
  initRewardSlider(rewards,rewardSliderIndex);
}
let rewardSliderIndex=0;
let rewardSliderItems=[];
let rewardSliderTimer=null;
function initRewardSlider(items,index){
  rewardSliderItems=Array.isArray(items)?items:[];
  rewardSliderIndex=Math.max(0,Math.min(Number(index)||0,rewardSliderItems.length-1));
  clearInterval(rewardSliderTimer);
  updateRewardSlider();
  if(rewardSliderItems.length>1){
    rewardSliderTimer=setInterval(rewardSliderNext,5000);
  }
}
function rewardSliderNext(){
  if(!rewardSliderItems.length)return;
  rewardSliderIndex=(rewardSliderIndex+1)%rewardSliderItems.length;
  updateRewardSlider();
  resetRewardSliderTimer();
}
function rewardSliderPrev(){
  if(!rewardSliderItems.length)return;
  rewardSliderIndex=(rewardSliderIndex-1+rewardSliderItems.length)%rewardSliderItems.length;
  updateRewardSlider();
  resetRewardSliderTimer();
}
function resetRewardSliderTimer(){
  clearInterval(rewardSliderTimer);
  if(rewardSliderItems.length>1)rewardSliderTimer=setInterval(rewardSliderNext,5000);
}
function updateRewardSlider(){
  const r=rewardSliderItems[rewardSliderIndex];
  if(!r)return;
  const pts=Number(window.__jpDashboardPoints||0);
  const target=Number(r.target||r.target_quantity||0);
  const achieved=Math.min(pts,target||pts);
  const remaining=Math.max(0,target-achieved);
  const name=r.gift_name||'Reward unavailable';
  const img=r.gift_image_url||r.gift_image||'';
  const deadline=r.deadline||r.deadline_at||'';
  const imgEl=document.getElementById('nextRewardImage');
  const nameEl=document.getElementById('nextRewardName');
  const descEl=document.getElementById('nextRewardDescription');
  const progEl=document.getElementById('nextRewardProgress');
  const targetEl=document.getElementById('nextRewardTarget');
  const achievedEl=document.getElementById('nextRewardAchieved');
  const remainingEl=document.getElementById('nextRewardRemaining');
  const timeEl=document.getElementById('nextRewardTime');
  const levelEl=document.getElementById('nextRewardLevel');
  if(nameEl)nameEl.textContent=name;
  if(descEl)descEl.textContent=`Gift at ${target||0} POINTS cumulative qualifying points.`;
  if(progEl)progEl.style.width=(target?Math.min(100,(achieved/target)*100):0)+'%';
  if(targetEl)targetEl.textContent=target;
  if(achievedEl)achievedEl.textContent=achieved;
  if(remainingEl)remainingEl.textContent=`🎯 ${remaining} POINTS remaining`;
  if(timeEl)timeEl.textContent=`⌛ ${formatRemaining(deadline)||'—'}`;
  if(levelEl)levelEl.textContent=`LEVEL ${r.level_no||1}`;
  if(imgEl){
    imgEl.classList.remove('image-missing');
    if(img){
      imgEl.innerHTML=`<img src="${esc(img)}" alt="${esc(name)}" onerror="this.style.display='none';this.parentElement.classList.add('image-missing')"><small id="nextRewardLevel">LEVEL ${esc(r.level_no||1)}</small>`;
    }else{
      imgEl.innerHTML=`🎁<small id="nextRewardLevel">LEVEL ${esc(r.level_no||1)}</small>`;
    }
  }
}
function formatRemaining(deadline){const ms=new Date(deadline).getTime()-Date.now();if(!isFinite(ms)||ms<=0)return"Expired";let h=Math.floor(ms/3600000),d=Math.floor(h/24);h%=24;return `${d}d ${h}h remaining`}
let homeSliderIndex=0,homeSliderTimer=null;
function initHomeSlider(n){homeSliderIndex=0;clearInterval(homeSliderTimer);const t=document.querySelector('#homeAdminSlider .home-slider-track');if(!t)return;t.style.transform='translateX(0)';if(n>1)homeSliderTimer=setInterval(homeSliderNext,5000)}
function homeSliderNext(){const t=document.querySelector('#homeAdminSlider .home-slider-track');const n=t?.children.length||0;if(!n)return;homeSliderIndex=(homeSliderIndex+1)%n;t.style.transform=`translateX(${-homeSliderIndex*100}%)`}
function homeSliderPrev(){const t=document.querySelector('#homeAdminSlider .home-slider-track');const n=t?.children.length||0;if(!n)return;homeSliderIndex=(homeSliderIndex-1+n)%n;t.style.transform=`translateX(${-homeSliderIndex*100}%)`}
let jpIndex=0,jpTimer=null,jpTouchX=0;
function jpApply(){
  const el=document.getElementById("jpSlides"), dots=document.querySelectorAll("#jpDots i");
  if(!el)return;
  el.style.transform=`translate3d(${-jpIndex*100}%,0,0)`;
  dots.forEach((d,i)=>d.classList.toggle("on",i===jpIndex));
}
function jpSlideNext(){const count=document.querySelectorAll("#jpSlides .jp-slide").length||1;jpIndex=(jpIndex+1)%count;jpApply();jpAuto();}
function jpSlidePrev(){const count=document.querySelectorAll("#jpSlides .jp-slide").length||1;jpIndex=(jpIndex-1+count)%count;jpApply();jpAuto();}
function jpAuto(){clearInterval(jpTimer);jpTimer=setInterval(jpSlideNext,4800);}
function jpInitSlider(){
  clearInterval(jpTimer);jpIndex=0;jpApply();jpAuto();
  const el=document.getElementById("jpSlides");
  if(!el||el.dataset.bound)return;
  el.dataset.bound="1";
  el.addEventListener("touchstart",e=>{jpTouchX=e.touches[0].clientX},{passive:true});
  el.addEventListener("touchend",e=>{let dx=e.changedTouches[0].clientX-jpTouchX;if(Math.abs(dx)>45){dx<0?jpSlideNext():jpSlidePrev()}},{passive:true});
}
async function wallet(){
  let d={};try{d=await dataApi('?action=dashboard')}catch(e){d={}};let x=d.data||d,u=x.user||{},ws=x.withdraw_settings||{};
  const pct=Number(ws.charge_percent??5);
  const min=Number(ws.min_amount??100);
  document.querySelector('.content').innerHTML=`<section class="page-card"><div class="page-head"><button onclick="render('home')">‹</button><div><span>Wallet</span><h1>Wallet Balance</h1></div></div><div class="big-balance">₹${Number(u.wallet||0).toFixed(2)}</div><div class="wallet-note">Available wallet balance</div><div class="wallet-stats"><div><span>Gift POINTS</span><b>${esc(u.points??x.gift_points??0)}</b></div><div><span>Min. Withdrawal</span><b>₹${min.toFixed(2)}</b></div></div><div class="form-card"><h3>Withdraw</h3><input id="withdrawAmount" class="input" type="number" min="1" placeholder="Enter amount" oninput="updateWithdrawPreview(${pct})"><div id="withdrawPreview" class="withdraw-preview"><div><span>Withdrawal Charge</span><b>${pct.toFixed(2).replace(/\.00$/,'')}%</b></div><div><span>Charge Amount</span><b>₹0.00</b></div><div><span>You Receive</span><b>₹0.00</b></div></div><button class="btn primary" onclick="submitWithdraw()">Request Withdrawal</button></div></section>`;
  updateWithdrawPreview(pct);
}
function updateWithdrawPreview(pct){
  const el=document.getElementById('withdrawPreview'); if(!el)return;
  const amount=Number(document.getElementById('withdrawAmount')?.value||0);
  const charge=amount>0?Math.round(amount*pct)/100:0;
  const receive=amount>0?Math.max(0,amount-charge):0;
  el.innerHTML=`<div><span>Withdrawal Charge</span><b>${Number(pct).toFixed(2).replace(/\.00$/,'')}%</b></div><div><span>Charge Amount</span><b>₹${charge.toFixed(2)}</b></div><div><span>You Receive</span><b>₹${receive.toFixed(2)}</b></div>`;
}
async function submitWithdraw(){let a=document.getElementById('withdrawAmount')?.value;if(!a)return alert('Enter withdrawal amount.');try{let d=await dataApi('?action=withdraw',{method:'POST',body:JSON.stringify({op:'withdraw',amount:a})});alert(d.message||'Withdraw request sent.');wallet()}catch(e){alert(e.message)}}
async function historyView(kind='all'){let d={};try{d=await dataApi('?action=history')}catch(e){d={}};let rows=[];if(kind==='withdrawals'||kind==='all')rows=kind==='withdrawals'?(d.withdrawals||[]):[...(d.withdrawals||[]),...(d.transactions||[]),...(d.redeems||[])];if(kind==='transactions')rows=d.transactions||[];if(kind==='redeems')rows=d.redeems||[];document.querySelector('.content').innerHTML=`<section class="page-card"><div class="page-head"><button onclick="render('home')">‹</button><div><span>History</span><h1>${kind==='withdrawals'?'Withdraw History':kind==='redeems'?'Redeem History':kind==='transactions'?'Transaction History':'History'}</h1></div></div>${rows.length?rows.map(r=>`<div class="history-row"><div class="history-icon">${kind==='redeems'?'🎁':kind==='withdrawals'?'₹':'↔'}</div><div><b>${esc(r.coupon_code||r.status||r.type||'Transaction')}</b><small>${esc(r.created_at||r.redeemed_at||'')}</small></div><strong>${r.amount!=null?'₹'+Number(r.amount).toFixed(2):''}</strong></div>`).join(''):'<div class="empty-state">No records found.</div>'}</section>`}
function history(){historyView('all')}
async function profile(){
  const box=document.querySelector('.content');
  if(!box)return;
  box.innerHTML='<div class="card"><div class="muted">Loading profile…</div></div>';
  let d=null;
  try{d=await dataApi('?action=profile')}catch(e){}
  if(!d || !d.user){
    try{d=await dataApi('?action=dashboard')}catch(e){}
  }
  const x=d?.data||d||{}, u=x.user||state.user||{};
  if(!u || (!u.username&&!u.name&&!u.mobile&&!u.email)){
    box.innerHTML='<div class="card"><div class="label">PROFILE</div><div class="notice err">Profile could not be loaded.</div><button class="btn" onclick="profile()">Retry</button></div>';
    return;
  }
  const roleLabel=names[state.role]||u.role||u.user_type||'Partner';
  const wallet=Number(u.wallet??x.wallet??0);
  const points=Number(u.points??x.gift_points??state.user?.points??0);
  const username=u.username||u.name||state.user?.username||'Partner';
  const email=u.email||state.user?.email||'Not added';
  const mobile=u.mobile||state.user?.mobile||'Not added';
  box.innerHTML=`<section class="page-card profile-page jp-profile-page">
    <div class="page-head"><button onclick="render('home')">‹</button><div><span>Account</span><h1>Profile Details</h1></div></div>
    <div class="profile-identity-clean">
      <div class="profile-symbol profile-photo-slot">${profileAvatar('lg')}</div>
      <div class="profile-identity-copy"><h2>${esc(username)}</h2><p>${esc(roleLabel)} • <b>● Active</b></p><small>Your account details</small></div>
      <label class="profile-photo-button" title="Add profile photo">${jpIcon('camera')}<input type="file" accept="image/*" onchange="handleProfilePhoto(this)"></label>
    </div>
    <div class="profile-detail-grid">
      <div><span>Mobile</span><b>${esc(mobile)}</b></div>
      <div><span>Email</span><b>${esc(email)}</b></div>
      <div><span>Wallet Balance</span><b>₹${wallet.toFixed(2)}</b></div>
      <div><span>Gift POINTS</span><b>${points}</b></div>
      <div><span>Role</span><b>${esc(roleLabel)}</b></div>
      <div><span>Status</span><b class="profile-status">● Active</b></div>
    </div>
    <div class="jp-profile-menu">
      <button onclick="render('profile')">${jpIcon('user')}<span>My Profile</span><b>›</b></button>
      <button onclick="bankView()">${jpIcon('bank')}<span>Add / Update Bank Details</span><b>›</b></button>
      <button onclick="passwordView()">${jpIcon('lock')}<span>Change Password</span><b>›</b></button>
      <button onclick="historyView('transactions')">${jpIcon('history')}<span>Transaction History</span><b>›</b></button>
      <button onclick="historyView('redeems')">${jpIcon('gift')}<span>Redeem History</span><b>›</b></button>
      <button onclick="giftReport()">${jpIcon('points')}<span>My Gift Report</span><b>›</b></button>
      <button onclick="pointHistory()">${jpIcon('chart')}<span>POINT History</span><b>›</b></button>
      <button onclick="notifications()">${jpIcon('bell')}<span>Notifications</span><b class="jp-profile-toggle">ON</b></button>
      <button class="jp-profile-logout" onclick="logout()">${jpIcon('logout')}<span>Logout</span><b>›</b></button>
    </div>
  </section>`;
}
async function notifications(){
  try{
    let d=await dataApi('?action=notifications');let arr=d.notifications||d.data||[];if(!Array.isArray(arr))arr=[];
    document.querySelector('.content').innerHTML=`<section class="page-card jp-notifications-page"><div class="page-head"><button onclick="render('home')">${jpIcon('back')}</button><div><span>Alerts</span><h1>Notifications</h1></div></div>${arr.length?arr.map((n,i)=>`<button class="notification-row jp-notification-item" onclick="alert(${JSON.stringify(String(n.message||n.title||'Notification')).replace(/\n/g,' ')})"><div class="notice-icon">${jpIcon(i%2?'points':'gift')}</div><div><b>${esc(n.title||'Notification')}</b><p>${esc(n.message||'')}</p><small>${esc(n.ts||n.created_at||'')}</small></div><strong>›</strong></button>`).join(''):'<div class="empty-state">No notifications.</div>'}</section>`;
    document.querySelectorAll('.jp-flat-icon i,.home-bell i').forEach(x=>x.style.display=arr.length?'block':'none');
    const b=document.getElementById('jpMenuNoticeBadge');if(b)b.textContent=arr.length?String(Math.min(arr.length,99)):'';
  }catch(e){document.querySelector('.content').innerHTML=`<section class="page-card"><div class="notice err">${esc(e.message)}</div></section>`}
}
async function giftReport(){let d={};try{d=await dataApi('?action=gift_report')}catch(e){}let s=d.summary||{};document.querySelector('.content').innerHTML=`<section class="page-card"><div class="page-head"><button onclick="render('home')">‹</button><div><span>Rewards</span><h1>My Gift Report</h1></div></div><div class="report-stats"><div><b>${s.total_records||0}</b><small>Total Records</small></div><div><b>${s.total_points||0}</b><small>Total POINTS</small></div><div><b>${s.gift_points||0}</b><small>Gift POINTS</small></div></div>${(d.records||[]).map(r=>`<div class="history-row"><div class="history-icon">🎁</div><div><b>Gift Point Entry</b><small>${esc(r.created_at||r.redeemed_at||'')}</small></div><strong>+${esc(r.quantity||0)} POINTS</strong></div>`).join('')}</section>`}
async function pointHistory(){let d={};try{d=await dataApi('?action=point_history')}catch(e){}let rows=d.transactions||[];document.querySelector('.content').innerHTML=`<section class="page-card"><div class="page-head"><button onclick="render('home')">‹</button><div><span>Rewards</span><h1>Gift POINT History</h1></div></div><div class="report-stats"><div><b>${d.live_points||0}</b><small>LIVE POINTS</small></div><div><b>${rows.length}</b><small>TRANSACTIONS</small></div><div><b>POINTS</b><small>UNIT</small></div></div><div class="history-tip">Redeem points reduce balance. Rejected claims do not permanently consume points.</div>${rows.map(r=>`<div class="history-row"><div class="history-icon">🟢</div><div><b>${esc(r.title||'POINTS Earned')}</b><small>${esc(r.note||'')} • ${esc(r.ts||'')}</small></div><strong>${Number(r.points||0)>0?'+':''}${esc(r.points||0)} POINTS</strong></div>`).join('')}</section>`}
async function giftNetwork(){
  let d={},err='';
  try{d=await dataApi('?action=gift_network')}catch(e){err=e.message||'Gift Network could not be loaded.'}
  let rewards=Array.isArray(d.rewards)?d.rewards:[];
  let live=Number(d.live_points??0);
  const fmt=n=>{const v=Number(n||0);return Number.isInteger(v)?String(v):v.toFixed(2).replace(/\.00$/,'')};
  const left=(deadline)=>{if(!deadline)return '';let t=new Date(String(deadline).replace(' ','T')).getTime();if(!t)return '';let ms=t-Date.now();if(ms<=0)return 'Expired';let h=Math.floor(ms/3600000),days=Math.floor(h/24);h%=24;return days?`${days}d ${h}h remaining`:`${h}h remaining`};
  let cards=rewards.map((r,i)=>{
    let target=Number(r.target??r.target_quantity??0),achieved=Math.min(live,target||live),pct=target>0?Math.min(100,(achieved/target)*100):0,remaining=Math.max(0,target-live);
    let status=String(r.status||'active').toLowerCase(),enabled=Number(r.claim_enabled??1)===1;
    let eligible=live>=target&&target>0&&status==='active'&&enabled;
    let claimed=(d.claims||[]).some(c=>Number(c.reward_id)===Number(r.reward_id||r.id)&&['claimed','approved','fulfilled'].includes(String(c.status||'').toLowerCase()));
    let rawImage=String(r.gift_image||r.image_url||r.image||'').trim();
    let bridge=String(r.gift_image_url||'').trim();
    if(bridge && bridge.indexOf('/mobile/gift-image.php?reward_id=')===0 && bridge.indexOf('&v=')<0) bridge += '&v=27';
    let cleanRaw=rawImage.replace(/^\.\//,'').replace(/^\/+/, '');
    let imageCandidates=[];
    if(bridge) imageCandidates.push(bridge);
    if(/^https?:\/\//i.test(rawImage)) imageCandidates.push(rawImage);
    if(cleanRaw) imageCandidates.push('/'+cleanRaw,'/uploads/'+cleanRaw,'/admin/'+cleanRaw,'/admin/uploads/'+cleanRaw,'/uploads/gifts/'+cleanRaw,'/uploads/gift_images/'+cleanRaw,'/admin/uploads/gifts/'+cleanRaw,'/admin/uploads/gift_images/'+cleanRaw,'/gift_images/'+cleanRaw,'/gifts/'+cleanRaw,'/helper/'+cleanRaw);
    imageCandidates=[...new Set(imageCandidates.filter(Boolean))];
    let image=imageCandidates[0]||'';
    let candidateJson=esc(JSON.stringify(imageCandidates));
    return `<div class="reward-card ${claimed?'is-claimed':''}">
      <div class="reward-image-wrap">${image?`<img src="${esc(image)}" alt="Gift reward" data-candidates='${candidateJson}' data-idx="0" onerror="this.dataset.idx=Number(this.dataset.idx||0)+1;const a=JSON.parse(this.dataset.candidates||'[]');if(Number(this.dataset.idx)<a.length){this.src=a[Number(this.dataset.idx)];}else{this.style.display='none';this.parentElement.querySelector('.gift-placeholder').style.display='grid';}">`:''}<div class="gift-placeholder" style="${image?'display:none':''}">🎁</div></div>
      <div class="reward-copy"><div class="reward-level">LEVEL ${esc(r.level_no||i+1)} ${claimed?'• REDEEMED':''}</div>
      <h3>${esc(r.gift_name||r.name||'Gift Reward')}</h3>
      ${r.gift_description?`<p class="reward-desc">${esc(r.gift_description)}</p>`:''}
      <p>Target <b>${fmt(target)}</b> ${esc(String(r.unit||r.reward_unit||'POINTS').toUpperCase())} • Achieved <b>${fmt(achieved)}</b> POINTS</p>
      <div class="progress"><i style="width:${pct}%"></i></div>
      <small>${claimed?'Gift already claimed':eligible?'🎉 Eligible to claim':`${fmt(remaining)} POINTS remaining`}${left(r.deadline)?` • ⏳ ${esc(left(r.deadline))}`:''}</small>
      ${eligible&&!claimed?`<button class="btn reward-claim-btn" onclick="claimGift(${Number(d.campaign?.id||0)},${Number(r.reward_id||r.id||0)})">🎁 Claim Gift</button>`:''}
      </div></div>`;
  }).join('');
  if(!cards&&!err)cards='<div class="gift-empty-box">Gift scheme is active, but no reward levels were returned by the server.</div>';
  document.querySelector('.content').innerHTML=`<section class="page-card"><div class="page-head"><button onclick="render('home')">‹</button><div><span>Rewards Scheme</span><h1>Gift Network</h1></div></div><div class="network-banner">🎁 <b>Painter & Helper Gift Scheme</b><small>Helper Gift Network</small></div><div class="gift-network-owner"><h2>🧰 My Gift Progress</h2><div class="owner-points">🎯 ${esc(fmt(live))} LIVE AVAILABLE POINTS</div>${err?`<div class="notice err">${esc(err)}</div>`:cards}</div></section>`
}
async function supportView(){
  let d={},s={};
  try{d=await dataApi('?action=support');s=d.support||{}}catch(e){}
  const link=(icon,label,url,cls='')=>url?`<a class="support-link ${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer"><span>${icon}</span><div><b>${esc(label)}</b><small>${esc(url)}</small></div><strong>›</strong></a>`:'';
  const wa=s.whatsapp?('https://wa.me/'+String(s.whatsapp).replace(/[^\d]/g,'')):'';
  document.querySelector('.content').innerHTML=`<section class="page-card support-page">
    <div class="page-head"><button onclick="render('home')">‹</button><div><span>Help & Connect</span><h1>Support</h1></div></div>
    <div class="support-intro"><span class="support-big-icon">🎧</span><div><b>Japnish Paints Support</b><small>Connect with our official channels.</small></div></div>
    <div class="support-links">
      ${link('📘','Facebook',s.facebook,'facebook')}
      ${link('📸','Instagram',s.instagram,'instagram')}
      ${link('𝕏','Twitter / X',s.twitter,'twitter')}
      ${link('▶️','YouTube',s.youtube,'youtube')}
      ${link('✈️','Telegram',s.telegram,'telegram')}
      ${link('💬','WhatsApp',wa,'whatsapp')}
      ${link('☎️','Call Support',s.phone?'tel:'+s.phone:'','phone')}
      ${link('✉️','Email Support',s.email?'mailto:'+s.email:'','email')}
      ${s.address?`<div class="support-address"><span>📍</span><div><b>Office / Store</b><small>${esc(s.address)}</small></div></div>`:''}
    </div>
    ${(!s.facebook&&!s.instagram&&!s.twitter&&!s.youtube&&!s.telegram&&!s.whatsapp&&!s.phone&&!s.email&&!s.address)?'<div class="gift-empty-box">No support links have been configured by Admin yet.</div>':''}
  </section>`;
}
async function claimGift(campaignId,rewardId){if(!campaignId||!rewardId)return alert('Gift reward is not available.');try{let d=await dataApi('?action=claim_gift',{method:'POST',body:JSON.stringify({op:'claim_gift',campaign_id:campaignId,reward_id:rewardId})});alert(d.message||'Gift claimed successfully.');giftNetwork()}catch(e){alert(e.message||'Gift claim failed.')}}
async function bankView(){let d={};try{d=await dataApi('?action=bank')}catch(e){}let b=d.bank||{};document.querySelector('.content').innerHTML=`<section class="page-card"><div class="page-head"><button onclick="render('home')">‹</button><div><span>Payment</span><h1>Add Bank</h1></div></div><div class="form-card"><input id="bankName" class="input" placeholder="Bank Name" value="${esc(b.bank_name||'')}"><input id="holder" class="input" placeholder="Account Holder" value="${esc(b.account_holder||'')}"><input id="account" class="input" placeholder="Account Number" value="${esc(b.account_number||'')}"><input id="ifsc" class="input" placeholder="IFSC Code" value="${esc(b.ifsc||'')}"><button class="btn primary" onclick="saveBank()">Save Bank Details</button></div></section>`}
async function saveBank(){try{let d=await dataApi('?action=bank',{method:'POST',body:JSON.stringify({op:'save_bank',bank_name:document.getElementById('bankName').value,account_holder:document.getElementById('holder').value,account_number:document.getElementById('account').value,ifsc:document.getElementById('ifsc').value})});alert(d.message||'Saved');bankView()}catch(e){alert(e.message)}}
function passwordView(){document.querySelector('.content').innerHTML=`<section class="page-card"><div class="page-head"><button onclick="render('home')">‹</button><div><span>Security</span><h1>Change Password</h1></div></div><div class="form-card"><input id="oldPass" class="input" type="password" placeholder="Old Password"><input id="newPass" class="input" type="password" placeholder="New Password"><input id="confirmPass" class="input" type="password" placeholder="Confirm Password"><button class="btn primary" onclick="savePassword()">Update Password</button></div></section>`}
async function savePassword(){try{let d=await dataApi('?action=change_password',{method:'POST',body:JSON.stringify({op:'change_password',old_password:document.getElementById('oldPass').value,new_password:document.getElementById('newPass').value,confirm_password:document.getElementById('confirmPass').value})});alert(d.message||'Password updated');render('profile')}catch(e){alert(e.message)}}
function couponEntry(){let code=prompt("Enter Coupon No. / Token No.");if(code)startRedeem(code.trim())}
function redeem(){
  if(!roleCanRedeem()){alert("Redeem is disabled for this account by Admin.");return render("home")}
  document.querySelector(".content").innerHTML=`<div class="card jp-redeem-card">
    <div class="label">COUPON REDEEM</div>
    <div id="reader" style="width:100%;min-height:260px"></div>
    <div class="jp-scan-actions"><button class="btn" type="button" onclick="startScan()">Start Camera</button><button class="btn" type="button" onclick="stopScan()">Stop Scanner</button></div>
    <div class="muted" style="margin-top:10px">Point the camera at the QR code.</div>
    <div class="muted" style="margin-top:10px">You can also enter the printed Coupon No.</div>
    <div class="jp-code-row"><input id="coupon" class="input" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="Coupon No. / Token No."><button class="btn primary jp-continue-btn" type="button" onclick="startRedeem(document.getElementById('coupon').value)">Continue</button></div>
  </div>`;
  const input=document.getElementById('coupon');
  if(input) input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();startRedeem(input.value)}});
  setTimeout(startScan,300);
}
async function startScan(){
  const reader=document.getElementById("reader");
  if(!reader)return;
  try{
    await stopScan();
    reader.innerHTML=`<div class="jp-camera-wrap" style="position:relative;width:100%;background:#000;border-radius:14px;overflow:hidden;min-height:280px">
      <video id="jpCameraVideo" playsinline webkit-playsinline autoplay muted style="display:block;width:100%;height:360px;max-height:55vh;border-radius:14px;background:#000;object-fit:cover"></video>
      <div id="jpCameraStatus" style="position:absolute;left:10px;right:10px;bottom:10px;padding:7px 10px;border-radius:10px;background:rgba(0,0,0,.62);color:#fff;font-size:13px;text-align:center">Starting camera…</div>
    </div><div class="muted" style="margin-top:8px">Point the camera at the QR code.</div>`;

    const video=document.getElementById("jpCameraVideo");
    const status=document.getElementById("jpCameraStatus");
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
      throw new Error("Camera is not supported here. Open the app in Chrome over HTTPS and allow Camera permission.");
    }

    // Ask for the rear camera explicitly. This also fixes devices where an
    // "ideal" facingMode returns a stream that does not render correctly.
    let stream=null;
    try{
      stream=await navigator.mediaDevices.getUserMedia({
        video:{facingMode:{exact:"environment"},width:{ideal:1280},height:{ideal:720}},
        audio:false
      });
    }catch(firstErr){
      stream=await navigator.mediaDevices.getUserMedia({
        video:{facingMode:"environment",width:{ideal:1280},height:{ideal:720}},
        audio:false
      });
    }

    state.cameraStream=stream;
    video.srcObject=stream;

    await new Promise((resolve,reject)=>{
      let done=false;
      const finish=()=>{if(done)return;done=true;resolve();};
      video.onloadedmetadata=finish;
      setTimeout(finish,1500);
      setTimeout(()=>{if(video.readyState<2){reject(new Error("Camera opened but video preview did not start. Please reload and allow Camera permission."));}},4000);
    });
    await video.play();
    status.textContent="Camera ready — point at the QR code";

    // Native QR scanning when supported. Scan the full frame and, as a
    // fallback, a centered crop. This helps with dense QR payloads and
    // phones whose preview is wider than the QR card.
    // Native detector is tried first, but do NOT stay stuck on it forever.
    // Some Android Chrome/device combinations expose BarcodeDetector but fail
    // to decode dense printed QRs. After a short timeout we switch to the
    // html5-qrcode decoder automatically.
    if("BarcodeDetector" in window){
      let detector=null;
      try{
        if(!BarcodeDetector.getSupportedFormats || (await BarcodeDetector.getSupportedFormats()).includes("qr_code"))
          detector=new BarcodeDetector({formats:["qr_code"]});
      }catch(e){ detector=null; }
      if(detector){
        let busy=false, nativeStarted=Date.now();
        const canvas=document.createElement('canvas');
        const ctx=canvas.getContext('2d',{willReadFrequently:true});
        state.cameraTimer=setInterval(async()=>{
          if(busy || !state.cameraStream || video.readyState<2)return;
          if(Date.now()-nativeStarted>4500){
            clearInterval(state.cameraTimer); state.cameraTimer=null;
            status.textContent='Switching to QR scanner…';
            try{ await startHtmlQrFallback(reader); }catch(e){
              status.textContent='QR scanner ready — move the card closer and keep it steady';
            }
            return;
          }
          busy=true;
          try{
            let codes=await detector.detect(video);
            if(!codes.length){
              const vw=video.videoWidth||1280, vh=video.videoHeight||720;
              const side=Math.min(vw,vh);
              const sx=Math.max(0,Math.floor((vw-side)/2)), sy=Math.max(0,Math.floor((vh-side)/2));
              canvas.width=1000; canvas.height=1000;
              ctx.drawImage(video,sx,sy,side,side,0,0,1000,1000);
              codes=await detector.detect(canvas);
            }
            if(codes&&codes.length&&codes[0].rawValue){
              const value=String(codes[0].rawValue).trim();
              const input=document.getElementById('coupon');
              if(input) input.value=value;
              status.textContent='QR detected — verifying…';
              await stopScan();
              startRedeem(value);
            }
          }catch(e){}
          finally{busy=false;}
        },250);
        return;
      }
    }

    await startHtmlQrFallback(reader);
    throw new Error("QR scanner is not available on this browser. Please use Chrome on Android.");
  }catch(e){
    await stopScan();
    const reader2=document.getElementById("reader");
    if(reader2)reader2.innerHTML=`<div class="notice err">Camera unavailable: ${esc(e&&e.message||e)}<br><small>Chrome → Site settings → Camera → Allow, then tap Start Camera again.</small></div>`;
  }
}
async function startHtmlQrFallback(reader){
  await stopScan();
  if(typeof Html5Qrcode==="undefined") throw new Error("QR scanner library unavailable");
  reader.innerHTML='<div id="jpHtmlReader" style="width:100%;min-height:280px"></div><div class="muted" style="margin-top:8px">Point the camera at the QR code.</div>';
  state.scanner=new Html5Qrcode("jpHtmlReader");
  let cameras=[];
  try{cameras=await Html5Qrcode.getCameras();}catch(e){}
  const cameraConfig=cameras&&cameras.length
    ? {deviceId:{exact:(cameras.find(c=>/back|rear|environment/i.test(c.label||""))||cameras[cameras.length-1]).id}}
    : {facingMode:{exact:"environment"}};
  await state.scanner.start(cameraConfig,{fps:15,qrbox:{width:280,height:280}},txt=>{
    const value=String(txt||'').trim();
    if(!value)return;
    const input=document.getElementById('coupon');
    if(input) input.value=value;
    stopScan();
    startRedeem(value);
  });
}

async function stopScan(){
  if(state.cameraTimer){clearInterval(state.cameraTimer);state.cameraTimer=null;}
  if(state.cameraStream){
    try{state.cameraStream.getTracks().forEach(t=>t.stop());}catch(e){}
    state.cameraStream=null;
  }
  if(state.scanner){
    try{await state.scanner.stop();}catch(e){}
    state.scanner=null;
  }
}

async function productsView(){
  let d;
  let errorMessage='';
  try{
    d=await dataApi('?action=products');
  }catch(e){
    errorMessage=e&&e.message ? String(e.message) : 'Unable to load products.';
  }
  const list=(d&&Array.isArray(d.products))?d.products:[];
  document.querySelector('.content').innerHTML=`
  <section class="page-card">
    <div class="page-head"><button onclick="render('home')">‹</button><div><span>Products</span><h1>Our Products</h1></div></div>
    ${errorMessage
      ? `<div class="notice err"><b>Products could not be loaded.</b><br>${esc(errorMessage)}<br><small>Please update the mobile API file on the server.</small></div>`
      : (list.length ? `<div class="product-grid">${list.map(p=>`
        <div class="product-card">
          ${p.image_url?`<img src="${esc(p.image_url)}" alt="${esc(p.name||'Product')}" onerror="this.style.display='none'">`:''}
          <h3>${esc(p.name||'')}</h3>
          ${p.size?`<small><b class="product-meta-label">SIZE:</b> ${esc(p.size)}</small>`:''}
          <b>₹${esc(p.price??0)}</b>
          <small><b class="product-meta-label">POINT:</b> ${esc(p.points??0)}</small>
          ${p.description?`<p>${esc(p.description)}</p>`:''}
        </div>`).join('')}</div>` : '<div class="muted">No Products Available</div>')}
  </section>`;
}


function formatRedeemNumber(v){
  const n=Number(v);
  if(!Number.isFinite(n)) return String(v??'');
  return Number.isInteger(n)?String(n):n.toFixed(2).replace(/0+$/,'').replace(/\.$/,'');
}
function showRedeemSuccess(d,code){
  const couponName=String(d?.coupon_name||d?.product_name||d?.name||'').trim();
  const size=String(d?.size||d?.product_size||'').trim();
  const couponCode=String(d?.coupon_code||code||'').trim();
  const amount=d?.amount!=null?formatRedeemNumber(d.amount):'';
  const points=d?.gift_points!=null?formatRedeemNumber(d.gift_points):'';
  document.querySelector('.content').innerHTML=`<section class="page-card jp-redeem-success-page">
    <div class="page-head"><button onclick="render('home')">‹</button><div><span>Redeem</span><h1>Redeem Result</h1></div></div>
    <div class="card jp-redeem-success-card">
      <div class="notice ok"><b>Coupon Redeemed Successfully</b></div>
      <div class="muted" style="margin-top:14px">Coupon Name</div><div class="notice"><b>${esc(couponName||'—')}</b></div>
      <div class="muted" style="margin-top:10px">Size</div><div class="notice"><b>${esc(size||'—')}</b></div>
      <div class="muted" style="margin-top:10px">Coupon Code</div><div class="notice"><b>${esc(couponCode)}</b></div>
      <div class="muted" style="margin-top:10px">Amount</div><div class="notice"><b>₹${esc(amount||'0')}</b></div>
      <div class="muted" style="margin-top:10px">Gift Points</div><div class="notice"><b>${esc(points||'0')}</b></div>
      <div class="muted" style="margin-top:12px">Coupon redeemed successfully.</div>
      <button class="btn primary" style="margin-top:14px" onclick="render('home')">Back to Dashboard</button>
    </div>
  </section>`;
}
function renderProductCodeVerification(code){
  document.querySelector('.content').innerHTML=`<section class="page-card"><div class="page-head"><button onclick="render('redeem')">‹</button><div><span>Security</span><h1>Verify Coupon</h1></div></div><div class="card"><div class="notice"><b>Coupon No. / QR:</b> ${esc(code)}</div><div class="muted" style="margin-top:10px">Product Code is required to continue.</div><input id="productCode" class="input" placeholder="Product Code" autocomplete="off" autocapitalize="characters" spellcheck="false"><button class="btn primary" style="margin-top:10px" onclick="submitRedeem()">Redeem Securely</button></div></section>`;
}
async function startRedeem(identifier){
  if(!identifier)return alert("Coupon No. / QR value required.");
  const code=String(identifier).trim();
  try{
    if(!C.ENDPOINTS?.redeem) throw new Error("Redeem endpoint is not configured.");
    const d=await redeemApi({coupon_code:code,token_no:code,product_code:"",source:"mobile_app",role:state.role});
    state.pendingRedeemCode='';
    showRedeemSuccess(d,code);
  }catch(e){
    if(e&&e.product_code_required===true){state.pendingRedeemCode=code;renderProductCodeVerification(code);return;}
    document.querySelector('.content').innerHTML=`<section class="page-card"><div class="page-head"><button onclick="render('redeem')">‹</button><div><span>Redeem Result</span><h1>Not Redeemed</h1></div></div><div class="notice err"><b>Not Redeemed</b><br>${esc(e?.message||"Request failed")}</div><button class="btn primary" style="margin-top:12px" onclick="render('redeem')">Try Again</button></section>`;
  }
}
async function submitRedeem(){
  const code=state.pendingRedeemCode||'';
  const pc=document.getElementById('productCode');
  const productCode=pc?pc.value.trim():'';
  if(!code)return render('redeem');
  if(!productCode)return alert("Product Code is required.");
  try{
    const d=await redeemApi({coupon_code:code,token_no:code,product_code:productCode,source:"mobile_app",role:state.role});
    state.pendingRedeemCode='';
    showRedeemSuccess(d,code);
  }catch(e){document.querySelector('.content').innerHTML=`<section class="page-card"><div class="page-head"><button onclick="render('redeem')">‹</button><div><span>Redeem Result</span><h1>Not Redeemed</h1></div></div><div class="notice err"><b>Not Redeemed</b><br>${esc(e?.message||"Request failed")}</div><button class="btn primary" style="margin-top:12px" onclick="render('redeem')">Try Again</button></section>`;}
}

function logout(){
  stopScan();
  clearInterval(welcomeSlideTimer); welcomeSlideTimer=null;
  clearInterval(loginSlideTimer); loginSlideTimer=null;
  localStorage.removeItem("jp_token");
  localStorage.removeItem("jp_role");
  const savedBranding=state.branding||{};
  state={role:"",token:"",user:null,permissions:null,screen:"home",scanner:null,cameraStream:null,cameraTimer:null,branding:savedBranding,pendingRedeemCode:""};
  // Logout returns directly to the single Japanese Glass Login page.
  // The separate Welcome/Login page has been removed from the guest flow.
  loginView();
}
(async function boot(){
  const publicBrand=await loadPublicBranding(); 
  state.branding=publicBrand; 
  if(publicBrand){
    document.documentElement.style.setProperty('--primary-color', publicBrand.primary_color || '#06245C');
    document.documentElement.style.setProperty('--secondary-color', publicBrand.secondary_color || '#1677FF');
  }
  showSplash(publicBrand);
  if(state.token){
    state.role=localStorage.getItem("jp_role")||"";
    if(state.role){try{const d=await dataApi("?action=branding");state.branding=d.branding||publicBrand}catch(e){state.branding=publicBrand} await render("home");}else loginView();
    hideSplash(); return;
  }
  // Guest flow: splash first, then the single Japanese Glass Login page.
  // The separate Welcome page is removed from the flow.
  setTimeout(()=>{hideSplash(); loginView();},1200);
})();
window.openMenu=openMenu;window.closeMenu=closeMenu;window.handleProfilePhoto=handleProfilePhoto;window.removeProfilePhoto=removeProfilePhoto;window.showLogin=showLogin;window.doLogin=doLogin;window.render=render;window.jpSlideNext=jpSlideNext;window.jpSlidePrev=jpSlidePrev;window.couponEntry=couponEntry;window.redeem=redeem;window.startRedeem=startRedeem;window.submitRedeem=submitRedeem;window.stopScan=stopScan;window.notifications=notifications;window.logout=logout;window.historyView=historyView;window.giftReport=giftReport;window.pointHistory=pointHistory;window.giftNetwork=giftNetwork;window.claimGift=claimGift;window.bankView=bankView;window.passwordView=passwordView;window.submitWithdraw=submitWithdraw;window.saveBank=saveBank;window.savePassword=savePassword;window.productsView=productsView;
