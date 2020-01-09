'use strict';
// ==UserScript==
// @name         Jenkins OAuth2 自动登录
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       https://github.com/edvardchen
// @grant        none
// ==/UserScript==
(function() {
  'use strict';
  const loginGroup = document.querySelector('.login');
  if (!loginGroup) {
    throw new Error('can not find login button');
  }
  const links = loginGroup.querySelectorAll('a');
  if (!links) {
    throw new Error('can not find login button');
  }
  if (links.length > 1) {
    // 超过一个按钮，说明已经登录
    // 10s  刷新页面检查一遍
    setTimeout(() => {
      location.reload();
    }, 10000);
    return;
  }
  links[0].click();
})();
//# sourceMappingURL=index.js.map
