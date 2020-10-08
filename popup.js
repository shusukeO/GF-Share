'use strict';

function waitPageLoad(callback) {
    // 取得するタブの条件
    const queryInfo = {
        active: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT
    };

    // タブの情報を取得する
    chrome.tabs.query(queryInfo, function(result) {
        // 配列の先頭に現在タブの情報が入っている
        const currentTab = result.shift();

        if (currentTab.status === 'complete') {
            // ロードが完了していたら、コールバックを実行
            callback(currentTab);
        } else {
            setTimeout(() => {
                // まだロード中だった場合は、ちょっとwaitして再帰的にこの処理を繰り返す
                waitPageLoad(callback);
            }, 50)
        }
    });
}

waitPageLoad((currentTab) => {
    chrome.tabs.sendMessage(currentTab.id, 'content.jsへmsg', (respnse) => {
        document.getElementById('answer').value = respnse.formData;
        document.getElementById('answer').select();
        document.execCommand("copy");

        document.getElementById('successMessage').innerHTML = 'copied as below &#10004;'
    });
});

// document.getElementsByTagName('p')[0].innerHTML = 'test';

// chrome.runtime.sendMessage({getData: true},
//     function(){
//         console.log('getData message sent');
//     }
// );

// chrome.tabs.executeScript({
//     code: 'var getData = true;'
// }, () => {
//     chrome.tabs.executeScript({
//         file: "content.js"
//     })
//     // code: 'document.body.style.backgroundColor = "red"'
// });
