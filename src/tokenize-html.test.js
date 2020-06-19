import test from 'ava'
import tokenizeHtml from './tokenize-html'
import {
  START_TAG_TOKEN,
  COMMENT_TOKEN,
  TEXT_TOKEN,
  END_TAG_TOKEN,
  DOCTYPE_TOKEN,
} from './token-types'

test('tokenizeHtml should work correctly', (t) => {
  const result = tokenizeHtml('<a><!-- asd -->qwe</a><!doctype qwe\r\n')
  const tokens = [
    { tagName: 'a', attrs: [], tokenType: START_TAG_TOKEN },
    { text: ' asd ', tokenType: COMMENT_TOKEN },
    { text: 'qwe', tokenType: TEXT_TOKEN },
    { tagName: 'a', tokenType: END_TAG_TOKEN },
    { contents: ' qwe', tokenType: DOCTYPE_TOKEN },
    { text: '\r\n', tokenType: TEXT_TOKEN },
  ]
  t.deepEqual(result, tokens)
})
