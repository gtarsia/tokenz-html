/* eslint-disable no-constant-condition, no-continue */
import isAlpha from './string/is-alpha'
import { START_TAG } from './token-types'
import { whitespaces } from './chars'

const type = START_TAG

const whitespacesWithClose = [...whitespaces, '>']

export default function startTag(walker) {
  const attrs = []
  const token = { attrs, type }
  if (walker.read() !== '<' || walker.isEnd() || walker.match(whitespacesWithClose)) {
    walker.cancel('it should start with < followed by a non whitespace or > character')
  }
  token.name = walker.readUntil([...whitespaces, '>'])
  if (walker.isEnd()) { return token }
  while (true) {
    walker.skipUntilNot(whitespaces)
    if (walker.isEnd()) { return token } // permissive closure for skipping whitespace after name
    if (walker.match('>')) {
      walker.skip()
      return token
    }
    const name = walker.readUntil([...whitespaces, '>', '='])
    const attr = { name }
    attrs.push(attr)
    if (walker.isEnd()) { return token } // permissive closure while processing attr name
    if (!walker.match('=')) {
      continue
    }
    walker.skip() // skip '='
    if (walker.match([...whitespaces, '>'])) {
      continue
    }
    const char = walker.peek()
    if (char === '"' || char === "'") {
      walker.skip() // skip the " or '
      attr.value = walker.readUntil(char)
      if (walker.isEnd()) { return token } // permissive closure while processing attr value
      walker.read() // read the " or '
    } else {
      attr.value = walker.readUntil([...whitespaces, '>'])
      if (walker.isEnd()) { return token } // permissive closure while processing attr value
    }
  }
}
