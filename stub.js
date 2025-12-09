const Function_prototype_apply = window.Function.prototype.apply;
const document_querySelector = window.document.querySelector.bind(document);
const document_createElement = window.document.createElement.bind(document);
const window_setTimeout = window.setTimeout;
const window_fetch = window.fetch;
const Element_prototype_attachShadow = window.Element.prototype.attachShadow;
const Element_prototype_appendChild = window.Element.prototype.appendChild;
const Function_prototype_call = window.Function.prototype.call;
const Element_prototype_addEventListener = window.Element.prototype.addEventListener;
const Response_prototype_json = window.Response.prototype.json;
const Response_prototype_text = window.Response.prototype.text;
const MutationObserver_prototype_disconnect = window.MutationObserver.prototype.disconnect;

Function_prototype_apply.apply = Function_prototype_apply;
Function_prototype_call.apply = Function_prototype_apply;
document_querySelector.apply = Function_prototype_apply;
document_createElement.apply = Function_prototype_apply;
Element_prototype_attachShadow.apply = Function_prototype_apply;
Element_prototype_addEventListener.apply = Function_prototype_apply;
window_setTimeout.apply = Function_prototype_apply;
window_fetch.apply = Function_prototype_apply;
Response_prototype_json.apply = Function_prototype_apply;
Response_prototype_text.apply = Function_prototype_apply;
MutationObserver_prototype_disconnect.apply = Function_prototype_apply;

// Version actuelle (sera remplacée par build.js)
const CURRENT_VERSION = '__CURRENT_VERSION__';
const GITHUB_REPO = 'bro445/Survevmod';
const GITHUB_URL = 'https://github.com/' + GITHUB_REPO;

console.log('[SurvevHack] Version actuelle: ' + CURRENT_VERSION);

// Vérifier les mises à jour via API GitHub (pas de cache)
const checkForUpdates = () => {
  console.log('[SurvevHack] Vérification des mises à jour...');

  window_fetch('https://api.github.com/repos/' + GITHUB_REPO + '/contents/version.txt')
    .then((r) => {
      if (!r.ok) throw new Error('version.txt not found');
      return Response_prototype_json.apply(r);
    })
    .then((data) => {
      // Le contenu est en base64, on le décode
      const latestVersion = atob(data.content).trim();
      console.log('[SurvevHack] Version en ligne: ' + latestVersion);

      if (latestVersion !== CURRENT_VERSION) {
        console.log('[SurvevHack] Nouvelle version disponible! Redirection...');
        alert('SurvevHack ' + latestVersion + ' disponible!\nRedirection vers la page de téléchargement...');
        window.location.href = GITHUB_URL;
      } else {
        console.log('[SurvevHack] Vous avez la dernière version.');
      }
    })
    .catch((err) => {
      console.log('[SurvevHack] Impossible de vérifier les mises à jour:', err.message);
    });
};

// Vérifier les mises à jour au démarrage
checkForUpdates();

const prPromise = Promise.resolve({ tag_name: 'v' + CURRENT_VERSION });

const iframe = document_createElement('iframe');

const run = () => {
  const host = document_createElement('div');
  Function_prototype_call.apply(Element_prototype_appendChild, [document.body, host]);

  const shadowRoot = Function_prototype_call.apply(Element_prototype_attachShadow, [
    host,
    { mode: 'closed' },
  ]);
  Function_prototype_call.apply(Element_prototype_appendChild, [shadowRoot, iframe]);

  const inject = () => {
    iframe.contentWindow.ou = window;
    iframe.contentWindow.sr = shadowRoot;

    // Redirection manuelle si besoin
    iframe.contentWindow.sl = function (url) {
      if (url) {
        window.location.href = url;
      } else {
        window.location.href = GITHUB_URL;
      }
    };

    iframe.contentWindow.pr = prPromise;

    iframe.contentWindow.setTimeout(__SURPLUS__);
  };

  if (iframe.contentDocument) {
    inject();
  } else {
    Element_prototype_addEventListener.apply(iframe, ['load', inject]);
  }
};

if (document.body) run();
else
  new MutationObserver((_, obs) => {
    if (document.body) {
      MutationObserver_prototype_disconnect.apply(obs);
      run();
    }
  }).observe(document.documentElement, { childList: true, subtree: true });