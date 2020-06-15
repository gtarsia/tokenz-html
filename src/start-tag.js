/* eslint-disable no-constant-condition, no-continue */
import isAlpha from './string/is-alpha'
import { START_TAG } from './token-types'
import { whitespaces } from './chars'

const type = START_TAG

export default function startTag(walker) {
  const attrs = []
  const token = { attrs, type }
  if (walker.peek() !== '<' || !isAlpha(walker.peek(1))) {
    walker.cancel('it should start with < or alpha character')
  }
  walker.skip() // skip '<'
  token.name = walker.readUntil([...whitespaces, '>'])
  walker.returnIfEnd(token)
  while (true) {
    walker.skipUntilNot(whitespaces)
    walker.failIfEnd('start tag never closed after processing name')
    if (walker.peek() === '>') {
      walker.skip()
      return token
    }
    const name = walker.readUntil([...whitespaces, '>', '='])
    walker.failIfEnd('start tag never closed after processing attribute name')
    const attr = { name }
    attrs.push(attr)
    if (walker.peek() !== '=') {
      continue
    }
    walker.skip() // skip '='
    if (walker.peek() === ' ' || walker.peek() === '>') {
      continue
    }
    const char = walker.peek()
    if (char === '"' || char === "'") {
      walker.skip() // skip the " or '
      attr.value = walker.readUntil(char)
      walker.failIfEnd('start tag never closed while processing attribute value')
      walker.read() // read the " or '
    } else {
      attr.value = walker.readUntil([...whitespaces, '>'])
      walker.failIfEnd('start tag never closed while processing attribute value')
    }
  }
}
