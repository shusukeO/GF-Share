//現時点でのruleをクリア(removeRules)して
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // 新たなruleを追加する
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        //アクションを実行する条件
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'docs.google.com', urlContains: 'viewform'},
        })
      ],
      //実行するアクション
      actions: [
        new chrome.declarativeContent.ShowPageAction()
      ]
    }]);
  });
