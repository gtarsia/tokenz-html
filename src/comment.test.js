import test from 'ava'
import comment from './comment'
import { TextWalker, WalkCancelledInterrupt } from './tokenz/tokenz'
import { COMMENT as type } from './token-types'

function run(txt) {
  const w = new TextWalker(txt)
  return comment(w)
}

test('comment should work correctly', (t) => {
  t.throws(() => run(''), { instanceOf: WalkCancelledInterrupt })
  t.throws(() => run('<'), { instanceOf: WalkCancelledInterrupt })
  t.throws(() => run('<!-'), { instanceOf: WalkCancelledInterrupt })
  t.deepEqual(run('<!--'), { text: '', type })
  t.deepEqual(run('<!--qweasd'), { text: 'qweasd', type })
  t.deepEqual(run('<!--qweasd--'), { text: 'qweasd--', type })
  t.deepEqual(run('<!--qweasd-->qwe'), { text: 'qweasd', type })
})

test('comment should advance after closure', (t) => {
  let w = new TextWalker('<!--qweasd-->')
  let result = comment(w)
  t.deepEqual(result, { text: 'qweasd', type })
  t.deepEqual(w.match('-->'), false)

  w = new TextWalker('<!--qweasd-->zxc')
  result = comment(w)
  t.deepEqual(result, { text: 'qweasd', type })
  t.deepEqual(w.match('zxc'), true)
})
