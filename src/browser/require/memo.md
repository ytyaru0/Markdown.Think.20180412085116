# ブラウザではrequireが使えない

markdown-itには多数の拡張機能があるが、どれもNode.jsでないと使えない。ブラウザでそのまま使えない。

* https://github.com/markdown-it/markdown-it
* https://www.npmjs.com/package/markdown-it
* https://www.npmjs.com/search?q=keywords%3Amarkdown-it-plugin

```js
var md = require('markdown-it')()
    .use(plugin1)
    .use(plugin2, opts, ...)
    .use(plugin3);
```
