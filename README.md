
# tokenz-html

Tokenizes HTML using `tokenz` package.

* Lightweight (flat dependency tree)
* Adheres to HTML standard
* Closes unclosed tokens if end of text is reached
* Doesn't include CDATA (create an issue if you want this)

## Install

Install package `html-tokenz` with npm/yarn/pnpm.

## Usage

```javascript
import tokenize from 'tokenz-html'

const tokens = tokenize(html)
```
