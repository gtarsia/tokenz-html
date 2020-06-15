import test from 'ava'
import dummee from 'dummee'
import tokenizeHtml from './tokenize-html'
import { START_TAG, TEXT, END_TAG } from './token-types'

test('tokenizeHtml should work correctly', (t) => {
  const result = tokenizeHtml('<a>qwe</a>')
  const tokens = [
    { name: 'a', attrs: [], type: START_TAG },
    { text: 'qwe', type: TEXT },
    { name: 'a', type: END_TAG },
  ]
  t.deepEqual(result, tokens)
})
