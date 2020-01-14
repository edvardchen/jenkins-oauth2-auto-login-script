// ==UserScript==
// @name         Jenkins OAuth2 自动登录
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       https://github.com/edvardchen
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
  'use strict';

  const startTimer = (() => {
    const INTERVAL = 10000; // 10s

    let timer;
    function startTimer() {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        new Promise((resolve, reject) => {
          /* global GM_xmlhttpRequest */
          // @ts-ignore
          GM_xmlhttpRequest({
            method: 'HEAD',
            url: location.href,
            // onabort() {},
            // onprogress() {},
            // onreadystatechange() {},
            /**
             * @param {Response} res
             */
            onerror(res) {
              reject({ type: 'error', res });
            },

            /**
             * @param {Response} res
             */
            onload(res) {
              if (res.status === 200) {
                resolve();
              } else {
                reject({ type: 'error', res });
              }
            },

            /**
             * @param {Response} res
             */
            ontimeout(res) {
              reject({ type: 'timeout', res });
            },
          });
        }).then(
          () => {
            location.reload();
          },
          e => {
            console.error('head request', e.type, e.res || e);
            // again
            startTimer();
          }
        );
      }, INTERVAL);
    }

    return startTimer;
  })();

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
    startTimer();
    return;
  }

  links[0].click();
})();
