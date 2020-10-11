'use strict';

function waitPageLoad(callback) {
    //取得するタブの条件
    const queryInfo = {
        active: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT
    };

    chrome.tabs.query(queryInfo, function(result) {
        //先頭の現在タブ指定
        const currentTab = result.shift();

        if (currentTab.status === 'complete') {
            //ロード完了
            callback(currentTab);
        } else {
            setTimeout(() => {
                //再起処理
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

        document.getElementById('successMessage').innerHTML = 'copied &#10004;'
    });
});
