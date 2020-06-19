import test from 'ava'
import tokenizeHtml from './tokenize-html'
import { START_TAG, COMMENT, TEXT, END_TAG, DOCTYPE } from './token-types'

test('tokenizeHtml should work correctly', (t) => {
  const result = tokenizeHtml('<a><!-- asd -->qwe</a><!doctype qwe\r\n')
  const tokens = [
    { tagName: 'a', attrs: [], tokenType: START_TAG },
    { text: ' asd ', tokenType: COMMENT },
    { text: 'qwe', tokenType: TEXT },
    { tagName: 'a', tokenType: END_TAG },
    { contents: ' qwe', tokenType: DOCTYPE },
    { text: '\r\n', tokenType: TEXT },
  ]
  t.deepEqual(result, tokens)
})
