(function () {
"use strict";
const C=window.JP_CONFIG||{}, CURRENT=String(C.APP_VERSION||"0.0.0");
const VERSION_URL=C.UPDATE_VERSION_URL||"/mobile/app-version.php";
const APK_URL=C.APK_DOWNLOAD_URL||"";
function parts(v){return String(v||"0").replace(/^v/i,"").split(".").map(x=>parseInt(x,10)||0)}
function newer(a,b){a=parts(a);b=parts(b);for(let i=0;i<Math.max(a.length,b.length);i++){if((a[i]||0)>(b[i]||0))return true;if((a[i]||0)<(b[i]||0))return false}return false}
function apk(d){return String((d&&(d.apk_url||d.download_url||d.apk||d.url))||APK_URL||"").trim()}
function openApk(url){if(!url)return;try{if(/Android/i.test(navigator.userAgent)){const x=url.replace(/^https?:\/\//i,"");location.href="intent://"+x+"#Intent;scheme=https;action=android.intent.action.VIEW;type=application/vnd.android.package-archive;end";return}}catch(e){}window.open(url,"_blank","noopener,noreferrer")}
function show(d){
 if(document.getElementById("jpUpdateBox"))return;
 const v=String((d&&(d.version||d.app_version))||"");
 const n=String((d&&(d.notes||d.release_notes))||"A new version is available.");
 const u=apk(d), box=document.createElement("div"); box.id="jpUpdateBox";
 box.innerHTML='<div style="position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:99999;display:grid;place-items:center;padding:20px"><div style="width:min(420px,100%);background:#fff;border-radius:22px;padding:22px;box-shadow:0 20px 60px rgba(0,0,0,.3);font-family:system-ui"><div style="font-size:11px;font-weight:800;letter-spacing:1px;color:#1677FF">JAPNISH PAINTS</div><h2 style="margin:8px 0 6px;color:#10233f">New update available</h2><div style="font-size:13px;color:#667085;margin-bottom:14px">Version '+v+' is ready.</div><div style="font-size:12px;line-height:1.5;color:#667085;background:#f5f7fa;border-radius:12px;padding:10px;margin-bottom:16px">'+n.replace(/[<>&"]/g,m=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[m]))+'</div><button id="jpUpdateNow" style="width:100%;height:46px;border:0;border-radius:14px;background:linear-gradient(135deg,#06245C,#1677FF);color:#fff;font-weight:800">Update Now</button><button id="jpUpdateLater" style="width:100%;height:42px;border:0;background:transparent;color:#667085;font-weight:700">Later</button></div></div>';
 document.body.appendChild(box);
 document.getElementById("jpUpdateNow").onclick=()=>openApk(u);
 document.getElementById("jpUpdateLater").onclick=()=>box.remove();
}
async function check(){try{const s=VERSION_URL.indexOf("?")>=0?"&":"?";const r=await fetch(VERSION_URL+s+"t="+Date.now(),{cache:"no-store",headers:{"Accept":"application/json"}});if(!r.ok)return;const d=await r.json(),v=String((d&&(d.version||d.app_version))||"").trim();if(v&&newer(v,CURRENT)&&(d.force===true||d.force_update===true||apk(d)))show(d)}catch(e){}}
setTimeout(check,1800);
})();