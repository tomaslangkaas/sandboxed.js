var sandboxed=function(){function c(f,a,b,d,e,c){return c?"":a?"":b?d?'(f.hasOwnProperty("'+b+'")&&f["'+b+'"](':'(d.hasOwnProperty("'+b+'")&&d["'+b+'"])':e?e+e:f}function d(a){return a.replace(g,c)}function a(a,c){try{return new Function("d","f","e","try{return "+d(a)+"}catch(r){e&&e(r)}")}catch(b){return c||!1}}var g=/(>>\=|<<\=|\+\+|\-\-)|\d*\.?\d+(?:[eE][+\-]?\d+)?|[\!\=<>]\=\=?|"(?:\\"|\\\\|\\n|[^\\"])*"|(\w+)(\()?|(\(|\))|([^<>%\/\+\-\*\&\|\^\~\:\,\?\!;])/g;a.compile=d;a.v=.1;return a}();
