# Quick Share for Google Forms
Google Forms の自分の現時点での回答を送信前に即座にシェアできるchrome拡張機能です。  
You can share your answer in Google Forms before send.  
page action（特定のページのみで起動）の拡張機能です。

![Quick Share for Goolge Forms 001](https://user-images.githubusercontent.com/56382189/96325099-15962b80-1060-11eb-9019-502ea8700606.png)
![Quick Share for Goolge Forms 002](https://user-images.githubusercontent.com/56382189/96325111-2a72bf00-1060-11eb-8b33-cbe897f5782b.png)


## ファイル構成
* manifest パーミッションとか
* background.jsで特定ページになっているか確認
* popup.html popup.js アイコンクリック時に起動  
content.jsを呼び出し、結果を受け取りhtmlで表示
* content.js スクレイピングをする
* imagesフォルダ アイコンを格納。16, 19, 48, 128ピクセルの４種類。19ピクセルのはpage_action用で、それ以外はデフォルトのアイコンとして設定  

## 配布先
https://chrome.google.com/webstore/detail/quick-share-for-google-fo/lmedceklaehcenmffndoacnehhdocnhk

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
* js 難読化サイト。~~popup.jsは難読化すると動かなかった。~~　難読化すると審査に落ちます（泣） https://obfuscator.io/
* js 圧縮 google製 これなら審査に通る https://closure-compiler.appspot.com/home

## その他メモ
* 難読化すると審査に落ちる
>コンテンツ ポリシー
>コードの読みやすさの要件:
>デベロッパーは、拡張機能のコードの難読化や機能の隠蔽を行ってはなりません。これは、拡張機能パッケージによって取得されるすべての外部コードまたは外部リソースにも適用されます。次の方法を含む軽量化は許可されます。
>空白文字、改行、コードコメント、ブロック区切り文字の削除
>変数名と関数名の短縮
>複数のファイルの結合
* .lengthつけるの忘れがち
* contetscriptがうまく動かなかったらmanifestのmatchesを疑え。urlのパラメータまで指定すると、reloadしないとcontentscriptが読み込まれないことがある。

"http://*/*", "<all_urls>", "activeTab"

 "https://docs.google.com/forms/*/viewform"

        "background": {
        "scripts": [
            "background.js"
        ],
        "persistent": false
    }