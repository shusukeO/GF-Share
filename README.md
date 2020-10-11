# GF Share
Google Forms の自分の現時点での回答を送信前に即座にシェアできるchrome拡張機能です。  
You can share your answer in Google Forms before send.  
page action（特定のページのみで起動）の拡張機能です。

![スクリーンショット 2020-10-11 9 47 16](https://user-images.githubusercontent.com/56382189/95667859-d458d400-0ba6-11eb-8188-ac39ba19fcc3.png)

## ファイル構成
* manifest パーミッションとか
* background.jsで特定ページになっているか確認
* popup.html popup.js アイコンクリック時に起動  
content.jsを呼び出し、結果を受け取りhtmlで表示
* content.js スクレイピングをする  

## 参考文献
* エラー(Unchecked runtime.lastError: The message port closed before a response was received.）に対応。onMessage(受け取る側）callback() or sendResponse();を書かないと出る。 https://qiita.com/noenture/items/3978f638f2ffb8ff0995
* エラー（Could not establish connection. Receiving end does not exist.）に対応。ページのローディングを待ってからMessage apiをたたく。onMessage(受け取る側）でreturnを書いても出る。https://www.itoukun.com/2019/11/09/chrome-extension-%E3%81%AE-unchecked-lasterror-value-error-could-not-establish-connection-receiving-end-does-not-exist-%E3%81%AE%E5%AF%BE%E5%87%A6%E6%B3%95/
* chrome拡張の種類 https://qiita.com/Tachibana446/items/696bb93bd4a23525cbb0
* いろいろ便利　https://qiita.com/nori0__/items/fc26b1e31ecf03b5f187
* executeScriptで別スクリプトに値を渡しつつ実行する方法。MessagePassingがうまくいかなかったときに試したこと。https://qiita.com/techneconn/items/6fa685ef3a1f62e6c383
* dotinstallで基本はわかる　https://dotinstall.com/lessons/basic_chrome_v3
* ポップアップとコンテンツのスクリプト間でデータのやり取り https://qiita.com/inabajunmr/items/d56d3a477b83487222f0
* クリップボードへの値のコピー https://qiita.com/butakoma/items/642c0ec4b77f6bb5ebcf
* jsで属性の取得　https://itsakura.com/js-getattribute
* document.querySelector タグとその特定の属性を取得 https://developer.mozilla.org/ja/docs/Web/API/Document/querySelector
* js ループを一回スキップはcontinue https://www.javadrive.jp/javascript/for/index10.html

## その他メモ
"http://*/*", "<all_urls>", "activeTab"

 "https://docs.google.com/forms/*/viewform"

        "background": {
        "scripts": [
            "background.js"
        ],
        "persistent": false
    }