import { stubIfTest } from 'dummee'
import { END_TAG_TOKEN as tokenType } from './token-types'
import { whitespacesWithClose } from './chars'

function endTag(walker) {
  const token = { tokenType }
  const start = '</'
  if (walker.read(2) !== start
    || walker.isEnd()
    || walker.match(whitespacesWithClose, start.length)) {
    // end tag should start with </ and an alpha character
    return null
  }
  token.tagName = walker.readUntil(whitespacesWithClose)
  walker.skipUntil('>') // this ignores everything
  if (walker.match('>')) {
    walker.skip()
  }
  return token
}

export default stubIfTest(endTag)
