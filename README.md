
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
import { tokenize, tokenTypes } from 'tokenz-html'

tokenize(`<a qwe=asd><b><!-- hey there --></a`)
/* [
  { name: 'a', attrs: [{ name: 'qwe', value: 'asd' }, type: 'start_tag' ] },
  { name: 'b', type: 'start_tag' },
  { text: ' hey there ', type: 'comment' },
  { name: 'a', type: 'close_tag' },
]
*/
```
