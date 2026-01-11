function getMeta(el) {
  var url = (
    el.getAttribute('data-url') ||
    document.querySelector('link[rel=canonical]')?.href ||
    location.href
  ).trim();
  var title = (el.getAttribute('data-title') || document.title || '').trim();
  return { url, title };
}

function popup(u) {
  window.open(u, '_blank', 'noopener,noreferrer,width=600,height=540');
}

function enc(s) {
  return encodeURIComponent(s);
}

function handle(el) {
  el.addEventListener('click', function (e) {
    var target = e.target.closest('[data-action]');
    if (!target) return;
    e.preventDefault();
    var { url, title } = getMeta(el);
    var action = target.getAttribute('data-action');

    if (action === 'native' && navigator.share) {
      navigator.share({ title, url }).catch(function () {});
      return;
    }
    var shareLinks = {
      x: 'https://x.com/intent/tweet?text=' + enc(title) + '&url=' + enc(url),
      linkedin:
        'https://www.linkedin.com/sharing/share-offsite/?url=' + enc(url),
      facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + enc(url),
      whatsapp: 'https://api.whatsapp.com/send?text=' + enc(title + ' ' + url),
      telegram:
        'https://t.me/share/url?url=' + enc(url) + '&text=' + enc(title),
      bluesky: 'https://bsky.app/intent/compose?text=' + enc(title + ' ' + url),
      mastodon: 'https://mastodon.social/share?text=' + enc(title + ' ' + url),
    };
    var href = shareLinks[action];
    if (href) popup(href);
  });
}

document.querySelectorAll('.share-lite').forEach(handle);
