(function(){
    $(document).ready(function(){
	SetupParser()
	var editor = CreateEditor();
	LoadDefaultMarkdown(editor);
    }, false);
    // ハイライトできるような形式で出力する
    function SetupParser() {
	var renderer = new marked.Renderer()
	renderer.code = function(code, language) {
	return '<pre><code class="hljs">' + hljs.highlightAuto(code).value + '</code></pre>';
	};
	// スクロール連動すべく行数を数えるための布石としてline属性値を挿入する
	renderer.heading = function(text, level, raw) {
	    sgml = new SgmlWriter();
	    console.log(sgml);
	    opt = {name:'h'+level, attrs:{class:'line'}, text:text};
	    if (this.options.headerIds) {
		opt['attrs']['id'] = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-');
		return sgml.element(opt) + '\n';
	    } else {
		html = sgml.element(opt) + '\n';
		console.log(html);
		return sgml.element(opt) + '\n';
	    }
	};
	renderer.paragraph = function(text) {
	    sgml = new SgmlWriter();
	    return sgml.element({name:'p', attrs:{'class': 'line'}, text:text}) + '\n';
	};
	marked.setOptions({
	    renderer: renderer,
	});
	$('#Viewer pre code').each(function(i, e) {
	    hljs.highlightBlock(e, e.className);
	});
    }
    function CreateEditor() {
	var editor = ace.edit("Editor");
	editor.setTheme("ace/theme/twilight");// 唯一背景黒＆箇条書き色分けされる
	editor.setFontSize(14);
	editor.getSession().setMode("ace/mode/markdown");
	editor.getSession().setUseWrapMode(true);
	editor.getSession().setTabSize(4);
	editor.focus();
	editor.on("change", function(e) {
	    $("#Viewer").html(marked(editor.getSession().getValue()));
	})();
	editor.session.on("changeScrollTop", function(scrollTop) {
	    console.log('Editor: ' + scrollTop, + ' line: ' + editor.getFirstVisibleRow() + ' current: ' + editor.selection.getCursor().row)

	    /* 
	     * スクロール位置合わせアルゴリズムをどうするか？
	     * 
	     * コード1行毎にScrollTop()を保存する。（先頭からのpixcel数）
	     * 
	     * https://markdown-it.github.io/
	     * おおよそスクロール連動できている。
	     * 実装をみてみる。
	     * コード1行ごとにパーサが出力HTMLのclass属性に`line`を出力している。
	     * これをJSで解析し、その要素の高さを取得することで位置を算出している。
	     * 
	     * HTML要素に`line`class属性値があふれかえるので好ましくない。
	     * だが、エクスポートするときに取り除けば問題ないか？
	     * 
	     * `p`, `h?`タグのときにclass='line'を付与するコード。
	     * mdHtml.renderer.rules.paragraph_open = mdHtml.renderer.rules.heading_open = injectLineNumbers;
	     * これを marked.js でできるか？
	     * 可能だがDRYに書けない。APIの粒度が荒いため、要素ごとにHTML文字列を作成せねばならない。現実的でない。だが、`p`,`h?`の2種類だけなので2メソッドをオーバーライドすれば済む。
	     * Renderer.prototype.paragraph = function(text) {
	     * Renderer.prototype.heading = function(text, level, raw) {
	     */
	})();
	editor.session.selection.on("changeCursor", function(e){
	    var c = editor.selection.getCursor();
	    console.log('Editor now row,col: ' + c.row +', ' + c.column);

	    // この行までのコードをパースし、そのHTMLの表示高さピクセル数をとる？
	    // HTMLコードから高さピクセル数を算出するライブラリが欲しい
	});
	return editor;
    }
    function LoadDefaultMarkdown(editor) {
	$.ajax({
	    url: "./default.md"
	}).done(function (response, textStatus, jqXHR) {
	    editor.setValue(response, -1);
	}).fail(function (jqXHR, textStatus, errorThrown) {
	    $("#Viewer").html("./default.md ファイルが取得できませんでした。")
	    md = "# Markdown ビューア😃\n## h2\n### h3\n#### h4\n##### h5\n###### h6\n\n* A\n* B\n\n段落。<kbd><kbd>Ctrl</kbd>+<kbd>A</kbd></kbd>\n\n```javascript\nvar X = 100;\nfor (int i=0; i<10; i++) {\n    console.log(i);\n}\n```\n\n* [highlight.js]\n* [marked]\n* [ace]\n\n[highlight.js]: https://highlightjs.org/\n[marked]: https://github.com/markedjs/marked\n[ace]: https://ace.c9.io/"
	    editor.setValue(md, -1);
	}).always(function (data_or_jqXHR, textStatus, jqXHR_or_errorThrown) {});
    }
})();

