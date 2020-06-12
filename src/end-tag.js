import { stubIfTest } from 'dummee'
import isAlpha from './string/is-alpha'
import { END_TAG } from './token-types'

const type = END_TAG

function endTag(walker) {
  const token = { type }
  if (walker.peek(0, 2) !== '</' || !isAlpha(walker.peek(2))) {
    walker.cancel('it should start with < or alpha character')
  }
  walker.skip(2) // skip '</'
  token.name = walker.readUntil([' ', '>'])
  walker.skipUntil(['>']) // this ignores everything
  if (walker.peek() === '>') {
    walker.skip()
  } else {
    walker.failIfEndOfText('close tag never closed after reading name')
  }
  return token
}

export default stubIfTest(endTag)
