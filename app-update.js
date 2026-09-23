(function () {
  "use strict";

  const C = window.JP_CONFIG || {};
  const VERSION_URL = C.UPDATE_VERSION_URL ||
    "https://japnishpaints.store/mobile/app-version.php";
  const APK_URL = C.APK_DOWNLOAD_URL ||
    "https://japnishpaints.store/mobile/app/JapnishPaints.apk";
  const CURRENT = String(C.APP_VERSION || "0.0.0");

  function clean(v) {
    return String(v || "").trim().replace(/^v/i, "");
  }

  function semver(v) {
    return clean(v).split(".")
      .map(x => {
        const n = parseInt(x, 10);
        return Number.isFinite(n) ? n : 0;
      })
      .concat([0, 0, 0])
      .slice(0, 3);
  }

  function newer(a, b) {
    const x = semver(a), y = semver(b);
    for (let i = 0; i < 3; i++) {
      if (x[i] > y[i]) return true;
      if (x[i] < y[i]) return false;
    }
    return false;
  }

  function apkUrl() {
    return APK_URL +
      (APK_URL.indexOf("?") >= 0 ? "&" : "?") +
      "download=" + Date.now();
  }

  function downloadApk() {
    const url = apkUrl();

    // 1) Native Android bridge, if the APK wrapper provides it.
    try {
      if (window.Android) {
        if (typeof window.Android.downloadAndInstallApk === "function") {
          window.Android.downloadAndInstallApk(url);
          return true;
        }

        if (typeof window.Android.openExternal === "function") {
          window.Android.openExternal(url);
          return true;
        }
      }
    } catch (e) {}

    // 2) Capacitor Browser, when available.
    try {
      if (window.Capacitor &&
          window.Capacitor.Plugins &&
          window.Capacitor.Plugins.Browser &&
          typeof window.Capacitor.Plugins.Browser.open === "function") {
        window.Capacitor.Plugins.Browser.open({ url: url });
        return true;
      }
    } catch (e) {}

    // 3) Force a real browser/download navigation.
    try {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      a.download = "JapnishPaints.apk";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => a.remove(), 1500);
      return true;
    } catch (e) {}

    // 4) Final fallback.
    try {
      window.location.assign(url);
      return true;
    } catch (e) {}

    return false;
  }

  function openUpdate() {
    const ok = downloadApk();

    if (!ok) {
      window.alert(
        "APK download could not be started. Please open the APK download link manually."
      );
      return;
    }

    // Browser/webview downloads cannot silently install an APK.
    // The native Android bridge can perform the install when available.
    setTimeout(() => {
      try {
        if (!window.Android ||
            typeof window.Android.downloadAndInstallApk !== "function") {
          window.alert(
            "APK download started. After the download finishes, open JapnishPaints.apk from Downloads to install the update."
          );
        }
      } catch (e) {}
    }, 1800);
  }

  function checkUpdate(showNoUpdate) {
    fetch(
      VERSION_URL +
      (VERSION_URL.indexOf("?") >= 0 ? "&" : "?") +
      "t=" + Date.now(),
      {
        cache: "no-store",
        credentials: "omit",
        headers: { "Cache-Control": "no-cache" }
      }
    )
    .then(r => {
      if (!r.ok) throw new Error("version request failed");
      return r.json();
    })
    .then(data => {
      const latest = clean(
        data.version ||
        data.app_version ||
        data.APP_VERSION ||
        (data.data && (data.data.version || data.data.app_version)) ||
        ""
      );

      if (!latest) return;

      if (newer(latest, CURRENT)) {
        const msg =
          "New Japnish Paints app update is available (v" +
          latest +
          ").\n\nOpen download to install the latest APK?";

        if (window.confirm(msg)) {
          openUpdate();
        }
      } else if (showNoUpdate) {
        window.alert("Your app is already up to date.");
      }
    })
    .catch(() => {
      if (showNoUpdate) {
        window.alert("Update server is not reachable right now.");
      }
    });
  }

  window.JP_CHECK_APP_UPDATE = function () {
    checkUpdate(true);
  };

  window.JP_OPEN_APK_UPDATE = openUpdate;

  setTimeout(() => checkUpdate(false), 2500);
})();
