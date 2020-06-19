/* eslint-disable no-constant-condition, no-continue */
import { START_TAG } from './token-types'
import { whitespaces, whitespacesWithClose } from './chars'

const type = START_TAG

export default function startTag(walker) {
  const attrs = []
  const token = { attrs, type }
  if (walker.read() !== '<' || walker.isEnd() || walker.match(whitespacesWithClose)) {
    // it should start with < followed by a non whitespace or > character
    return null
  }
  token.tagName = walker.readUntil(whitespacesWithClose)
  if (walker.isEnd()) { return token }
  while (true) {
    walker.skipUntilNot(whitespaces)
    // permissive closure after skipping whitespace after tag name
    if (walker.isEnd()) { return token }
    if (walker.match('>')) {
      walker.skip()
      return token
    }
    const name = walker.readUntil([...whitespacesWithClose, '='])
    const attr = { name }
    attrs.push(attr)
    if (walker.isEnd()) { return token } // permissive closure while processing attr name
    if (!walker.match('=')) {
      continue
    }
    walker.skip() // skip '='
    if (walker.match(whitespacesWithClose)) {
      continue
    }
    const char = walker.peek()
    if (char === '"' || char === "'") {
      walker.skip() // skip the " or '
      attr.value = walker.readUntil(char)
      if (walker.isEnd()) { return token } // permissive closure while processing attr value
      walker.read() // read the " or '
    } else {
      attr.value = walker.readUntil(whitespacesWithClose)
      if (walker.isEnd()) { return token } // permissive closure while processing attr value
    }
  }
}
