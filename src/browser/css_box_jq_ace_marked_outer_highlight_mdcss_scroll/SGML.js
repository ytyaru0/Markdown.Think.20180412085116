SGML = function(){
    // タグ文字列を作る
    // 要素名、属性、テキストノード、コメント
    // <!-- comment -->
    // <name k="v" k="v" ...>text</name>
    this.element = function(name, attrs=null, text=null, comment=null) {
        return this._comment(comment) + '<' + name + this._attrs(attrs) + '>' + this._text(text) + '</' + name + '>';
    }

    // id="value" class="value" ...
    this._attrs = function(attrs=null) {
        if (attrs == null) { return ''; }
        res = '';
        for (var key in attrs) {
            res += key + '=' + this._quote(attrs[key]) + ' ';
        }
        return ' ' + res.trim();
    }
    
    // <!-- comment -->
    this._comment = function(comment=null) {
        if (comment == null) { return ''; }
        else { return '<!-- ' + comment + ' -->' + '\n'; }
    }

    this._text = function(text=null) {
        return (null == text) ? '' : text;
    }
    
    this._quote = function(text=null) {
	if (null == text) { return '""'; }
	for (var i=0; i<text.length; i++) {
	    if ('"' == text[i] && 0<i && '\\' != text[i-1]) {
		text = text.slice(0, i) + '\\' + text.slice(i, text.length);
	    }
	}
	return '"' + text + '"'
    }

};

console.log(SGML);
console.log(new SGML());
sgml = new SGML();
console.log(sgml);
console.log(sgml.element('html'));
attrs = {};
attrs['id']='MyID';
attrs['class']='MyCLS1 MyCLS2';
attrs['name']='A"B\"';
console.log(sgml.element('html'));
console.log(sgml.element('html', attrs=attrs));
console.log(sgml.element('html', attrs=attrs, 'TEXT'));
console.log(sgml.element('html', attrs=attrs, 'TEXT', 'COMMENT'));
