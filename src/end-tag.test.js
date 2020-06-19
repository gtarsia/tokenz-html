import test from 'ava'
import { TextWalker } from 'tokenz'
import endTag from './end-tag'
import { END_TAG } from './token-types'

function run(t, text) {
  const walker = new TextWalker(text)
  const result = endTag(walker)
  t.deepEqual(walker.isEnd(), true)
  return result
}

const tokenType = END_TAG

test('endTag should work correctly', (t) => {
  t.deepEqual(run(t, '<'), null)
  t.deepEqual(run(t, '</'), null)
  t.deepEqual(run(t, '</a'), { tagName: 'a', tokenType })
  t.deepEqual(run(t, '</a qwe'), { tagName: 'a', tokenType })
  t.deepEqual(run(t, '</a>'), { tagName: 'a', tokenType })
  t.deepEqual(run(t, '</ab>'), { tagName: 'ab', tokenType })
  t.deepEqual(run(t, '</ab >'), { tagName: 'ab', tokenType })
  t.deepEqual(run(t, '</ab qwe>'), { tagName: 'ab', tokenType })
  const walker = new TextWalker('</ab qwe>zxc')
  const result = endTag(walker)
  t.deepEqual(result, { tagName: 'ab', tokenType })
  t.deepEqual(walker.match('zxc'), true)
})
