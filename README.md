# sandboxed.js
function factory for sandboxed custom expressions

```javascript

var sandboxedFunction = sandboxed('exp(a, b)');

var readableVariables = {
  a: 3, 
  b: 5,
  PI: Math.PI
};

var availableFunctions = {
  exp: Math.pow
};

console.log(
  sandboxedFunction(readableVariables, availableFunctions)
); //outputs 243

```

## What does it do?

`sandboxed` is a function that converts a string with a JavaScript code expression to a sandboxed function. `sandboxed` only allows a strict subset of JavaScript, it does not allow variable assignment or mutation, function declarations or access to objects, functions or data not provided directly to the sandboxed function. It is possible to provide an object with readable variables defined and an object with callable functions the sandboxed function.

* Allows comparison operators: `!=`, `!==`, `<=`, `>=`, ´>´, ´<´, `==`, and `===`,
* Allows the following other operators: `^`, `<`, `>`, `%`, `/`, `+`, `-`, `*`, `&`, `|`, `^`, `~`, `:`, `,`, `?`, and `!`
* Allows parenthesis: `(` and `)`
* Allows decimal number literals, such as `14`, `-3.14`, `1.2e-10`
* Allows string literals in double quotes, such as `"some string"`
* Treats any sequence of alphanumeric characters (not starting with a digit) as an identifier referring to a variable defined on the provided object of readable variables or a function defined on the provided function object
* Filters out anything else (including whitespace, assignment operators, other literals, global objects, constructors, function declarations, control statements)

## API

`sandboxedFunction = sandboxed(expressionString [, whatToReturnOnCompileFailure])`

The `sandboxed` function converts a string of JavaScript code to a function. If compilation fails (syntax error or prohibited syntax), it returns `whatToReturnOnCompileFailure` or false.

`returnValue = sandboxedFunction([readableVariables][, callableFunctions][, errorHandler])`

The `sandboxedFunction` can be called with an optional object of readable data, an optional object of callable functions, and an optional errorHandler (otherwise it silently fails).

`filteredString = sandboxed.compile(expressionString)`

`sandboxed.compile()` is the internal function that filters and transforms the expression string.

## Allowed

* read variables defined on data object
* call functions defined on function object
* allows string literals in double quotation symbols: `"string"`
* allows number literals
* allows arithmetic operators, comparison operators, binary operators, ternary operator, parentheses, comma operator, boolean operators

## Disallowed

* Assignment operators
* Array literals and object literals
* Control statements (except ternary operator)
* Function statements
* Date, RegExp, Boolean, null, undefined
* window, document
* Property access
