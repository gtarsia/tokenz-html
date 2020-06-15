import test from 'ava'
import { TextWalker } from 'tokenz'
import text from './text'
import { TEXT as type } from './token-types'

function run(txt) {
  const w = new TextWalker(txt)
  return text(w)
}

test('text should work correctly', (t) => {
  t.deepEqual(run('<'), { text: '<', type })
  t.deepEqual(run('<<'), { text: '<', type })
  t.deepEqual(run('<a<<'), { text: '<a', type })
})
