import { stubIfTest } from 'dummee'
import { TextWalker } from 'tokenz'
import startTag from './start-tag'
import endTag from './end-tag'
import text from './text'
import doctype from './doctype'
function tokenizeHtml(html) {
  const walker = new TextWalker(html)
  const tokens = []
  while (!walker.isEnd()) {
    const token = walker.walk([
      () => doctype(walker),
      () => endTag(walker),
      () => startTag(walker),
      () => text(walker),
    ])
    if (token) {
      tokens.push(token)
    }
  }
  return tokens
}

export default stubIfTest(tokenizeHtml)
