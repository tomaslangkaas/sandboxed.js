var sandboxed = (function(){
	var expRe=/(>>\=|<<\=|\+\+|\-\-)|\d*\.?\d+(?:[eE][+\-]?\d+)?|[\!\=<>]\=\=?|"(?:\\"|\\\\|\\n|[^\\"])*"|(\w+)(\()?|([^<>%\(\)\/\+\-\*\&\|\^\~\:\,\?;])/g;

	var expReFn=function(m, s, i, p, n){
		return (n?'':(s?'':(i?(p?'f.hasOwnProperty("'+i+'")&&f["'+i+'"](':'d["'+i+'"]'):m)));
	};

	function compileExpression(jsExpression){
		return jsExpression.replace(expRe,expReFn);
	}

	function buildFunction(jsExpression){
		try{
			//data object, functions object, error handler
			return new Function('d','f','e','try{'+compileExpression(jsExpression)+'}catch(r){e&&e(r)}');
		}catch(e){
			return false;
		}
	}

	buildFunction['compile'] = compileExpression;

	return buildFunction;
})();
