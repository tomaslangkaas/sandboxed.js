# sandboxed.js
function factory for sandboxed custom expressions

```javascript

var readableVariables = {a: 3, b: 5};

var availableFunctions = {exp: function(base, power){
  return Math.pow(base, power);
}};

var safeFunction = sandboxed('exp(a, b)');

console.log(
  safeFunction(readableVariables, availableFunctions)
); //outputs 243

```

## How does it work?

* Allows comparison operators: `!=`, `!==`, `<=`, `<==`, `>=`, `>==`, `==`, and `===`,
* Allows the following other operators: `^`, `<`, `>`, `%`, `/`, `+`, `-`, `*`, `&`, `|`, `^`, `~`, `:`, `,`, `?`, `!`, and `;`
* Allows parenthesis: `(` and `)`
* Allows decimal number literals, such as `14`, `-3.14`, `1.2e-10`
* Allows string literals in double quotes, such as `"some string"`
* Treats any sequence of alphanumeric characters (not starting with a digit) as an identifier referring to a variable defined on the provided object of readable variables or a function defined on the provided function object
* Filters out anything else (including whitespace, assignment operators, other literals, global objects, constructors, function declarations, control statements)

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
