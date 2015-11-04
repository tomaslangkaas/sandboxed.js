# sandboxed.js
function factory for sandboxed custom expressions

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
