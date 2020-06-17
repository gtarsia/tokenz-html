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

const type = END_TAG

test('endTag should work correctly', (t) => {
  t.deepEqual(run(t, '<'), null)
  t.deepEqual(run(t, '</'), null)
  t.deepEqual(run(t, '</a'), { name: 'a', type })
  t.deepEqual(run(t, '</a qwe'), { name: 'a', type })
  t.deepEqual(run(t, '</a>'), { name: 'a', type })
  t.deepEqual(run(t, '</ab>'), { name: 'ab', type })
  t.deepEqual(run(t, '</ab >'), { name: 'ab', type })
  t.deepEqual(run(t, '</ab qwe>'), { name: 'ab', type })
  const walker = new TextWalker('</ab qwe>zxc')
  const result = endTag(walker)
  t.deepEqual(result, { name: 'ab', type })
  t.deepEqual(walker.match('zxc'), true)
})
