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
	editor.setOptions({
	    maxLines: Infinity,
	});
	editor.setFontSize(14);
	editor.getSession().setMode("ace/mode/markdown");
	editor.getSession().setUseWrapMode(true);
	editor.getSession().setTabSize(4);
	editor.$blockScrolling = Infinity;
	editor.focus();
	editor.on("change", function(e) {
	    $("#Viewer").html(marked(editor.getSession().getValue()));
	})();
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

