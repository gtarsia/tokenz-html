import { stubIfTest } from 'dummee'
import { END_TAG } from './token-types'
import { whitespacesWithClose } from './chars'

const type = END_TAG

function endTag(walker) {
  const token = { type }
  const start = '</'
  if (walker.read(2) !== start
    || walker.isEnd()
    || walker.match(whitespacesWithClose, start.length)) {
    walker.cancel('end tag should start with </ and an alpha character')
  }
  token.name = walker.readUntil(whitespacesWithClose)
  walker.skipUntil('>') // this ignores everything
  if (walker.match('>')) {
    walker.skip()
  }
  return token
}

export default stubIfTest(endTag)
