import test from 'ava'
import tokenizeHtml from './tokenize-html'
import { START_TAG, COMMENT, TEXT, END_TAG, DOCTYPE } from './token-types'

test('tokenizeHtml should work correctly', (t) => {
  const result = tokenizeHtml('<a><!-- asd -->qwe</a><!doctype qwe\r\n')
  const tokens = [
    { tagName: 'a', attrs: [], type: START_TAG },
    { text: ' asd ', type: COMMENT },
    { text: 'qwe', type: TEXT },
    { tagName: 'a', type: END_TAG },
    { contents: ' qwe', type: DOCTYPE },
    { text: '\r\n', type: TEXT },
  ]
  t.deepEqual(result, tokens)
})
