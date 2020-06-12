import { stubIfTest } from 'dummee'
import TextWalker from './tokenizer/walker/TextWalker'
import openTag from './open-tag'
import closeTag from './close-tag'
import text from './text'

function tokenizeHtml(html) {
  const walker = new TextWalker(html)
  const tokens = []
  while (!walker.isEnd()) {
    const token = walker.walk([
      () => openTag(walker),
      () => closeTag(walker),
      () => text(walker),
    ])
    if (token) {
      tokens.push(token)
    }
  }
  return tokens
}

export default stubIfTest(tokenizeHtml)
