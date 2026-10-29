// 소리터 홈페이지 공통 스크립트 (2026-10-29)
// ① App Store 버튼: 출시되면 아래 주소 한 줄만 채우면 세 페이지 모두 「출시 예정」 → 실제 링크로 바뀜.
//    아이폰으로 들어온 사람에게는 App Store 버튼을 앞에 보여 줌.
var SORITO_APPSTORE_URL = '';   // 예: 'https://apps.apple.com/app/id0000000000'

(function () {
  var ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  document.querySelectorAll('.store').forEach(function (box) {
    var as = box.querySelector('.as');
    if (!as) return;
    if (SORITO_APPSTORE_URL) {
      var a = document.createElement('a');
      a.className = 'as'; a.href = SORITO_APPSTORE_URL; a.rel = 'noopener';
      a.innerHTML = as.innerHTML.replace(/<small>.*<\/small>/, '');
      as.replaceWith(a); as = a;
      if (ios) box.insertBefore(as, box.firstChild);
    }
  });
  if (SORITO_APPSTORE_URL && ios) document.querySelectorAll('a.get').forEach(function (a) { a.href = SORITO_APPSTORE_URL; });
})();

// ② 일본어 페이지: 이번 주 お手本(guides.json에서 공개일이 지난 가장 최근 문장)
(function () {
  var box = document.getElementById('weekly');
  if (!box) return;
  var CAT = { greet: 'あいさつ', ask: '質問する', care: '気づかい', request: 'お願い', thanks: 'お礼', feeling: '気持ち', me: '自分のこと' };
  var today = new Date(); today = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  fetch('/guides/guides.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (d) {
    var g = (d.guides || []).filter(function (x) { return x.date && x.date <= today; }).sort(function (a, b) { return a.date < b.date ? 1 : -1; })[0];
    if (!g) return;
    var fresh = (Date.parse(today) - Date.parse(g.date)) / 864e5 < 7;
    box.querySelector('.t span.ttl').textContent = g.title || '';
    if (fresh) box.querySelector('.new').hidden = false;
    box.querySelector('.ko').textContent = g.ko || '';
    box.querySelector('.ja').textContent = g.ja || '';
    box.querySelector('.cats').innerHTML = (g.cat || []).map(function (k) { return CAT[k] ? '<span>' + CAT[k] + '</span>' : ''; }).join('');
    var btn = box.querySelector('button'), au = null;
    btn.hidden = !g.file;
    btn.addEventListener('click', function () {
      if (!au) au = new Audio('/guides/' + g.file);
      if (!au.paused) { au.pause(); au.currentTime = 0; btn.textContent = '▶ お手本を聞く'; return; }
      au.play().then(function () { btn.textContent = '■ とめる'; }).catch(function () {});
      au.onended = function () { btn.textContent = '▶ お手本を聞く'; };
    });
    box.hidden = false;
  }).catch(function () {});
})();
