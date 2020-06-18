import test from 'ava'
import tokenizeHtml from './tokenize-html'
import { START_TAG, TEXT, END_TAG, DOCTYPE } from './token-types'

test('tokenizeHtml should work correctly', (t) => {
  const result = tokenizeHtml('<a>qwe</a><!doctype qwe\r\n')
  const tokens = [
    { name: 'a', attrs: [], type: START_TAG },
    { text: 'qwe', type: TEXT },
    { name: 'a', type: END_TAG },
    { contents: ' qwe', type: DOCTYPE },
    { text: '\r\n', type: TEXT },
  ]
  t.deepEqual(result, tokens)
})
