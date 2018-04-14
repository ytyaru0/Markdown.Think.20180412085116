# パース

https://github.com/markedjs/marked/blob/master/lib/marked.js

以下をオーバーライドすることでHTML文字列を生成する。
```js
Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.heading = function(text, level, raw) {
  if (this.options.headerIds) {
    return '<h'
      + level
      + ' id="'
      + this.options.headerPrefix
      + raw.toLowerCase().replace(/[^\w]+/g, '-')
      + '">'
      + text
      + '</h'
      + level
      + '>\n';
  }
  // ignore IDs
  return '<h' + level + '>' + text + '</h' + level + '>\n';
};
```

だが、markdown-itはもっと細かい粒度で制御可能。

そもそも、SGMLをはじめとするマークアップ言語の書式を要素ごとに記述せねばならないのは冗長。

```js
SGML = function(){
    // 要素名、属性、テキストノード、コメント
    element = function(name, attrs=null, text=null, comment=null) {
        return '<' + name + '>' + '</' + name + '>'
    }

    attrs = function(attrs) {
        for (int i=0; i<attrs.length; i++) {
            
        }
    }
}
```
