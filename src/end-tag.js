import { stubIfTest } from 'dummee'
import isAlpha from './string/is-alpha'
import { END_TAG } from './token-types'
import { whitespacesWithClose } from './chars'

const type = END_TAG

function endTag(walker) {
  const token = { type }
  const start = '</'
  if (!walker.match(start) || !isAlpha(walker.peek(2))) {
    walker.cancel('end tag should start with </ and an alpha character')
  }
  walker.skip(start.length) // skip '</'
  token.name = walker.readUntil(whitespacesWithClose)
  walker.skipUntil('>') // this ignores everything
  if (walker.match('>')) {
    walker.skip()
  } else {
    walker.failIfEnd('end tag never closed after reading name')
  }
  return token
}

export default stubIfTest(endTag)
