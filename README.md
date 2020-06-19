
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
import tokenizeHtml from 'tokenz-html' // or require

tokenize(`<a qwe=asd><b><!-- hey there --></a`)
/* [
  { name: 'a', attrs: [{ name: 'qwe', value: 'asd' }, tokenType: 'start_tag_token' ] },
  { name: 'b', tokenType: 'start_tag_token' },
  { text: ' hey there ', tokenType: 'comment_token' },
  { name: 'a', tokenType: 'close_tag_token' },
]
*/
```

You can also get the token types, check `src/token-types.js` to see what types are there:
```javascript
const { START_TAG } = require('tokenz-html/token-types')
// or use es modules to get error checks
import { START_TAG } from 'tokenz-html/src/token-types'
```
