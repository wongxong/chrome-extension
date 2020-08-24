

function loadScript(src) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  document.body.appendChild(script);
}

function initRootEl() {
  const el = document.createElement('div');
  el.id = 'zh_social_app_root';
  el.setAttribute('data-extension-id', chrome.runtime.id);
  document.body.appendChild(el);
}

chrome.storage.sync.get('zh_plugin_enabled', data => {
  if(data.zh_enable_plugin !== false) {
    initRootEl();
    loadScript();
  }
});