# パース

https://tokunagakazuya.tk/eokn

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.18.2/codemirror.min.css">
<style>
    #editorWrapper {
        float:left;
        width:50%;
    }
    #editorWrapper .CodeMirror {
        height: 500px;
    }
    #previewWrapper {
        float:right;
        width:50%;
        height: 500px;
        overflow: auto;
        background-color: #ccc;
    }
</style>
<div id="editorWrapper" style="">
    <textarea id="editor">
    </textarea>
</div>
<div id="previewWrapper">
    <div id="preview"></div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.18.2/codemirror.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.18.2/addon/mode/overlay.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.18.2/mode/markdown/markdown.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.18.2/mode/gfm/gfm.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.18.2/addon/edit/continuelist.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js"></script>
<script>
    var preview = document.getElementById("preview");
    var previewWrapper = document.getElementById("previewWrapper");
    var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
        mode:  "gfm",
        lineNumbers: true,
        matchBrackets: true,
        lineWrapping: true,
        extraKeys: {
            "Enter": "newlineAndIndentContinueMarkdownList"
        }
    });

    editor.on("change" , function(e){
        preview.innerHTML = marked(e.getValue());
    });

    editor.on("scroll" , function(e){
        // http://liuhao.im/english/2015/11/10/the-sync-scroll-of-markdown-editor-in-javascript.html
        var scrollInfo = e.getScrollInfo();

        // get line number of the top line in the page
        var lineNumber = e.lineAtHeight(scrollInfo.top, 'local');
        // get the text content from the start to the target line
        var range = e.getRange({line: 0, ch: null}, {line: lineNumber, ch: null});
        var parser = new DOMParser();
        var doc = parser.parseFromString(marked(range), 'text/html');
        var totalLines = doc.body.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, pre, blockquote, hr, table');

        // shouldPreviewScroll(length)
        var body = document.getElementById("preview");
        var elems = body.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, pre, blockquote, hr, table');
        if (elems.length > 0) {
            previewWrapper.scrollTop = elems[totalLines.length].offsetTop;
        }
    });
</script>
```
