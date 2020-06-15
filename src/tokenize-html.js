import { stubIfTest } from 'dummee'
import { TextWalker } from './tokenz/tokenz'
import startTag from './start-tag'
import endTag from './end-tag'
import text from './text'

function tokenizeHtml(html) {
  const walker = new TextWalker(html)
  const tokens = []
  while (!walker.isEnd()) {
    const token = walker.walk([
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
