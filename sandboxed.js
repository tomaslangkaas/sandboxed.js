var sandboxed=function(){function e(a,d,c,b,e){return e?"":d?"":c?b?'f.hasOwnProperty("'+c+'")&&f["'+c+'"](':'d["'+c+'"]':a}function d(a){return a.replace(f,e)}function b(a){try{return new Function("d","f","e","try{"+d(a)+"}catch(r){e&&e(r)}")}catch(b){return!1}}var f=/(>>\=|<<\=|\+\+|\-\-)|\d*\.?\d+(?:[eE][+\-]?\d+)?|[\!\=<>]\=\=?|"(?:\\"|\\\\|\\n|[^\\"])*"|(\w+)(\()?|([^<>%\(\)\/\+\-\*\&\|\^\~\:\,\?;])/g;b.compile=d;return b}();
