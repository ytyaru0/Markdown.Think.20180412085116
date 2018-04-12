# Markdownの現状

* 仕様がない
* 基本機能がしょぼい（Tableさえ拡張機能扱い）
* 方言が乱立している
* パーサが乱立している
* 静的サイトジェネレータという方法

欲しい機能を実装するために必要な環境、パーサ、拡張機能、実装方法にまで辿り着くのが非常に大変。

## 仕様がない

* http://d.hatena.ne.jp/kk_Ataka/20150713/1436751705
* https://qiita.com/Prof-Cheese/items/9629438b06aacc068c98
* https://github.github.com/gfm/

GFM, CommonMarkあたりが仕様か。一応あるけど、事実上は独自実装になる。CommonMarkは順序付きリストなどが１桁までなど貧弱。GFMのほうが良い。

## Markdown -> HTML

Markdownは最終的にHTMLに変換することで閲覧する。

閲覧するには以下の２通りの方法がある。

* Markdownテキストを動的にパースする
* あらかじめパースしたHTMLファイルを用意する

方法|長所|短所
----|----|----
動的|見やすい書きやすい|パースが必要
静的|パース不要|HTMLは見づらい書きづらい

## なぜMarkdownを使うのか

できるだけ多くの環境で、できるだけ多く解読でき、できるだけ簡単に編集できる言語だから。

* ブラウザ
    * HTMLビューア
        * ブラウザは事実上のクロスプラットフォーム環境
            * 全OSに存在するため
* テキストエディタ
    * 事実上クロスプラットフォーム

もしHTMLなら、テキストエディタで閲覧しても極めて見づらい。だがMarkdownの場合、ビューアがないとHTML表示できない。

## そもそもHTMLがふさわしいか？

MarkdownはHTMLの軽量言語である。はたしてHTMLが目的にふさわしいか？

HTMLはマークアップ言語。文書そのものに意味付けするメタ言語のひとつ。

たびたびマークアップ言語に不満を持つことがある。

* 外部から取り込みたい
    * 重複箇所をなくしたい(DRY)
* 本文が見づらくなる
* 複数ファイルになると構造定義できない

## 比較対象

* HTML
* CSS
* JS
* 電子書籍(e-Pub)
* 印刷(PDF)
* アプリ全般

### 対HTML

Markdownで実装されているのは以下。

* `H1`..`H6`
* `<ol>`, `<ul>` (ただし順序付きは制限あり。1桁まで、プレフィックス固定等)
むしろMarkdownでカバーされている機能のほうが少ないのでは？

