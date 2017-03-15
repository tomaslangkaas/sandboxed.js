var sandboxed = (function() {
  var expRe =
    /(>>\=|<<\=|\+\+|\-\-)|\d*\.?\d+(?:[eE][+\-]?\d+)?|[\!\=<>]\=\=?|"(?:\\"|\\\\|\\n|[^\\"])*"|(\w+)(\()?|(\(|\))|([^<>%\/\+\-\*\&\|\^\~\:\,\?\!;])/g;

  var expReFn = function(match, blacklist, identifier,
    functionCall, group, nonWhitelist) {
    return (
      nonWhitelist ? 
        '' : 
        (blacklist ? 
          '' : 
          (identifier ?
            (functionCall ? 
              '(f.hasOwnProperty("' + identifier +
              '")&&f["' + identifier + '"](' :
              '(d.hasOwnProperty("' + identifier + 
              '")&&d["' + identifier + '"])'
            ) : 
            (group ? 
              group + group :
              match
            )
          )
        )
      );
  };

  function compileExpression(jsExpression) {
    return jsExpression.replace(expRe, expReFn);
  }

  function buildFunction(jsExpression, returnOnFailure) {
    try {
      //data object, functions object, error handler
      return new Function('d', 'f', 'e', 'try{return ' +
        compileExpression(jsExpression) + '}catch(r){e&&e(r)}');
    } catch(e) {
      return returnOnFailure || false;
    }
  }

  buildFunction['compile'] = compileExpression;

  return buildFunction;
})();
