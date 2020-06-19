import test from 'ava'
import { TextWalker } from 'tokenz'
import comment from './comment'
import { COMMENT as tokenType } from './token-types'

function run(txt) {
  const w = new TextWalker(txt)
  return comment(w)
}

test('comment should work correctly', (t) => {
  t.deepEqual(run(''), null)
  t.deepEqual(run('<'), null)
  t.deepEqual(run('<!-'), null)
  t.deepEqual(run('<!--'), { text: '', tokenType })
  t.deepEqual(run('<!--qweasd'), { text: 'qweasd', tokenType })
  t.deepEqual(run('<!--qweasd--'), { text: 'qweasd--', tokenType })
  t.deepEqual(run('<!--qweasd-->qwe'), { text: 'qweasd', tokenType })
})

test('comment should advance after closure', (t) => {
  let w = new TextWalker('<!--qweasd-->')
  let result = comment(w)
  t.deepEqual(result, { text: 'qweasd', tokenType })
  t.deepEqual(w.match('-->'), false)

  w = new TextWalker('<!--qweasd-->zxc')
  result = comment(w)
  t.deepEqual(result, { text: 'qweasd', tokenType })
  t.deepEqual(w.match('zxc'), true)
})
