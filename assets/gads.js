// [11-24] Google Ads 전환 측정: 스토어 단추(Google Play·App Store)를 누르면 전환 1건 보냄.
//   이동을 막지 않음(transport_type beacon — 페이지를 떠나도 전송됨). 단추가 나중에 생겨도(site.js) 잡히도록 문서 전체에서 받음
(function () {
  var SEND_TO = 'AW-18513092263/HNi-CM7ur74dEKe93ftE';
  var RX = /^https:\/\/(play\.google\.com\/store\/apps\/details\?id=com\.malhadaapp\.malhada|apps\.apple\.com\/([a-z-]+\/)?app\/([^/?#]+\/)?id6831038450)/;
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || !RX.test(a.href) || typeof window.gtag !== 'function') return;
    try { window.gtag('event', 'conversion', { send_to: SEND_TO, transport_type: 'beacon' }); } catch (x) {}
  }, true);
})();
