# 機能不足

markdownの機能不足を網羅する。

## 比較対象

* HTML
* CSS
* JS
* pug
* AsciiDoc
* [reStructuredText](http://www.sphinx-doc.org/ja/stable/rest.html)
* 電子書籍(e-Pub)
* 印刷(PDF)
* アプリ全般

比較|差
----|----
HTML|HTMLから機能縮小する代わりに見やすく書きやすい
pug|HTML要素の短縮にすぎない。不要要素をそいだMDはより小さい
AsciiDoc|MDより多機能だが冗長。日本語では難がある場合がある
[reStructuredText](http://www.sphinx-doc.org/ja/stable/rest.html)|MDより冗長だが仕様が定まっている。拡張性もある
電子書籍(e-Pub)|段組される。
印刷(PDF)|印刷に適したサイズ。


### 対HTML

むしろMarkdownでカバーされている機能のほうが少ないのでは？

### AsciiDoc

* 外部ファイル読込
* 複雑なテーブル
    * ヘッダ箇所
    * セル結合
    * CSVから作成

