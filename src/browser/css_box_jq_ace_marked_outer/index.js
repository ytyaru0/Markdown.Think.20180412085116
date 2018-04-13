(function(){
    $(document).ready(function(){
	var editor = CreateEditor();
	LoadDefaultMarkdown(editor);
    }, false);
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
	    $("#Viewer").html(marked(response))
	}).fail(function (jqXHR, textStatus, errorThrown) {
	    $("#Viewer").html("./default.md ファイルが取得できませんでした。")
	}).always(function (data_or_jqXHR, textStatus, jqXHR_or_errorThrown) {});
    }
})();

