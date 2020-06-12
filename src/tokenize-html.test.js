import test from 'ava'
import dummee from 'dummee'
import tokenizeHtml from './tokenize-html'
import { OPEN_TAG, TEXT, CLOSE_TAG } from './token-types'

test('tokenizeHtml should work correctly', (t) => {
  const result = tokenizeHtml('<a>qwe</a>')
  const tokens = [
    { name: 'a', attrs: [], type: OPEN_TAG },
    { text: 'qwe', type: TEXT },
    { name: 'a', type: CLOSE_TAG },
  ]
  t.deepEqual(result, tokens)
})
