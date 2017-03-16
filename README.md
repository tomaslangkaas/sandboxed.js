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

`sandboxed` is a function that converts a string with a JavaScript code expression to a sandboxed function. `sandboxed` only allows a strict subset of JavaScript, it does not allow variable assignment or mutation, function declarations or access to objects, functions or data not provided directly to the sandboxed function. It is possible to provide an object with readable variables and an object with callable functions the sandboxed function.

* Allows comparison operators: `!=`, `!==`, `<=`, `>=`, `>`, `<`, `==`, and `===`,
* Allows the following other operators: `^`, `<`, `>`, `%`, `/`, `+`, `-`, `*`, `&`, `|`, `^`, `~`, `:`, `,`, `?`, and `!`
* Allows parenthesis: `(` and `)`
* Allows decimal number literals, such as `14`, `-3.14`, `1.2e-10`
* Allows string literals in double quotes, such as `"some string"`
* Treats any sequence of alphanumeric characters (not starting with a digit) as an identifier referring to a variable defined on the provided object of readable variables or a function defined on the provided function object
* Filters out anything else (including whitespace, assignment operators, other literals, global objects, constructors, function declarations, control statements)

## How does it work?

`sandboxed` creates a function which takes three (optional) arguments: A data object `d`, a function object `f`, and an error handler `e`. The function body mainly consists of the provided `stringExpression`. Providing the expression `"1 + 3"` to `sandboxed`, will result in:

```javascript
function(d, f, e){
  try{return 1+3}catch(r){e&&e(r)}
}
```
Before insertion in the function body, `stringExpression` is transformed as follows:

1. Any occurence of `>>=`, `<<=`, `++`, or `--` is removed.
2. Literal decimal numbers are preserved, such as `45`, `-5.67`, or `5.7e-13`.
3. Literal strings in double quotes are preserved, such as "Some string".
4. Comparison operators which contain the equal character, `=`, are preserved, such as `>=`, `<=`, `!=`, `!==`, `==`, and `===`.
5. The following operators are preserved: `^`, `<`, `>`, `%`, `/`, `+`, `-`, `*`, `&`, `|`, `^`, `~`, `:`, `,`, `?`, and `!`.
6. Parentheses are transformed: `(` to `((`, and `)` to `))`.
7. Any sequence of alphanumeric characters followed by an opening parenthesis is interpreted as a function call and transformed to a sandboxed function call expression.
8. Any other sequence of alphanumeric characters is interpreted as variable access and transformed to a sandboxed variable access expression.
9. Any other characters (including whitespace) are removed.

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
